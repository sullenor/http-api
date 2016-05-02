'use strict';

const HttpApi = require('./lib');
const { inherits } = require('util');
const { isBoolean, isString } = require('lodash');

/**
 * @param {object}  [options]
 * @param {string}  [options.authorization] 'token OAUTH-TOKEN' for example
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

// issues

Github.prototype.listIssues = function (_, options) {
  // https://developer.github.com/v3/issues/#list-issues
  return this.get(`/issues`, options);
};

Github.prototype.listIssuesForARepository = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/issues/#list-issues-for-a-repository"
  return this.get(`/repos/${owner}/${repo}/issues`);
};

Github.prototype.getASingleIssue = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/issues/#get-a-single-issue"
  return this.get(`/repos/${owner}/${repo}/issues/${number}`, options);
};

Github.prototype.createAnIssue = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/issues/#create-an-issue"
  return this.post(`/repos/${owner}/${repo}/issues`, options);
};

// Github.prototype.editAnIssue = function (_, options) {
//   // https://developer.github.com/v3/issues/#edit-an-issue"
//   return this.patch(`/repos/:owner/:repo/issues/:number`, options);
// };

// Github.prototype.lockAnIssue = function (_, options) {
//   // https://developer.github.com/v3/issues/#lock-an-issue"
//   return this.put(`/repos/:owner/:repo/issues/:number/lock`, options);
// };

// Github.prototype.unlockAnIssue = function (_, options) {
//   // https://developer.github.com/v3/issues/#unlock-an-issue"
//   return this.delete(`/repos/:owner/:repo/issues/:number/lock`, options);
// };

// pulls

Github.prototype.linkRelations = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/pulls/#link-relations
  return this.get(`/repos/${owner}/${repo}/pulls`, options);;
};

Github.prototype.listPullRequests = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/pulls/#list-pull-requests
  return this.get(`/repos/${owner}/${repo}/pulls`, options);;
};

Github.prototype.getASinglePullRequest = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/pulls/#get-a-single-pull-request
  return this.get(`/repos/${owner}/${repo}/pulls/:number`, options);;
};

Github.prototype.createAPullRequest = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/pulls/#create-a-pull-request
  return this.post(`/repos/${owner}/${repo}/pulls`, options);;
};

// Github.prototype.updateAPullRequest = function (_, options) {
//   // https://developer.github.com/v3/pulls/#update-a-pull-request
//   return this.patch(`/repos/:owner/:repo/pulls/:number`, options);;
// };

Github.prototype.listCommitsOnAPullRequest = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/pulls/#list-commits-on-a-pull-request
  return this.get(`/repos/${owner}/${repo}/pulls/${number}/commits`, options);;
};

Github.prototype.listPullRequestsFiles = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/pulls/#list-pull-requests-files
  return this.get(`/repos/${owner}/${repo}/pulls/${number}/files`, options);;
};

Github.prototype.getIfAPullRequestHasBeenMerged = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/pulls/#get-if-a-pull-request-has-been-merged
  return this.get(`/repos/${owner}/${repo}/pulls/${number}/merge`, options);;
};

// Github.prototype.mergeAPullRequestMergeButton = function (_, options) {
//   // https://developer.github.com/v3/pulls/#merge-a-pull-request-merge-button
//   return this.put(`/repos/:owner/:repo/pulls/:number/merge`, options);;
// };

module.exports = Github;
