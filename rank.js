const {countAll} = require('./scripts/Frequency');

countAll().then(wordFreq => {
    console.log('Rank based on frequency');
    let i = 1;
    for (const [word] of wordFreq) {
        console.log(word, i);
        i++;
    }
});