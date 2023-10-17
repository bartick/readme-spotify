const recentlyPlayed = async (accessToken) => {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if (response.status !== 200) {
        return null;
    }

    const responseJson = await response.json();

    return responseJson;
};

module.exports = recentlyPlayed;