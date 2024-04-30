const fs = require('node:fs/promises');
const {existsSync} = require('node:fs');
const path = require('node:path');

async function loadDocuments(inputPath) {
    if (!existsSync(inputPath)) throw Error('Input path doesn\'t exit');
    const stat = await fs.stat(inputPath);

    if (stat.isDirectory()) {
        let files = await fs.readdir(inputPath, {withFileTypes: true});
        files = files.map(file => path.join(file.path, file.name));
        return files;
    }

    return [inputPath];
}

async function read(filepath) {
    return (await fs.readFile(filepath)).toString();
}

module.exports = {loadDocuments, read};