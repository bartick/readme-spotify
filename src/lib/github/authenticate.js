const querystring = require('querystring');
const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET
} = require('../../utils/config');

const getUser = require('./getUser');

const authenticate = async (code) => {
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code: code
        })
    });

    const responseText = await response.text();
    const data = querystring.parse(responseText);
    const token = data.access_token;

    const user = await getUser(token);

    if (!user) {
        return null;
    }

    return user;
};

module.exports = authenticate;