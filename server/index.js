const path = require('node:path');
const express = require('express');
const app = express();

const processor = require('./api/processor');
const search = require('./api/search');
const doc = require('./api/doc');

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit: '500mb'}));
app.use(processor);
app.use(search);
app.use(doc);

app.listen(PORT, () => {
    console.log('Server started ', `http://127.0.0.1:${PORT}`);
});