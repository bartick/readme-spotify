const joi = require('joi');

const github = joi.object({
    code: joi.string().default(null),
    state: joi.string().default('null'),
    error: joi.string().default(null),
    error_description: joi.string().default(null),
    error_uri: joi.string().default(null),
});

module.exports = github;