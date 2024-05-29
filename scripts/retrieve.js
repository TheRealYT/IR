const fs = require('node:fs');
const fss = require('node:fs/promises');
const path = require('node:path');

const {tokenize} = require('./tokenize');
const {normalize} = require('./normalize');
const {freq} = require('./freq');
const {stem} = require('./stem');

const DOCS_PATH = path.join(__dirname, '..', 'docs');
const INDEX_PATH = path.join(__dirname, '..', 'indices.json');

async function retrieve(q) {
    if (!fs.existsSync(DOCS_PATH) || !fs.existsSync(INDEX_PATH))
        return null;

    const terms = tokenize(q);
    const queryFreq = {};

    freq(terms, queryFreq);

    await normalize(queryFreq);
    stem(queryFreq);

    const index = JSON.parse((await fss.readFile(INDEX_PATH)).toString());
    const uniqueTerms = Object.keys(queryFreq);
    const queryVector = Object.values(queryFreq);
    const docVectors = {};

    for (let i = 0; i < uniqueTerms.length; i++) {
        const term = uniqueTerms[i];

        if (!(term in index)) {
            continue;
        }

        const docs = Object
            .entries(index[term])
            .map(([doc, weight]) => ({doc, weight}))
            .sort((a, b) => b.weight - a.weight);

        for (const {doc, weight} of docs) {
            if (doc === 'CF') continue;

            if (!(doc in docVectors))
                docVectors[doc] = new Array(uniqueTerms.length).fill(0);
            docVectors[doc][i] = weight;
        }
    }

    return Object
        .entries(docVectors)
        .map(([doc, vector]) => {
            let stats = '';
            try {
                const stats1 = fs.statSync(path.join(DOCS_PATH, doc));
                const date = new Date(stats1.ctime);
                stats = `${Math.round(stats1.size / 1024)}KB • ${date.toUTCString()}`;
            } catch (e) {
            }

            return {
                doc,
                score: cosine(vector, queryVector),
                stats,
            };
        })
        .sort((a, b) => b.score - a.score).map((v, i) => {
            v.score = i + 1;
            return v;
        });
}

function cosine(vectorA, vectorB) {
    let dotProduct = 0;
    let absA = 0;
    let absB = 0;

    for (let i = 0, n = Math.max(vectorA.length, vectorB.length); i < n; i++) {
        const a = vectorA[i] ?? 0;
        const b = vectorB[i] ?? 0;

        dotProduct += (a * b);
        absA += (a * a);
        absB += (b * b);
    }

    return dotProduct / (Math.sqrt(absA * absB));
}

async function getStems(content) {
    const terms = tokenize(content);
    const termFreq = {};

    freq(terms, termFreq);

    for (const term of Object.keys(termFreq)) {
        termFreq[term] = {[term]: termFreq[term]};
    }

    await normalize(termFreq);
    stem(termFreq);

    return termFreq;
}

module.exports = {retrieve, getStems};