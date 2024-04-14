const fs = require('node:fs/promises');
const path = require('node:path');

let docs = 0;

async function loadDocuments() {
    const files = await fs.readdir(path.join(__dirname, '..', 'data'), {withFileTypes: true});

    return async function* next() {
        for (const file of files)
            if (file.isFile()) {
                docs++;
                const reader = await read(path.join(file.path, file.name));
                for await (const char of reader()) {
                    yield char;
                }
            }
    };
}

async function read(filepath) {
    const fd = await fs.open(filepath, 'r');
    const buffer = new Uint32Array(1);

    return async function* next() {
        while (true) {
            const result = await fd.read(buffer, 0, 1);
            if (result.bytesRead > 0)
                yield buffer[0];
            else {
                yield 32; // handle the last word
                break;
            }
        }
    };
}

function getDocsCount() {
    return docs;
}

module.exports = {loadDocuments, getDocsCount};