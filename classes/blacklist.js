/**
 * Blacklist Check Service
 * @description Checks mail servers against blacklist providers.
 */
const { ServiceBase } = require(`${__dirname}/@base.js`);

class BlacklistHandler extends ServiceBase {
  async handleRequest(data)
  {
    this.Sentry.configureScope((scope) => {
      scope.setExtra("method", "handleRequest");
    });
    // do something
  }
}

module.exports = { BlacklistHandler }