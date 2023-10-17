const joi = require('joi');

const spotify = joi.object({
    code: joi.string().default(null),
    state: joi.string().default('null'),
    error: joi.string().default(null),
});

module.exports = spotify;