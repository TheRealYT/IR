const {countAll} = require('./scripts/FrequencyCounter');

countAll().then(wordFreq => {
    console.log('The product of rank and frequency');
    let i = 1;
    for (const [word, freq] of wordFreq) {
        console.log(word, i * freq);
        i++;
    }
});