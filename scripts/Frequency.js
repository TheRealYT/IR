const path = require('node:path');
const fs = require('node:fs/promises');
const {existsSync} = require('node:fs');

const words = [];

async function countAll(tokenDir = process.argv?.[2] ?? 'tmp') {
    for (const word of await fs.readdir(tokenDir, {withFileTypes: true})) {
        if (word.isFile()) {
            const wordName = path.basename(word.name, path.extname(word.name));
            const freq = (await fs.readFile(path.join(word.path, word.name))).toString();
            words.push([wordName, +freq]);
            words.sort((a, b) => b[1] - a[1]);
        }
    }
    return words;
}

async function addWord(word, outputPath) {
    if (!existsSync(outputPath))
        await fs.mkdir(outputPath);

    const wordPath = path.join(outputPath, `${word}.txt`);

    let freq = 1;
    if (existsSync(wordPath))
        freq += +(await fs.readFile(wordPath)).toString();
    await fs.writeFile(wordPath, freq.toString());
}

module.exports = {countAll, addWord};