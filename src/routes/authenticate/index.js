// https://github.com/login/oauth/authorize
const router = require('express').Router();

const {
    GITHUB_CLIENT_ID
} = require('../../utils/config');

router.get('/', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`);
});

module.exports = router;