'use strict';

const HttpApi = require('./lib');
const inherits = require('util').inherits;

function Github(opts) {
  HttpApi.call(this, opts);
}

inherits(Github, HttpApi);

module.exports = Github;
