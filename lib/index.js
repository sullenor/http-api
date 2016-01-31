'use strict';

const assign = require('lodash').assign;
const curry = require('lodash').curry;
const debug = require('debug')('http-api');
const got = require('got');

const HTTPError = got.HTTPError;

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
 * @param  {number}  opts.retries 5 by default
 * @param  {string}  opts.uri
 * @param  {string}  opts.token
 * @return {httpApi}
 */
function HttpApi(opts) {
	opts = opts || {};
}

/**
 * @param  {string} uri
 * @param  {object} [opts]
 * @return {promise}
 */
HttpApi.prototype.get = function (uri, opts) {
  debug(`    → GET ${uri}`);

  return got.get(uri, opts)
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
  return got.post(uri, assign({}, opts, {body: body}))
    .then(curry(handleResponse)('GET')(uri))
    .catch(curry(handleError)('GET')(uri));
};

module.exports = HttpApi;
module.exports.HTTPError = HTTPError;
