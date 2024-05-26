const fs = require('node:fs/promises');
const {existsSync} = require('node:fs');
const path = require('node:path');

const {tokenize} = require('./tokenize');
const {normalize} = require('./normalize');
const {freq} = require('./freq');
const {stem} = require('./stem');

const DOCS_PATH = path.join(__dirname, '..', 'docs');
const INDEX_PATH = path.join(__dirname, '..', 'indices.json');

async function retrieve(q) {
    if (!existsSync(DOCS_PATH) || !existsSync(INDEX_PATH))
        return null;

    const terms = tokenize(q);
    const queryFreq = {};

    normalize(terms);
    stem(terms);
    freq(terms, queryFreq);

    const index = require('./../indices.json');
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
            if (!(doc in docVectors))
                docVectors[doc] = new Array(uniqueTerms.length).fill(0);
            docVectors[doc][i] = weight;
        }
    }

    return Object
        .entries(docVectors)
        .map(([doc, vector]) => ({doc, score: cosine(vector, queryVector)}))
        .sort((a, b) => b.score - a.score);
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

// retrieve('ተማሪ ስንተኛ ክፍል ነው።').then(console.log);

module.exports = {retrieve, cosine};