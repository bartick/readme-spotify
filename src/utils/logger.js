const pino = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const getLogger = (name) => {
  return logger.child({ name });
}

exports.default = logger;

module.exports = {
    getLogger,
};