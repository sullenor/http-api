'use strict';

const debug = require('debug')('http-api');
const got = require('got');
const {
  HTTPError,         // When server response code is not 2xx. Contains statusCode and statusMessage.
  MaxRedirectsError, // When server redirects you more than 10 times.
  ReadError,         // When reading from response stream fails.
  RequestError,      // When a request fails. Contains a code property with error class code, like ECONNREFUSED.
  ParseError,        // When json option is enabled and JSON.parse fails.
} = got;
const { merge, isString } = require('lodash');

const CHAR = {
  BACKWARD: '←',
  FORWARD: '→',
};

/**
 * @param {object}  [options]
 * @param {string}  [options.authorization]
 * @param {string}  [options.basepath]
 * @param {boolean} [options.json]
 * @param {number}  [options.retries]
 * @param {number}  [options.timeout]
 */
function HttpApi({ authorization, basepath, json = true, retries = 5, timeout } = {}) {
  this._authorization = authorization;
  this._basepath = basepath;
  this._json = json;
  this._retries = retries;
  this._timeout = timeout;
}

/**
 * @param  {string} url
 * @param  {string} method
 * @return {function}
 */
function handleError(url, method) {
  function handler(er) {
    er instanceof HTTPError
      ? debug(`${er.statusCode} ${CHAR.BACKWARD} ${method} ${url}`)
      : debug(`    ${CHAR.BACKWARD} ${method} ${url}`);

    throw er;
  }

  handler.displayName = `Error for ${url}`;

  return handler;
}

/**
 * @param  {string} url
 * @param  {string} method
 * @return {function}
 */
function handleResponse(url, method) {
  function handler(response) {
    debug(`${response.statusCode} ← ${method} ${url}`);
    return response;
  }

  handler.displayName = `Response for ${url}`;

  return handler;
}

HttpApi.prototype = Object.create({
  /**
   * @param  {string} pathname
   * @param  {object} options
   * @param  {object} options.headers
   * @param  {object} options.body
   * @return {promise}
   */
  get: function (pathname, options) {
    const url = buildUrl(this, pathname);
    const opts = buildOptions(this, options);
    debug(`    ${CHAR.FORWARD} GET ${url}`);
    debug(opts);

    return got.get(url, opts)
      .then(handleResponse(url, 'GET'))
      .catch(handleError(url, 'GET'));
  },

  /**
   * @param  {string} pathname
   * @param  {object} options
   * @param  {object} options.headers
   * @param  {object} options.body
   * @return {promise}
   */
  post: function (pathname, options) {
    const url = buildUrl(this, pathname);
    const opts = buildOptions(this, options);
    debug(`    ${CHAR.FORWARD} POST ${url}`);
    debug(opts);

    return got.post(url, opts)
      .then(handleResponse(url, 'GET'))
      .catch(handleError(url, 'GET'));
  },
}, {
  retries: {
    get: function () {
      return this._retries;
    },
  },
});

HttpApi.prototype.constructor = HttpApi;

module.exports = HttpApi;
module.exports.HTTPError = HTTPError;
module.exports.MaxRedirectsError = MaxRedirectsError;
module.exports.ReadError = ReadError;
module.exports.RequestError = RequestError;
module.exports.ParseError = ParseError;

/**
 * @param  {string} options._authorization: authorization
 * @param  {boolean} options._json:         json
 * @param  {number} options._retries:       retries
 * @param  {number} options._timeout:       timeout
 * @param  {string} provided
 * @return {object}
 */
function buildOptions({
  _authorization: authorization,
  _json: json,
  _retries: retries,
  _timeout: timeout,
}, provided) {
  const opts = {json, retries, timeout};
  isString(authorization) && (opts.headers = {authorization});
  return merge(opts, provided);
}

/**
 * @param  {string} options._basepath: basepath
 * @param  {string} provided
 * @return {string}
 */
function buildUrl({ _basepath: basepath }, provided) {
  if (!isString(basepath) || hasProtocol(provided)) {
    return provided;
  }

  return `${basepath}/${provided}`.replace(/([^:])\/{2,}/g, '$1/');
}

/**
 * @param  {string} pathname
 * @return {boolean}
 */
function hasProtocol(pathname) {
  return /^https?:/.test(pathname);
}
