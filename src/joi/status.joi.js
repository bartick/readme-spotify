const joi = require('joi');

const status = joi.object({
    username: joi.string().required(),
    theme: joi.string().allow('light', 'dark').default('light'),
});

module.exports = status;