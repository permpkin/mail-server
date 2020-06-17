/**
 * Mail Server Provider
 * @description Server registration service.
 */
const { ServiceBase } = require(`${__dirname}/@base.js`);

const SMTPServer = require("smtp-server").SMTPServer;

class MailProvider extends ServiceBase {
  async handleRequest(data)
  {
    this.Sentry.configureScope((scope) => {
      scope.setExtra("method", "handleRequest");
    });
    
    this.Server = new SMTPServer({
      secure: true,
      // name: null,
      // banner: null,
      // size: null,
      // hideSize: null,
      authMethods: [
        'XOAUTH2'
      ],
      // authOptional: null,
      // disabledCommands: null,
      // hideSTARTTLS: null,
      // hidePIPELINING: null,
      // hide8BITMIME: null,
      // hideSMTPUTF8: null,
      // allowInsecureAuth: null,
      // disableReverseLookup: null,
      // sniOptions: null,
      // logger: null,
      maxClients: 5,
      // useProxy: null,
      // useXClient: null,
      // useXForward: null,
      // lmtp: null,
      socketTimeout: 5000,
      closeTimeout: 30 * 1000,
      onAuth: this.onAuth,
      onConnect: this.onConnect,
      onMailFrom: this.onMailFrom,
      onRcptTo: this.onRcptTo,
      onData: this.onData,
      onClose: this.onClose
    });
  }

  /**
   * Authentication handler
   * @param {object} auth - method indicates the authentication method used, ‘PLAIN’, ‘LOGIN’ or ‘XOAUTH2’
   * @param {object} session 
   * @param {function} callback 
   */
  onAuth (auth, session, callback) {
    // if (auth.username !== "abc" || auth.password !== "def") {
    //   return callback(new Error("Invalid username or password"));
    // }
    // callback(null, { user: 123 });
    if (auth.method !== "XOAUTH2") {
      // should never occur in this case as only XOAUTH2 is allowed
      return callback(new Error("Expecting XOAUTH2"));
    }
    if (auth.username !== "abc" || auth.accessToken !== "def") {
      return callback(null, {
        data: {
          status: "401",
          schemes: "bearer mac",
          scope: "my_smtp_access_scope_name"
        }
      });
    }
    callback(null, { user: 123 }); // where 123 is the user id or similar property
  }

  /**
   * 
   * @param {object} session - includes the remoteAddress and clientHostname values 
   * @param {function} callback - is the function to run after validation. If you return an error object, the connection is rejected, otherwise it is accepted 
   */
  onConnect (session, callback) {
    if (session.remoteAddress === "127.0.0.1") {
      return callback(new Error("No connections from localhost allowed"));
    }
    return callback(); // Accept the connection
  }

  /**
   * 
   * @param {object} address 
   * @param {object} session 
   * @param {function} callback 
   */
  onMailFrom (address, session, callback) {
    //
  }

  /**
   * 
   * @param {object} address 
   * @param {object} session 
   * @param {function} callback 
   */
  onRcptTo (address, session, callback) {
    // do not accept messages larger than 100 bytes to specific recipients
    // let expectedSize = Number(session.envelope.mailFrom.args.SIZE) || 0;
    // if (address.address === "almost-full@example.com" && expectedSize > 100) {
    //   err = new Error("Insufficient channel storage: " + address.address);
    //   err.responseCode = 452;
    //   return callback(err);
    // }
    // callback();
  }

  /**
   * Message data stream handler
   * @param {stream} stream 
   * @param {object} session 
   * @param {function} callback 
   */
  onData (stream, session, callback) {
    //
  }

  /**
   * Connection close listener.
   * @param {session} session 
   */
  onClose (session) {
    //
  }
}

module.exports = { MailProvider }