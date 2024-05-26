const {Router} = require('express');
const {retrieve} = require('../scripts/retrieve');

const router = new Router();

router.get('/search', async (req, res) => {
    const q = req.query.q ?? '';
    const startTime = Date.now() / 1000;
    const data = await retrieve(q);
    const endTime = Date.now() / 1000;

    let message = 'No document/index available';

    if (data == null) {
        res.status(404).send(JSON.stringify({data: [], message}));
    } else {
        if (data.length > 0)
            message = `Found ${data.length} documents in ${endTime - startTime}sec`;
        else
            message = 'No document found';
        res.status(200).send(JSON.stringify({data, message}));
    }
});

module.exports = router;