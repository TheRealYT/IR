function index(docName, wordFreq, indexWords) {
    const [words, freqs] = wordFreq;

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        let freq = freqs[i];

        if (word in indexWords) {
            if (docName in indexWords[word]) {
                freq += indexWords[word][docName];
            }
        } else indexWords[word] = {};

        indexWords[word][docName] = freq;
    }
}

module.exports = {index};