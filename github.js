'use strict';

const defaults = require('lodash').defaults;
const HttpApi = require('./lib');
const inherits = require('util').inherits;

/**
 * @class  {HttpApi}
 * @param  {object}  opts
 * @param  {object}  [opts.agent]
 * @param  {boolean} [opts.json]    true by default
 * @param  {number}  [opts.retries] 5 by default (from got)
 * @param  {number}  [opts.timeout]
 * @param  {string}  [opts.uri]     'https://api.github.com/' by default
 * @param  {string}  [opts.token]
 * @return {httpApi}
 */
function Github(opts) {
  opts = defaults(opts, {uri: 'https://api.github.com/'});
  HttpApi.call(this, opts);
}

inherits(Github, HttpApi);

module.exports = Github;
