const fs = require('node:fs/promises');
const words = [];

async function countAll(tokenDir = process.argv?.[2] ?? "token.json") {

    const wordFreq = JSON.parse((await fs.readFile(tokenDir)).toString());

    for (const word in wordFreq)
        words.push([word, wordFreq[word]]);

    words.sort((a, b) => b[1] - a[1]);

    return words;
}

module.exports = {countAll};