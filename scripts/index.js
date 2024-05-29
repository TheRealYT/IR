const fs = require('node:fs/promises');
const {existsSync} = require('node:fs');
const path = require('node:path');

const INDEX_PATH = path.join(__dirname, '..', 'indices.json');

async function index(indexWords) {
    for (const term of Object.keys(indexWords))
        indexWords[term].CF = Object.values(indexWords[term]).reduce((a, b) => a + b);

    let oldIndex = {};
    if (existsSync(INDEX_PATH))
        oldIndex = JSON.parse((await fs.readFile(INDEX_PATH)).toString());

    for (const term of Object.keys(oldIndex)) {
        if (term in indexWords)
            indexWords[term] = {...oldIndex[term], ...indexWords[term]};
        else
            indexWords[term] = oldIndex[term];
    }

    await fs.writeFile(INDEX_PATH, JSON.stringify(indexWords));
}

module.exports = {index};