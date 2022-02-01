const jayson = require('jayson');
const {PORT} = require('../config');
const mine = require('../mine');

const client = jayson.Client.http({
  port: PORT
});

module.exports = client;