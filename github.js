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

// gists/

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

Github.prototype.listGistCommits = function ({ id }, options) {
  // https://developer.github.com/v3/gists/#list-gist-commits
  return this.get(`/gists/${id}/commits`, options);
};

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

// gists/comments/

Github.prototype.listCommentsOnAGist = function ({ gistId }, options) {
  // https://developer.github.com/v3/gists/comments/#list-comments-on-a-gist
  return this.get(`/gists/${gistId}/comments`, options);
};

Github.prototype.getASingleCommentFromAGist = function ({ gistId, id }, options) {
  // https://developer.github.com/v3/gists/comments/#get-a-single-comment
  return this.get(`/gists/${gistId}/comments/${id}`, options);
};

Github.prototype.createACommentForAGist = function ({ gistId }, options) {
  // https://developer.github.com/v3/gists/comments/#create-a-comment
  return this.post(`/gists/${gistId}/comments`, options);
};

// issues/

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

// issues/assignees/

Github.prototype.listAssignees = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/issues/assignees/#list-assignees
  return this.get(`/repos/${owner}/${repo}/assignees`, options);
};

Github.prototype.checkAssignee = function ({ owner, repo, assignee }, options) {
  // https://developer.github.com/v3/issues/assignees/#check-assignee
  return this.get(`/repos/${owner}/${repo}/assignees/${assignee}`, options);
};

// issues/comments/

Github.prototype.listCommentsOnAnIssue = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/issues/comments/#list-comments-on-an-issue
  return this.get(`/repos/${owner}/${repo}/issues/${number}/comments`, options);
};

Github.prototype.listCommentsInARepository = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/issues/comments/#list-comments-in-a-repository
  return this.get(`/repos/${owner}/${repo}/issues/comments`, options);
};

Github.prototype.getASingleCommentFromARepository = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/issues/comments/#get-a-single-comment
  return this.get(`/repos/${owner}/${repo}/issues/comments/:id`, options);
};

Github.prototype.createACommentForARepository = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/issues/comments/#create-a-comment
  return this.post(`/repos/${owner}/${repo}/issues/${number}/comments`, options);
};

// issues/events/

Github.prototype.listEventsForAnIssue = function ({ owner, repo, issueNumber }, options) {
  // https://developer.github.com/v3/issues/events/#list-events-for-an-issue
  return this.get(`/repos/${owner}/${repo}/issues/${issueNumber}/events`, options);
};

Github.prototype.listEventsForARepository = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/issues/events/#list-events-for-a-repository
  return this.get(`/repos/${owner}/${repo}/issues/events`, options);
};

Github.prototype.getASingleEvent = function ({ owner, repo, id }, options) {
  // https://developer.github.com/v3/issues/events/#get-a-single-event
  return this.get(`/repos/${owner}/${repo}/issues/events/${id}`, options);
};

// issues/labels/

Github.prototype.listAllLabelsForThisRepository = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/issues/labels/#list-all-labels-for-this-repository
  return this.get(`/repos/${owner}/${repo}/labels`, options);
};

Github.prototype.getASingleLabel = function ({ owner, repo, name }, options) {
  // https://developer.github.com/v3/issues/labels/#get-a-single-label
  return this.get(`/repos/${owner}/${repo}/labels/${name}`, options);
};

Github.prototype.createALabel = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/issues/labels/#create-a-label
  return this.post(`/repos/${owner}/${repo}/labels`, options);
};

Github.prototype.listLabelsOnAnIssue = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/issues/labels/#list-labels-on-an-issue
  return this.get(`/repos/${owner}/${repo}/issues/${number}/labels`, options);
};

Github.prototype.addLabelsToAnIssue = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/issues/labels/#add-labels-to-an-issue
  return this.post(`/repos/${owner}/${repo}/issues/${number}/labels`, options);
};

Github.prototype.getLabelsForEveryIssueInAMilestone = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/issues/labels/#get-labels-for-every-issue-in-a-milestone
  return this.get(`/repos/${owner}/${repo}/milestones/${number}/labels`, options);
};

// issues/milestones/

Github.prototype.listMilestonesForARepository = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/issues/milestones/#list-milestones-for-a-repository
  return this.get(`/repos/${owner}/${repo}/milestones`, options);
};

Github.prototype.getASingleMilestone = function ({ owner, repo, number }, options) {
  // https://developer.github.com/v3/issues/milestones/#get-a-single-milestone
  return this.get(`/repos/${owner}/${repo}/milestones/${number}`, options);
};

Github.prototype.createAMilestone = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/issues/milestones/#create-a-milestone
  return this.post(`/repos/${owner}/${repo}/milestones`, options);
};

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

// orgs/members/

Github.prototype.membersList = function ({ org }, options) {
  // https://developer.github.com/v3/orgs/members/#members-list
  return this.get(`/orgs/${org}/members`, options);
};

