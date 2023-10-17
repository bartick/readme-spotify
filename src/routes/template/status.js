const express = require('express');
const {
    getImage,
    getSvg
} = require('../../lib/getImage');
const {
    refreshToken,
} = require('../../lib/spotify');
const statusJoi = require('../../joi/status.joi');

const router = express.Router();

const image = __dirname + "/../../template/1.svg";

router.get('/', async (req, res) => {

    res.setHeader('Content-Type', 'image/svg+xml');

    const {
        error,
        value
    } = statusJoi.validate(req.query);

    if (error) {
        res.send(getSvg({
            image,
            theme: 'light',
            bufferImage: null,
            song: 'Error',
            artist: error.message,
            progress: 0,
            duration: 1,
            url: req.protocol + '://' + req.get('host') + req.originalUrl
        }));
        return;
    }

    const {
        username,
        theme
    } = value;

    let userData = req.app.get(`user_${username}`);

    if (userData === undefined) {
        const database = req.app.get('database');

        const databaseData = await database.fetch(username);

        if (databaseData === null) {
            res.send(getSvg({
                image,
                theme: 'light',
                bufferImage: null,
                song: 'Error',
                artist: 'User not found',
                progress: 0,
                duration: 1,
                url: req.protocol + '://' + req.get('host') + req.originalUrl
            }));
            return;
        }

        const accessData = await refreshToken(databaseData.refreshToken);

        userData = {
            accessToken: accessData,
            revivedTime: Date.now()
        };


        req.app.set(`user_${username}`, userData);

    }

    if (userData.revivedTime + 3600000 < Date.now()) {
        const accessData = await refreshToken(databaseData.refreshToken);

        userData.accessToken = accessData;
        userData.revivedTime = Date.now();

        req.app.set(`user_${username}`, userData);
    }

    res.setHeader('Content-Type', 'image/svg+xml');

    const svg = await getImage(image, theme, userData.accessToken);

    res.send(svg);
});

module.exports = router;