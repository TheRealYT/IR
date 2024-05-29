const fs = require('node:fs');
const fss = require('node:fs/promises');
const path = require('node:path');
const {Router} = require('express');
const {getStems} = require('../scripts/retrieve');

const router = new Router();
const DOCS_PATH = path.join(__dirname, '..', 'docs');

router.get('/doc/:name', async (req, res) => {
    const docName = req.params.name;
    const q = req.query.q ?? null;

    const docPath = path.join(DOCS_PATH, docName);
    if (!fs.existsSync(docPath))
        return res.status(404).send('Document Not Found');

    const words = [];

    if (q != null) {
        const content = (await fss.readFile(docPath)).toString();
        const stemmed = await getStems(content);
        const query = await getStems(q);

        for (const term of Object.keys(query)) {
            if (term in stemmed) {
                words.push(Object.keys(stemmed[term])[0]);
            }
        }
    }

    if (words.length > 0) {
        res.setHeader('words', encodeURIComponent(words.join(',')));
    }

    res.status(200).sendFile(docPath);
});

module.exports = router;