/**
 * Uptime Queue Processor
 * @description Uptime check queue process.
 */
module.exports = async (job) => {

  const Sentry = require('../classes/sentry.js');

  Sentry.configureScope((scope) => {
    scope.setExtra("method", "CRON");
    scope.setExtra("handler", "Blacklist");
  });
  
  // do something, e.g.

  // Resolve job.
  return Promise.resolve();
}