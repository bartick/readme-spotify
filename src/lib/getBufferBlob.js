const getBufferBlob = async (url) => {
    const response = await fetch(url);
    const bufferBlob = await response.arrayBuffer();

    return Buffer.from(bufferBlob).toString('base64')
};

module.exports = getBufferBlob;