const fs = require('node:fs/promises');

async function removeStopWords(termLoc, D) {
    const stop = [];

    for (const term of Object.keys(termLoc)) {
        const df = Object.keys(termLoc[term]).length;
        // const freq = Object.values(term).reduce((a, b) => a + b);
        const per = Math.round((df / D) * 100);

        if (per >= 80) {
            delete termLoc[term];
            stop.push(term);
        }

        // TODO: remove rare words
    }

    await fs.appendFile('stopWords.txt', stop.join('\n'));
}

module.exports = {removeStopWords};