const {Router} = require('express');
const fs = require('node:fs/promises');
const {existsSync} = require('node:fs');
const path = require('node:path');

const {tokenize} = require('../scripts/tokenize');
const {normalize} = require('../scripts/normalize');
const {removeStopWords} = require('../scripts/stop_word');
const {stem} = require('../scripts/stem');
const {index} = require('../scripts');
const {freq, sortedWordFreq, rankMultiFreq} = require('../scripts/freq');
const {drawGraph} = require('../scripts/statistics');

const router = new Router();

const DOCS_PATH = path.join(__dirname, '..', 'docs');

router.post('/process', async (req, res) => {
    const {files} = req.body;

    let wordsCount = 0;
    const startTime = Date.now() / 1000;

    if (!existsSync(DOCS_PATH))
        await fs.mkdir(DOCS_PATH);

    const totalFreq = {};
    const termLoc = {};

    for (let {name, content} of files) {
        const docName = `${Date.now()}_${name}`;
        const filepath = path.join(DOCS_PATH, docName);

        const words = tokenize(content);
        wordsCount += words.length;

        freq(words, totalFreq, docName, termLoc); // count freq

        await normalize(termLoc);
        // stem(termLoc);

        await fs.writeFile(filepath, content);
    }

    const [words, freqs] = await sortedWordFreq(totalFreq);
    await rankMultiFreq(totalFreq);
    const graphData = drawGraph(words, freqs);

    await removeStopWords(termLoc, files.length); // clean up indices

    await index(termLoc);

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