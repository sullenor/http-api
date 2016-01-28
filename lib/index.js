'use strict';

const assign = require('lodash').assign;
const debug = require('debug')('http-api');
const got = require('got');

/**
 * @class  {HttpApi}
 * @param  {object} opts
 * @param  {object} opts.agent
 * @param  {object} opts.uri
 * @param  {object} opts.token
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
  return got.get(uri, opts);
};

/**
 * @param  {string} uri
 * @param  {object} body
 * @param  {object} [opts]
 * @return {promise}
 */
HttpApi.prototype.post = function (uri, body, opts) {
  return got.post(uri, assign({}, opts, {body: body}));
};

module.exports = HttpApi;
