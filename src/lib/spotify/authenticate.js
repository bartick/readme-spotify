const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI
} = require('../../utils/config');

const authenticate = async (code) => {
    const authOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        body: `code=${code}&redirect_uri=${SPOTIFY_REDIRECT_URI}&grant_type=authorization_code`,
        json: true
    };

    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);

    if (response.status !== 200) {
        return null;
    }

    const responseJson = await response.json();

    return responseJson.refresh_token;

};

module.exports = authenticate;