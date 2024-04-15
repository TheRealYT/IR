const {countAll} = require('./scripts/FrequencyCounter');

countAll().then(wordFreq => {
    const C = wordFreq[0][1];
    console.log(`Zipf's Law, C = ${C}`);

    let i = 1;
    for (const [word, freq] of wordFreq) {
        console.log(word, freq, C / i);
        i++;
    }
});