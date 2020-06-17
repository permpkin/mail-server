/**
 * Base Handler Class
 * @description Base class for connector services.
 */
const Sentry = require('./sentry.js');

class ServiceBase {
  constructor(data)
  {
    // pass sentry instance into request handler.
    this.Sentry = Sentry;
    this.Sentry.configureScope((scope) => {
      scope.setExtra("request_data", data);
      scope.setExtra("method", "constructor");
    });
    // do something with data.
    this.handleRequest(data)
  }
  async handleRequest(data)
  {
    // do something
  }
}

module.exports = { ServiceBase }