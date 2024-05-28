const {Router} = require('express');
const fs = require('node:fs/promises');
const {existsSync} = require('node:fs');
const path = require('node:path');

const {tokenize} = require('../scripts/tokenize');
const {normalize} = require('../scripts/normalize');
const {removeStopWords} = require('../scripts/stop_word');
const {stem} = require('../scripts/stem');
const {index} = require('../scripts');
const {freq, sortedWordFreq, rankMultFreq} = require('../scripts/freq');
const {drawGraph} = require('../scripts/statistics');

const router = new Router();

const DOCS_PATH = path.join(__dirname, '..', 'docs');
const INDEX_PATH = path.join(__dirname, '..', 'indices.json');

router.post('/process', async (req, res) => {
    const {files} = req.body;

    let wordsCount = 0;
    const startTime = Date.now() / 1000;

    if (!existsSync(DOCS_PATH))
        await fs.mkdir(DOCS_PATH);

    const docFreq = {};
    const indexWords = existsSync(INDEX_PATH)
        ? JSON.parse((await fs.readFile(INDEX_PATH)).toString()) : {};

    for (let {name, content} of files) {
        const docName = `${Date.now()}_${name}`;
        const filepath = path.join(DOCS_PATH, docName);

        const words = tokenize(content);
        wordsCount += words.length;

        freq(words, docFreq); // count entire freq

        await normalize(words);
        stem(words);

        const termFreq = {};
        freq(words, termFreq); // count only in a doc, we may need to save the word freq of each doc

        // TODO: move outside the loop, store values outside
        index(docName, [Object.keys(termFreq), Object.values(termFreq)], indexWords); // use all terms as index

        await fs.writeFile(filepath, content);
    }

    const [words, freqs] = sortedWordFreq(docFreq);
    await rankMultFreq(docFreq);
    const graphData = drawGraph(words, freqs);
    // Luhn
    await removeStopWords(docFreq, indexWords); // clean up indices

    await fs.writeFile(INDEX_PATH, JSON.stringify(indexWords));

    const endTime = Date.now() / 1000;

    res.status(200).send({
        graphData,
        text: `⌚ Time taken ${endTime - startTime}sec
✅ Total of ${files.length} document(s) processed
✅ Total of ${wordsCount} word(s) processed
✅ Total of ${words.length} unique word(s)`,
    });
});

module.exports = router;