const fs = require('node:fs');
const fss = require('node:fs/promises');
const path = require('node:path');
const {Router} = require('express');

const router = new Router();
const DOCS_PATH = path.join(__dirname, '..', 'docs');

router.get('/doc/:name', async (req, res) => {
    const docName = req.params.name;

    const docPath = path.join(DOCS_PATH, docName);
    if (!fs.existsSync(docPath))
        return res.status(404).send('Document Not Found');

    res.status(200).sendFile(docPath);
});

module.exports = router;