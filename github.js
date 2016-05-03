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

// gists

Github.prototype.listAUsersGists = function (_, options) {
  // https://developer.github.com/v3/gists/#list-a-users-gists
  return this.get('/gists', options);
};

Github.prototype.listAllPublicGists = function (_, options) {
  // https://developer.github.com/v3/gists/#list-all-public-gists
  return this.get('/gists/public', options);
};

Github.prototype.listStarredGists = function (_, options) {
  // https://developer.github.com/v3/gists/#list-starred-gists
  return this.get('/gists/starred', options);
};

Github.prototype.getASingleGist = function ({ id }, options) {
  // https://developer.github.com/v3/gists/#get-a-single-gist
  return this.get(`/gists/${id}`, options);
};

Github.prototype.getASpecificRevisionOfAGist = function ({ id, sha }, options) {
  // https://developer.github.com/v3/gists/#get-a-specific-revision-of-a-gist
  return this.get(`/gists/${id}/${sha}`, options);
};

Github.prototype.createAGist = function (_, options) {
  // https://developer.github.com/v3/gists/#create-a-gist
  return this.post('/gists', options);
};

// Github.prototype.editAGist = function (_, options) {
//   // https://developer.github.com/v3/gists/#edit-a-gist
//   return this.patch(`/gists/:id`, options);
// };

Github.prototype.listGistCommits = function ({ id }, options) {
  // https://developer.github.com/v3/gists/#list-gist-commits
  return this.get(`/gists/${id}/commits`, options);
};

// Github.prototype.starAGist = function (_, options) {
//   // https://developer.github.com/v3/gists/#star-a-gist
//   return this.put(`/gists/:id/star`, options);
// };

// Github.prototype.unstarAGist = function (_, options) {
//   // https://developer.github.com/v3/gists/#unstar-a-gist
//   return this.delete(`/gists/:id/star`, options);
// };

Github.prototype.checkIfAGistIsStarred = function ({ id }, options) {
  // https://developer.github.com/v3/gists/#check-if-a-gist-is-starred
  return this.get(`/gists/${id}/star`, options);
};

Github.prototype.forkAGist = function ({ id }, options) {
  // https://developer.github.com/v3/gists/#fork-a-gist
  return this.post(`/gists/${id}/forks`, options);
};

Github.prototype.listGistForks = function ({ id }, options) {
  // https://developer.github.com/v3/gists/#list-gist-forks
  return this.get(`/gists/${id}/forks`, options);
};

// Github.prototype.deleteAGist = function (_, options) {
//   // https://developer.github.com/v3/gists/#delete-a-gist
//   return this.delete(`/gists/:id`, options);
// };

// issues

Github.prototype.listIssues = function (_, options) {
  // https://developer.github.com/v3/issues/#list-issues
  return this.get('/issues', options);
};

Github.prototype.listIssuesForARepository = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/issues/#list-issues-for-a-repository"
  return this.get(`/repos/${owner}/${repo}/issues`, options);
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

// orgs

Github.prototype.listYourOrganizations = function (_, options) {
  // https://developer.github.com/v3/orgs/#list-your-organizations
  return this.get('/user/orgs', options);
};

Github.prototype.listAllOrganizations = function (_, options) {
  // https://developer.github.com/v3/orgs/#list-all-organizations
  return this.get('/organizations', options);
};

Github.prototype.listUserOrganizations = function ({ username }, options) {
  // https://developer.github.com/v3/orgs/#list-user-organizations
  return this.get(`/users/${username}/orgs`, options);
};

Github.prototype.getAnOrganization = function ({ org }, options) {
  // https://developer.github.com/v3/orgs/#get-an-organization
  return this.get(`/orgs/${org}`, options);
};

Github.prototype.editAnOrganization = function ({ org }, options) {
  // https://developer.github.com/v3/orgs/#edit-an-organization
  return this.patch(`/orgs/${org}`, options);
};

// pulls

Github.prototype.listPullRequests = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/pulls/#list-pull-requests
  return this.get(`/repos/${owner}/${repo}/pulls`, options);
};

Github.prototype.getASinglePullRequest = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/pulls/#get-a-single-pull-request
  return this.get(`/repos/${owner}/${repo}/pulls/${number}`, options);
};

Github.prototype.createAPullRequest = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/pulls/#create-a-pull-request
  return this.post(`/repos/${owner}/${repo}/pulls`, options);
};

// Github.prototype.updateAPullRequest = function (_, options) {
//   // https://developer.github.com/v3/pulls/#update-a-pull-request
//   return this.patch(`/repos/:owner/:repo/pulls/:number`, options);
// };

