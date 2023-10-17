const router = require('express').Router();
const querystring = require('querystring');
const generateRandomString = require('../../utils/generateRandomString');
const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_REDIRECT_URI
} = require('../../utils/config');
const githubJoi = require('../../joi/github.joi');

const gituhbAuthenticate = require('../../lib/github/authenticate');

router.get('/', async (req, res) => {
    const {
        error: githubError,
        value
    } = githubJoi.validate(req.query);

    if (githubError) {
        res.status(400).send('Error:' + githubError.message);
        return;
    }

    const {
        code,
        state,
        error
    } = value;

    if (error) {
        res.status(400).send('Error: ' + error);
        return;
    }

    if (!code) {
        res.status(400).send('Error: Missing code');
        return;
    }

    const user = await gituhbAuthenticate(code);

    if (!user) {
        res.status(401).send('Unauthorized');
        return;
    }

    const challenge = generateRandomString(16);
    req.app.set(`auth.${challenge}`, user.login);

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({ 
            response_type: 'code',
            client_id: SPOTIFY_CLIENT_ID,
            scope: 'user-read-private user-read-email user-read-playback-state',
            redirect_uri: SPOTIFY_REDIRECT_URI,
            state: challenge
        })
    )

});

module.exports = router;