const msToHourMinuteSeconds = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return `${hours?`${hours}h`:''} ${minutes % 60}m ${seconds % 60}s`;
}

module.exports = msToHourMinuteSeconds;