const {countAll} = require('./scripts/FrequencyCounter');

countAll().then(wordFreq => {
    for (const [word, freq] of wordFreq) {
        console.log(word, freq);
    }

    console.log('------------------------------------');
    console.log('Distinct Words:', wordFreq.length);
});