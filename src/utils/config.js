require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    TIDB_HOST: process.env.TIDB_HOST,
    TIDB_PORT: process.env.TIDB_PORT,
    TIDB_USER: process.env.TIDB_USER,
    TIDB_PASSWORD: process.env.TIDB_PASSWORD,
    TIDB_DB_NAME: process.env.TIDB_DB_NAME,
    TIDB_ENABLE_SSL: process.env.TIDB_ENABLE_SSL,
    TIDB_CA_PATH: process.env.TIDB_CA_PATH
}