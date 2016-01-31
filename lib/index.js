'use strict';

const assign = require('lodash').assign;
const curry = require('lodash').curry;
const debug = require('debug')('http-api');
const defaults = require('lodash').defaults;
const got = require('got');
const merge = require('lodash').merge;
const pick = require('lodash').pick;

const HTTPError = got.HTTPError;

/**
 * @param  {object} global
 * @param  {object} user
 * @param  {object} body
 * @return {object}
 */
function buildOptions(global, user, body) {
  return merge({}, global, user, body);
}

/**
 * @param  {string} method
 * @param  {string} uri
 * @param  {object} response
 * @return {*}
 */
function handleResponse(method, uri, response) {
  debug(`${response.statusCode} ← ${method} ${uri}`);

  return response.body;
}

/**
 * @param  {string} method
 * @param  {string} uri
 * @param  {object} er
 */
function handleError(method, uri, er) {
  if (er instanceof HTTPError) {
    debug(`${er.statusCode} ← ${method} ${uri}`);
    er.message = `${er.statusCode} ${er.statusMessage} ← ${method} ${uri}`;
    throw er;
  }

  debug(`    ← ${method} ${uri}`);
  throw er;
}

/**
 * @class  {HttpApi}
 * @param  {object}  opts
 * @param  {object}  opts.agent
 * @param  {boolean} opts.json    true by default
 * @param  {number}  opts.retries 5 by default (from got)
 * @param  {number}  opts.timeout
 * @param  {string}  opts.uri
 * @param  {string}  opts.token
 * @return {httpApi}
 */
function HttpApi(opts) {
  this._global = defaults(pick(opts, ['agent', 'json', 'retries', 'timeout']), {json: true});
}

/**
 * @param  {string} uri
 * @param  {object} [opts]
 * @return {promise}
 */
HttpApi.prototype.get = function (uri, opts) {
  debug(`    → GET ${uri}`);

  return got.get(uri, buildOptions(this._global, opts))
    .then(curry(handleResponse)('GET')(uri))
    .catch(curry(handleError)('GET')(uri));
};

/**
 * @param  {string} uri
 * @param  {object} body
 * @param  {object} [opts]
 * @return {promise}
 */
HttpApi.prototype.post = function (uri, body, opts) {
  debug(`    → POST ${uri}`);

  return got.post(uri, buildOptions(this._global, opts, {body: body}))
    .then(curry(handleResponse)('POST')(uri))
    .catch(curry(handleError)('POST')(uri));
};

module.exports = HttpApi;
module.exports.HTTPError = HTTPError;
