const fs = require('node:fs/promises');

function freq(words, wordFreqObj) {

    for (const word of words) {
        let f = 1;

        if (word in wordFreqObj)
            f += wordFreqObj[word];

        wordFreqObj[word] = f;
    }
}

async function sortedWordFreq(wordFreq) {
    const words = new Array(wordFreq.length), freqs = new Array(wordFreq.length);
    const arr = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]);
    arr.forEach(([word, freq], i) => {
        words[i] = word;
        freqs[i] = freq;
    });
    const output = arr.map((pair, index) => ({
        word: pair[0],
        frequency: pair[1],
    }));
    await fs.appendFile('wordsFreq.json', JSON.stringify(output, null, 2));
    return [words, freqs];
}

async function rankMultFreq(wordFreq) {
    const arr = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]);
    const output = arr.map((pair, index) => ({
        word: pair[0],
        frequency: pair[1],
        rank: index + 1,
        multipliedValue: (index + 1) * pair[1],
    }));
    await fs.appendFile('rankMultFreq.json', JSON.stringify(output, null, 2));
}

module.exports = {freq, sortedWordFreq, rankMultFreq};