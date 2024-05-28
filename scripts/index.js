const fs = require('node:fs/promises');
const path = require('node:path');

const INDEX_PATH = path.join(__dirname, '..', 'indices.json');

async function index(indexWords) {
    await fs.writeFile(INDEX_PATH, JSON.stringify(indexWords));
}

module.exports = {index};