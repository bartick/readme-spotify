const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET
} = require('../../utils/config');

const refreshToken = async (refresh_token) => {
    const authOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')) 
        },
        body: `refresh_token=${refresh_token}&grant_type=refresh_token`,
        json: true
    };

    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    if (response.status !== 200) throw new Error('Failed to refresh token');
    const responseJson = await response.json();

    return responseJson.access_token;
};

module.exports = refreshToken;