'use strict';

const assign = require('lodash').assign;
const curry = require('lodash').curry;
const debug = require('debug')('http-api');
const defaults = require('lodash').defaults;
const got = require('got');
const merge = require('lodash').merge;
const pick = require('lodash').pick;
const result = require('lodash').result;

const HTTPError = got.HTTPError;
const MaxRedirectsError = got.MaxRedirectsError;
const ParseError = got.ParseError;
const RequestError = got.RequestError;

/**
 * @todo  Add authorization
 * @param  {object} global
 * @param  {object} user
 * @param  {object} body
 * @return {object}
 */
function buildOptions(global, user, body) {
  return merge({}, global, user, body);
}

/**
 * @param  {string} userUrl
 * @param  {string} [baseUrl]
 * @return {string}
 */
function buildUrl(userUrl, baseUrl) {
  if (!baseUrl || /^https?:/.test(userUrl)) {
    return userUrl;
  }

  return (baseUrl + '/' + userUrl).replace(/([^:])\/{2,}/g, '$1/');
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
 * @class  {HttpApi}
 * @param  {object}  opts
 * @param  {object}  [opts.agent]
 * @param  {boolean} [opts.json]    true by default
 * @param  {number}  [opts.retries] 5 by default (from got)
 * @param  {number}  [opts.timeout]
 * @param  {string}  [opts.uri]
 * @param  {string}  [opts.token]
 * @return {httpApi}
 */
function HttpApi(opts) {
  const token = result(opts, 'token');
  if (token) {
    this._token = this._token || `token ${token}`;
  }

  this._uri = result(opts, 'uri');
  this._global = defaults(pick(opts, [
    'agent',
    'json',
    'retries',
    'timeout'
  ]), {
    headers: {
      authorization: this._token,
    },
    json: true,
  });
}

/**
 * @param  {string} uri
 * @param  {object} [opts]
 * @return {promise}
 */
HttpApi.prototype.get = function (uri, opts) {
  const url = buildUrl(uri, this._uri);
  debug(`    → GET ${url}`);

  return got.get(url, buildOptions(this._global, opts))
    .then(curry(handleResponse)('GET')(url))
    .catch(curry(handleError)('GET')(url));
};

/**
 * @param  {string} uri
 * @param  {object} body
 * @param  {object} [opts]
 * @return {promise}
 */
HttpApi.prototype.post = function (uri, body, opts) {
  const url = buildUrl(uri, this._uri);
  debug(`    → POST ${url}`);

  return got.post(url, buildOptions(this._global, opts, {body: body}))
    .then(curry(handleResponse)('POST')(url))
    .catch(curry(handleError)('POST')(url));
};

module.exports = HttpApi;
module.exports.HTTPError = HTTPError;
module.exports.MaxRedirectsError = MaxRedirectsError;
module.exports.ParseError = ParseError;
module.exports.RequestError = RequestError;
