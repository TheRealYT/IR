const {loadDocuments, read} = require('./scripts/DocumentPresenter');
const {addWord} = require('./scripts/Frequency');

if (process.argv.length < 3) {
    console.log('Usage: node tokenizer.js [text_file] [output_dir]');
    console.log('       node tokenizer.js [input_dir] [output_dir]');
    return process.exit(1);
}

const [_, __, inputPath, outputPath = 'tmp'] = process.argv;

console.log('Input:', inputPath);
console.log('Output:', outputPath);
console.log('--------------------------------------------');

(async () => {
    const documents = await loadDocuments(inputPath);
    const CompoundWords = require('./words.json');

    console.time('Time taken');

    let wordsCount = 0;
    let compoundWordsCount = 0;
    for (const document of documents) {
        console.log('Processing:', document);

        let content = await read(document);
        content = content
            .replace(/[^ሀ-ፖ]/mgi, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        const words = content
            .split(' ')
            .filter(word => word.length > 1);

        for (let i = 0; i < words.length - 1; i++) {
            const word = words[i];
            const next = words[i + 1];

            if (word in CompoundWords && CompoundWords[word].includes(next)) {
                compoundWordsCount++;
                words[i] = `${word} ${next}`;
                words.splice(i + 1, 1);
            }

            await addWord(words[i], outputPath);
        }

        wordsCount += words.length;
    }

    console.log('--------------------------------------------');
    console.timeEnd('Time taken');
    console.log('Total of', documents.length, 'document(s) processed');
    console.log('Total of', wordsCount, 'word(s) processed');
    console.log('Total of', compoundWordsCount, 'compound word(s) found');
    console.log('--------------------------------------------');
})();