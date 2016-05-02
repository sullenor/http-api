'use strict';

const HttpApi = require('./lib');
const { inherits } = require('util');
const { isBoolean, isString } = require('lodash');

/**
 * @param {object}  [options]
 * @param {string}  [options.authorization]
 * @param {string}  [options.basepath]
 * @param {boolean} [options.json]
 * @param {number}  [options.retries]
 * @param {number}  [options.timeout]
 */
function Github(options) {
  HttpApi.call(this, options);
  isString(this._basepath) || (this._basepath = 'https://api.github.com/');
  isBoolean(this._json) || (this._json = true);
}

inherits(Github, HttpApi);

module.exports = Github;
