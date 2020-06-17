/**
 * Mail Tracker Pixel Provider
 * @description Provides tracking pixels for email opens.
 */
const { Image } = require('./lib/pixel.js')

const MailTrackerService = (req, res) => {
  // return blank png pixel.
  res
    .code(200)
    .header('Content-Type', 'image/png')
    .send(IMG, 'binary');
}

module.exports = MailTrackerService