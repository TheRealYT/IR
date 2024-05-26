const fs = require('node:fs/promises');
const path = require('node:path');

async function removeStopWords(wordFreq, indexTerms) {
    let freqSum = 0;

    for (let key in wordFreq) {
        freqSum += wordFreq[key];
    }

    const stop = [];
    const rare = [];

    for (let key in wordFreq) {
        let per = (wordFreq[key] / freqSum) * 1000;

        if (per < 9 && per > 1) {
            // index term
        } else {
            if (key in indexTerms)
                delete indexTerms[key];

            if (per >= 9) {
                stop.push(key);
            } else if (per <= 1) {
                rare.push(key);
            }
        }
    }

    await fs.writeFile(path.join(__dirname, '..', 'index_words.txt'), Object.keys(indexTerms).join('\n'));
    await fs.writeFile(path.join(__dirname, '..', 'stop_words.txt'), stop.join('\n'));
    await fs.writeFile(path.join(__dirname, '..', 'rare_words.txt'), rare.join('\n'));
}

module.exports = {removeStopWords};