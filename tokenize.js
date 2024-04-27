const {loadDocuments, getDocsCount} = require('./scripts/DocumentPresenter');
const {wordProcessor, getWordsCount} = require('./scripts/WordProcessor');

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
    const next = await loadDocuments(inputPath);
    const {process} = wordProcessor(outputPath);

    console.time('Time taken');

    for await (const ch of next()) {
        // console.log(ch)
        await process(ch);
    }

    console.log('--------------------------------------------');
    console.timeEnd('Time taken');
    console.log('Total of', getDocsCount(), 'document(s) processed');
    console.log('Total of', getWordsCount(), 'word(s) processed');
    console.log('--------------------------------------------');
})();