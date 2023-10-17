const player = async (accessToken) => {
    const response = await fetch('https://api.spotify.com/v1/me/player ', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (response.status !== 200) {
        return null;
    }

    const responseJson = await response.json();

    return responseJson;
};

module.exports = player;