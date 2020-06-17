/**
 * Sentry Constructor
 * @description Creates and returns Sentry instance.
 */
const Sentry = require("@sentry/node");

module.exports = (() => {

  if (process.env.NODE_ENV == 'production') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      release: 'mail-server@' + require('../package.json').version,
      environment: process.env.NODE_ENV
    });
  }
  return Sentry;

})()