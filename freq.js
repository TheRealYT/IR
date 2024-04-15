const {countAll} = require('./scripts/FrequencyCounter');

countAll().then(wordFreq => {
    console.log('Word frequency');

    for (const [word, freq] of wordFreq) {
        console.log(word, freq);
    }
});