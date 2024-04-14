const {loadDocuments, getDocsCount} = require('./scripts/DocumentPresenter');
const {wordProcessor, getWordsCount} = require('./scripts/WordProcessor');

(async () => {
    const next = await loadDocuments();
    const {process} = wordProcessor();

    console.time('Time taken');

    for await (const ch of next()) {
        // console.log(ch)
        await process(ch);
    }

    console.timeEnd('Time taken');
    console.log('Total of', getDocsCount(), 'documents processed');
    console.log('Total of', getWordsCount(), 'words processed');
})();