Github.prototype.checkMembership = function ({ org, username }, options) {
  // https://developer.github.com/v3/orgs/members/#check-membership
  return this.get(`/orgs/${org}/members/${username}`, options);
};

Github.prototype.publicMembersList = function ({ org }, options) {
  // https://developer.github.com/v3/orgs/members/#public-members-list
  return this.get(`/orgs/${org}/public_members`, options);
};

Github.prototype.checkPublicMembership = function ({ org, username }, options) {
  // https://developer.github.com/v3/orgs/members/#check-public-membership
  return this.get(`/orgs/${org}/public_members/${username}`, options);
};

Github.prototype.getOrganizationMembership = function ({ org, username }, options) {
  // https://developer.github.com/v3/orgs/members/#get-organization-membership
  return this.get(`/orgs/${org}/memberships/${username}`, options);
};

Github.prototype.listYourOrganizationMemberships = function (_, options) {
  // https://developer.github.com/v3/orgs/members/#list-your-organization-memberships
  return this.get('/user/memberships/orgs', options);
};

Github.prototype.getYourOrganizationMembership = function ({ org }, options) {
  // https://developer.github.com/v3/orgs/members/#get-your-organization-membership
  return this.get(`/user/memberships/orgs/${org}`, options);
};

// orgs/teams/

Github.prototype.listTeamsForARepositoryForAnOrg = function ({ org }, options) {
  // https://developer.github.com/v3/orgs/teams/#list-teams
  return this.get(`/orgs/${org}/teams`, options);
};

Github.prototype.getTeam = function ({ id }, options) {
  // https://developer.github.com/v3/orgs/teams/#get-team
  return this.get(`/teams/${id}`, options);
};

Github.prototype.createTeam = function ({ org }, options) {
  // https://developer.github.com/v3/orgs/teams/#create-team
  return this.post(`/orgs/${org}/teams`, options);
};

Github.prototype.listTeamMembers = function ({ id }, options) {
  // https://developer.github.com/v3/orgs/teams/#list-team-members
  return this.get(`/teams/${id}/members`, options);
};

Github.prototype.getTeamMember = function ({ id, username }, options) {
  // https://developer.github.com/v3/orgs/teams/#get-team-member
  return this.get(`/teams/${id}/members/${username}`, options);
};

Github.prototype.getTeamMembership = function ({ id, username }, options) {
  // https://developer.github.com/v3/orgs/teams/#get-team-membership
  return this.get(`/teams/${id}/memberships/${username}`, options);
};

Github.prototype.listTeamRepos = function ({ id }, options) {
  // https://developer.github.com/v3/orgs/teams/#list-team-repos
  return this.get(`/teams/${id}/repos`, options);
};

Github.prototype.checkIfATeamManagesARepository = function ({ id, owner, repo }, options) {
  // https://developer.github.com/v3/orgs/teams/#check-if-a-team-manages-a-repository
  return this.get(`/teams/${id}/repos/${owner}/${repo}`, options);
};

Github.prototype.listUserTeams = function (_, options) {
  // https://developer.github.com/v3/orgs/teams/#list-user-teams
  return this.get('/user/teams', options);
};

// orgs/hooks/

Github.prototype.scopesRestrictions = function ({ org }, options) {
  // https://developer.github.com/v3/orgs/hooks/#scopes--restrictions
  return this.get(`/orgs/${org}/hooks`, options);
};

Github.prototype.listHooks = function ({ org }, options) {
  // https://developer.github.com/v3/orgs/hooks/#list-hooks
  return this.get(`/orgs/${org}/hooks`, options);
};

Github.prototype.getSingleHook = function ({ org, id }, options) {
  // https://developer.github.com/v3/orgs/hooks/#get-single-hook
  return this.get(`/orgs/${org}/hooks/${id}`, options);
};

Github.prototype.createAHook = function ({ org }, options) {
  // https://developer.github.com/v3/orgs/hooks/#create-a-hook
  return this.post(`/orgs/${org}/hooks`, options);
};

Github.prototype.pingAHook = function ({ org, id }, options) {
  // https://developer.github.com/v3/orgs/hooks/#ping-a-hook
  return this.post(`/orgs/${org}/hooks/${id}/pings`, options);
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

Github.prototype.listContributors = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/repos/#list-contributors
  return this.get(`/repos/${owner}/${repo}/contributors`, options);
};

Github.prototype.listLanguages = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/repos/#list-languages
  return this.get(`/repos/${owner}/${repo}/languages`, options);
};

Github.prototype.listTeamsForARepository = function ({ owner, repo }, options) {
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

Github.prototype.getAllUsers = function (_, options) {
  // https://developer.github.com/v3/users/#get-all-users
  return this.get('/users', options);
};

module.exports = Github;
