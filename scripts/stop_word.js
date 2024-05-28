const fs = require('node:fs/promises');
const path = require('node:path');

async function removeStopWords(termLoc, D) {
    for (const term of Object.keys(termLoc)) {
        const df = Object.keys(term).length;
        const freq = Object.values(term).reduce((a, b) => a + b);
        const per = Math.round((df / D) * 100);

        if (per >= 80) {
            delete termLoc[term];
            // TODO: save to file
        }

        // TODO: remove rare words
    }
}

module.exports = {removeStopWords};