const fs = require('node:fs/promises');
const child_process = require('node:child_process');

const {countAll} = require('./scripts/FrequencyCounter');
const path = require('path');

countAll().then(async wordFreq => {
    const words = new Array(wordFreq.length);
    const freq = new Array(wordFreq.length);

    wordFreq.forEach(([word, cnt], i) => {
        words[i] = `${i+1} ${word}`;
        freq[i] = cnt;
    });

    await fs.writeFile(path.join(__dirname, 'data.js'),
        `const labels = ${JSON.stringify(words)};\nconst data = ${JSON.stringify(freq)};`);

    child_process.exec('start graph.html');
});