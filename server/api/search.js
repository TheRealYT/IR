const {Router} = require('express');
const {retrieve} = require('../scripts/retrieve');

const router = new Router();

router.get('/search', async (req, res) => {
    const q = req.query.q ?? '';
    const data = await retrieve(q);

    if (data == null) {
        res.status(404).json({data: [], message: 'No document/index found'});
    } else {
        res.status(200).json({data, message: 'Search result'});
    }
});

module.exports = router;