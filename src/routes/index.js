const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/status', require('./template/status'));

router.use('/authenticate', require('./authenticate'));

router.use('/callback', require('./callback'));

module.exports = router;