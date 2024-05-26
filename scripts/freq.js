function freq(words, wordFreqObj) {
    for (const word of words) {
        let f = 1;

        if (word in wordFreqObj)
            f += wordFreqObj[word];

        wordFreqObj[word] = f;
    }
}

function sortedWordFreq(wordFreq) {
    const words = new Array(wordFreq.length), freqs = new Array(wordFreq.length);
    Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .forEach(([word, freq], i) => {
            words[i] = word;
            freqs[i] = freq;
        });

    return [words, freqs];
}

module.exports = {freq, sortedWordFreq};