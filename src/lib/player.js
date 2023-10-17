const {
    currentlyPlaying,
    recentlyPlayed
} = require('./spotify');

const getPlayer = async (accessToken) => {

    const currentSong = await currentlyPlaying(accessToken);

    if (currentSong === null) {
        const lastSong = await recentlyPlayed(accessToken);

        return {
            progress: 0,
            duration: lastSong.items[0].track.duration_ms,
            cover: lastSong.items[0].track.album.images[0].url,
            song: lastSong.items[0].track.name,
            artist: lastSong.items[0].track.artists[0].name,
            url: lastSong.items[0].track.external_urls.spotify
        }

    }

    return {
        progress: currentSong.progress_ms,
        duration: currentSong.item.duration_ms,
        cover: currentSong.item.album.images[0].url,
        song: currentSong.item.name,
        artist: currentSong.item.artists[0].name,
        url: currentSong.item.external_urls.spotify
    }
}

module.exports = getPlayer;