Github.prototype.listCommitsOnAPullRequest = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/pulls/#list-commits-on-a-pull-request
  return this.get(`/repos/${owner}/${repo}/pulls/${number}/commits`, options);
};

Github.prototype.listPullRequestsFiles = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/pulls/#list-pull-requests-files
  return this.get(`/repos/${owner}/${repo}/pulls/${number}/files`, options);
};

Github.prototype.getIfAPullRequestHasBeenMerged = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/pulls/#get-if-a-pull-request-has-been-merged
  return this.get(`/repos/${owner}/${repo}/pulls/${number}/merge`, options);
};

// Github.prototype.mergeAPullRequest = function (_, options) {
//   // https://developer.github.com/v3/pulls/#merge-a-pull-request-merge-button
//   return this.put(`/repos/:owner/:repo/pulls/:number/merge`, options);
// };

// repos

Github.prototype.listYourRepositories = function (_, options) {
  // https://developer.github.com/v3/repos/#list-your-repositories
  return this.get('/user/repos', options);
};

Github.prototype.listUserRepositories = function ({ username }, options) {
  // https://developer.github.com/v3/repos/#list-user-repositories
  return this.get(`/users/${username}/repos`, options);
};

Github.prototype.listOrganizationRepositories = function ({ org }, options) {
  // https://developer.github.com/v3/repos/#list-organization-repositories
  return this.get(`/orgs/${org}/repos`, options);
};

Github.prototype.listAllPublicRepositories = function (_, options) {
  // https://developer.github.com/v3/repos/#list-all-public-repositories
  return this.get('/repositories', options);
};

Github.prototype.create = function (_, options) {
  // https://developer.github.com/v3/repos/#create
  return this.post('/user/repos', options);
};

Github.prototype.getRepo = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/repos/#get
  return this.get(`/repos/${owner}/${repo}`, options);
};

// Github.prototype.edit = function (_, options) {
//   // https://developer.github.com/v3/repos/#edit
//   return this.patch(`/repos/:owner/:repo`, options);
// };

Github.prototype.listContributors = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/repos/#list-contributors
  return this.get(`/repos/${owner}/${repo}/contributors`, options);
};

Github.prototype.listLanguages = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/repos/#list-languages
  return this.get(`/repos/${owner}/${repo}/languages`, options);
};

Github.prototype.listTeams = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/repos/#list-teams
  return this.get(`/repos/${owner}/${repo}/teams`, options);
};

Github.prototype.listTags = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/repos/#list-tags
  return this.get(`/repos/${owner}/${repo}/tags`, options);
};

Github.prototype.listBranches = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/repos/#list-branches
  return this.get(`/repos/${owner}/${repo}/branches`, options);
};

Github.prototype.getBranch = function ({ owner, repo, branch }, options) {
  // https://developer.github.com/v3/repos/#get-branch
  return this.get(`/repos/${owner}/${repo}/branches/${branch}`, options);
};

// Github.prototype.enablingAndDisablingBranchProtection = function ({ owner, repo }, options) {
//   // https://developer.github.com/v3/repos/#enabling-and-disabling-branch-protection
//   return this.patch(`/repos/${owner}/${repo}/branches/:branch`, options);
// };

// Github.prototype.deleteARepository = function ({ owner, repo }, options) {
//   // https://developer.github.com/v3/repos/#delete-a-repository
//   return this.delete(`/repos/${owner}/${repo}`, options);
// };

// search

Github.prototype.searchRepositories = function (_, options) {
  // https://developer.github.com/v3/search/#search-repositories
  return this.get('/search/repositories', options);
};

Github.prototype.searchCode = function (_, options) {
  // https://developer.github.com/v3/search/#search-code
  return this.get('/search/code', options);
};

Github.prototype.searchIssues = function (_, options) {
  // https://developer.github.com/v3/search/#search-issues
  return this.get('/search/issues', options);
};

Github.prototype.searchUsers = function (_, options) {
  // https://developer.github.com/v3/search/#search-users
  return this.get('/search/users', options);
};

// users

Github.prototype.getASingleUser = function ({ username }, options) {
  // https://developer.github.com/v3/users/#get-a-single-user
  return this.get(`/users/${username}`, options);
};

Github.prototype.getTheAuthenticatedUser = function (_, options) {
  // https://developer.github.com/v3/users/#get-the-authenticated-user
  return this.get('/user', options);
};

// Github.prototype.updateTheAuthenticatedUser = function (_, options) {
//   // https://developer.github.com/v3/users/#update-the-authenticated-user
//   return this.patch(`/user`, options);
// };

Github.prototype.getAllUsers = function (_, options) {
  // https://developer.github.com/v3/users/#get-all-users
  return this.get('/users', options);
};

module.exports = Github;
