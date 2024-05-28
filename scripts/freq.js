const fs = require('node:fs/promises');

function freq(words, wordFreqObj, docName, termLoc) {
    for (const word of words) {
        let f = 1;
        if (word in wordFreqObj)
            f += wordFreqObj[word];
        wordFreqObj[word] = f;

        if (termLoc === undefined)
            continue;

        let ff = 1;
        if (word in termLoc) {
            if (docName in termLoc[word]) {
                ff += termLoc[word][docName];
            }
        } else termLoc[word] = {};
        termLoc[word][docName] = ff;
    }
}

async function sortedWordFreq(wordFreq) {
    const words = new Array(wordFreq.length), freqs = new Array(wordFreq.length);

    const obj = Object
        .entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .map(([word, frequency], i) => {
            words[i] = word;
            freqs[i] = frequency;
            return {word, frequency};
        });

    await fs.appendFile('wordsFreq.json', JSON.stringify(obj, null, 2));

    return [words, freqs];
}

async function rankMultiFreq(wordFreq) {
    const arr = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]);
    const output = arr.map((pair, index) => ({
        word: pair[0],
        frequency: pair[1],
        rank: index + 1,
        multipliedValue: (index + 1) * pair[1],
    }));
    await fs.appendFile('rankMultiFreq.json', JSON.stringify(output, null, 2));
}

module.exports = {freq, sortedWordFreq, rankMultiFreq};