const fs = require('fs');
const getPlayer = require('./player');
const getBufferBlob = require('./getBufferBlob');
const timeManager = require('../utils/timeManager');

const spotifyLogo = fs.readFileSync(__dirname + '/../template/spotify-logo.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

const getSvg = ({
    image,
    theme,
    bufferImage,
    song,
    artist,
    progress,
    duration,
    url
}) => {
    let svg = fs.readFileSync(image, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });

    if (bufferImage === null) {
        bufferImage = fs.readFileSync(__dirname + '/../template/placeholder.txt', 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data);
        });
    }

    svg = svg.replaceAll('{{theme}}', theme);
    svg = svg.replace('{{image}}', "data:image/png;base64, " + bufferImage);
    svg = svg.replace('{{logo}}', "data:image/png;base64, " + spotifyLogo);
    svg = svg.replace('{{song}}', song);
    svg = svg.replace('{{artist}}', artist);
    svg = svg.replace('{{progress}}', progress);
    svg = svg.replace('{{duration}}', duration);
    svg = svg.replace('{{currentTime}}', timeManager(progress));
    svg = svg.replace('{{totalTime}}', timeManager(duration));
    svg = svg.replace('{{url}}', url);

    return svg;
};

const getImage = async (image, theme, accessToken) => {

    const player = await getPlayer(accessToken);

    const bufferImage = await getBufferBlob(player.cover);

    const svg = getSvg({
        image,
        theme,
        bufferImage,
        song: player.song,
        artist: player.artist,
        progress: player.progress,
        duration: player.duration,
        url: player.url
    });

    return svg;

}

module.exports = {
    getImage,
    getSvg
};