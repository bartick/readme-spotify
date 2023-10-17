const router = require('express').Router();
const {
    authenticate
} = require('../../lib/spotify');
const spotifyJoi = require('../../joi/spotify.joi');

router.get('/', async (req, res) => {

    const {
        error: spotifyError,
        value
    } = spotifyJoi.validate(req.query);

    if (spotifyError) {
        res.status(400).send('Error: ' + spotifyError);
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

    const appState = req.app.get(`auth.${state}`);

    if (state === null || appState === null) {
        res.status(400).send('Error: state mismatch');
        return;
    }

    const refresh_token = await authenticate(code);

    if (refresh_token === null) {
        res.status(400).send('Error: could not authenticate');
        return;
    }

    const database = req.app.get('database');

    try{
        await database.create(appState, refresh_token);
    } catch (error) {
        res.status(500).send('Error: ' + error + "\n" + "User already exists");
        return;
    }
    
    res.send(`Successfully linked your Spotify account to ${appState}. You can close this window now.`);
});

router.use('/spotify', require('./spotify'));

module.exports = router;