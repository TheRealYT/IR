const fs = require('node:fs/promises');
const {existsSync} = require('node:fs');
const path = require('node:path');

let docs = 0;

async function loadDocuments(inputPath) {
    if (!existsSync(inputPath)) throw Error('Input path doesn\'t exit');
    const stat = await fs.stat(inputPath);
    const files =
        stat.isDirectory()
            ? await fs.readdir(inputPath, {withFileTypes: true})
            : null;

    return async function* next() {
        if (files != null) {
            for (const file of files)
                if (file.isFile()) {
                    docs++;
                    console.log('Processing:', file.name);

                    const reader = await read(path.join(file.path, file.name));
                    for await (const char of reader()) {
                        yield char;
                    }
                }
        } else {
            docs = 1;
            const reader = await read(inputPath);
            console.log('Processing:', inputPath);
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