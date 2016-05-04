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
  isString(this._basepath) || (this._basepath = 'https://api.Github.com/');
  isBoolean(this._json) || (this._json = true);
}

inherits(Github, HttpApi);

// https://developer.Github.com/v3/activity/events/

Github.prototype.listPublicEvents = function (_, options) {
  // https://developer.Github.com/v3/activity/events/#list-public-events
  return this.get('/events', options);
};

Github.prototype.listRepositoryEvents = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/events/#list-repository-events
  return this.get(`/repos/${owner}/${repo}/events`, options);
};

Github.prototype.listIssueEventsForARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/events/#list-issue-events-for-a-repository
  return this.get(`/repos/${owner}/${repo}/issues/events`, options);
};

Github.prototype.listPublicEventsForANetworkOfRepositories = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/events/#list-public-events-for-a-network-of-repositories
  return this.get(`/networks/${owner}/${repo}/events`, options);
};

Github.prototype.listPublicEventsForAnOrganization = function ({ org }, options) {
  // https://developer.Github.com/v3/activity/events/#list-public-events-for-an-organization
  return this.get(`/orgs/${org}/events`, options);
};

Github.prototype.listEventsThatAUserHasReceived = function ({ username }, options) {
  // https://developer.Github.com/v3/activity/events/#list-events-that-a-user-has-received
  return this.get(`/users/${username}/received_events`, options);
};

Github.prototype.listPublicEventsThatAUserHasReceived = function ({ username }, options) {
  // https://developer.Github.com/v3/activity/events/#list-public-events-that-a-user-has-received
  return this.get(`/users/${username}/received_events/public`, options);
};

Github.prototype.listEventsPerformedByAUser = function ({ username }, options) {
  // https://developer.Github.com/v3/activity/events/#list-events-performed-by-a-user
  return this.get(`/users/${username}/events`, options);
};

Github.prototype.listPublicEventsPerformedByAUser = function ({ username }, options) {
  // https://developer.Github.com/v3/activity/events/#list-public-events-performed-by-a-user
  return this.get(`/users/${username}/events/public`, options);
};

Github.prototype.listEventsForAnOrganization = function ({ username, org }, options) {
  // https://developer.Github.com/v3/activity/events/#list-events-for-an-organization
  return this.get(`/users/${username}/events/orgs/${org}`, options);
};

// https://developer.Github.com/v3/activity/feeds/

Github.prototype.listFeeds = function (_, options) {
  // https://developer.Github.com/v3/activity/feeds/#list-feeds
  return this.get('/feeds', options);
};

// https://developer.Github.com/v3/activity/notifications/

Github.prototype.listYourNotifications = function (_, options) {
  // https://developer.github.com/v3/activity/notifications/#list-your-notifications
  return this.get('/notifications', options);
};

Github.prototype.listYourNotificationsInARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/notifications/#list-your-notifications-in-a-repository
  return this.get(`/repos/${owner}/${repo}/notifications`, options);
};

Github.prototype.markAsRead = function (_, options) {
  // https://developer.Github.com/v3/activity/notifications/#mark-as-read
  return this.put('/notifications', options);
};

Github.prototype.markNotificationsAsReadInARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/notifications/#mark-notifications-as-read-in-a-repository
  return this.put(`/repos/${owner}/${repo}/notifications`, options);
};

Github.prototype.viewASingleThread = function ({ id }, options) {
  // https://developer.Github.com/v3/activity/notifications/#view-a-single-thread
  return this.get(`/notifications/threads/${id}`, options);
};

Github.prototype.markAThreadAsRead = function ({ id }, options) {
  // https://developer.Github.com/v3/activity/notifications/#mark-a-thread-as-read
  return this.patch(`/notifications/threads/${id}`, options);
};

Github.prototype.getAThreadSubscription = function ({ id }, options) {
  // https://developer.Github.com/v3/activity/notifications/#get-a-thread-subscription
  return this.get(`/notifications/threads/${id}/subscription`, options);
};

Github.prototype.setAThreadSubscription = function ({ id }, options) {
  // https://developer.Github.com/v3/activity/notifications/#set-a-thread-subscription
  return this.put(`/notifications/threads/${id}/subscription`, options);
};

Github.prototype.deleteAThreadSubscription = function ({ id }, options) {
  // https://developer.Github.com/v3/activity/notifications/#delete-a-thread-subscription
  return this.delete(`/notifications/threads/${id}/subscription`, options);
};

// https://developer.Github.com/v3/activity/starring/

Github.prototype.listStargazers = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/starring/#list-stargazers
  return this.get(`/repos/${owner}/${repo}/stargazers`, options);
};

Github.prototype.listRepositoriesBeingStarred = function ({ username }, options) {
  // https://developer.Github.com/v3/activity/starring/#list-repositories-being-starred
  return this.get(`/users/${username}/starred`, options);
};

Github.prototype.checkIfYouAreStarringARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/starring/#check-if-you-are-starring-a-repository
  return this.get(`/user/starred/${owner}/${repo}`, options);
};

Github.prototype.starARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/starring/#star-a-repository
  return this.put(`/user/starred/${owner}/${repo}`, options);
};

Github.prototype.unstarARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/starring/#unstar-a-repository
  return this.delete(`/user/starred/${owner}/${repo}`, options);
};

// https://developer.Github.com/v3/activity/watching/

Github.prototype.listWatchers = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/watching/#list-watchers
  return this.get(`/repos/${owner}/${repo}/subscribers`, options);
};

Github.prototype.listRepositoriesBeingWatched = function ({ username }, options) {
  // https://developer.Github.com/v3/activity/watching/#list-repositories-being-watched
  return this.get(`/users/${username}/subscriptions`, options);
};

Github.prototype.getARepositorySubscription = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/watching/#get-a-repository-subscription
  return this.get(`/repos/${owner}/${repo}/subscription`, options);
};

Github.prototype.setARepositorySubscription = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/watching/#set-a-repository-subscription
  return this.put(`/repos/${owner}/${repo}/subscription`, options);
};

Github.prototype.deleteARepositorySubscription = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/watching/#delete-a-repository-subscription
  return this.delete(`/repos/${owner}/${repo}/subscription`, options);
};

Github.prototype.checkIfYouAreWatchingARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/watching/#check-if-you-are-watching-a-repository-legacy
  return this.get(`/user/subscriptions/${owner}/${repo}`, options);
};

Github.prototype.watchARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/watching/#watch-a-repository-legacy
  return this.put(`/user/subscriptions/${owner}/${repo}`, options);
};

Github.prototype.stopWatchingARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/activity/watching/#stop-watching-a-repository-legacy
  return this.delete(`/user/subscriptions/${owner}/${repo}`, options);
};

// https://developer.Github.com/v3/gists/

Github.prototype.listAUsersGists = function ({ username }, options) {
  // https://developer.Github.com/v3/gists/#list-a-users-gists
  return this.get(`/users/${username}/gists`, options);
};

Github.prototype.listAllPublicGists = function (_, options) {
  // https://developer.Github.com/v3/gists/#list-all-public-gists
  return this.get('/gists/public', options);
};

Github.prototype.listStarredGists = function (_, options) {
  // https://developer.Github.com/v3/gists/#list-starred-gists
  return this.get('/gists/starred', options);
};

Github.prototype.getASingleGist = function ({ id }, options) {
  // https://developer.Github.com/v3/gists/#get-a-single-gist
  return this.get(`/gists/${id}`, options);
};

Github.prototype.getASpecificRevisionOfAGist = function ({ id, sha }, options) {
  // https://developer.Github.com/v3/gists/#get-a-specific-revision-of-a-gist
  return this.get(`/gists/${id}/${sha}`, options);
};

Github.prototype.createAGist = function (_, options) {
  // https://developer.Github.com/v3/gists/#create-a-gist
  return this.post('/gists', options);
};

Github.prototype.editAGist = function ({ id }, options) {
  // https://developer.Github.com/v3/gists/#edit-a-gist
  return this.patch(`/gists/${id}`, options);
};

Github.prototype.listGistCommits = function ({ id }, options) {
  // https://developer.Github.com/v3/gists/#list-gist-commits
  return this.get(`/gists/${id}/commits`, options);
};

Github.prototype.starAGist = function ({ id }, options) {
  // https://developer.Github.com/v3/gists/#star-a-gist
  return this.put(`/gists/${id}/star`, options);
};

Github.prototype.unstarAGist = function ({ id }, options) {
  // https://developer.Github.com/v3/gists/#unstar-a-gist
  return this.delete(`/gists/${id}/star`, options);
};

Github.prototype.checkIfAGistIsStarred = function ({ id }, options) {
  // https://developer.Github.com/v3/gists/#check-if-a-gist-is-starred
  return this.get(`/gists/${id}/star`, options);
};

Github.prototype.forkAGist = function ({ id }, options) {
  // https://developer.Github.com/v3/gists/#fork-a-gist
  return this.post(`/gists/${id}/forks`, options);
};

Github.prototype.listGistForks = function ({ id }, options) {
  // https://developer.Github.com/v3/gists/#list-gist-forks
  return this.get(`/gists/${id}/forks`, options);
};

Github.prototype.deleteAGist = function ({ id }, options) {
  // https://developer.Github.com/v3/gists/#delete-a-gist
  return this.delete(`/gists/${id}`, options);
};

// https://developer.Github.com/v3/gists/comments/

Github.prototype.listCommentsOnAGist = function ({ gistId }, options) {
  // https://developer.Github.com/v3/gists/comments/#list-comments-on-a-gist
  return this.get(`/gists/${gistId}/comments`, options);
};

Github.prototype.getASingleCommentFromAGist = function ({ gistId, id }, options) {
  // https://developer.Github.com/v3/gists/comments/#get-a-single-comment
  return this.get(`/gists/${gistId}/comments/${id}`, options);
};

Github.prototype.createACommentForAGist = function ({ gistId }, options) {
  // https://developer.Github.com/v3/gists/comments/#create-a-comment
  return this.post(`/gists/${gistId}/comments`, options);
};

Github.prototype.editACommentForAGist = function ({ gistId, id }, options) {
  // https://developer.Github.com/v3/gists/comments/#edit-a-comment
  return this.patch(`/gists/${gistId}/comments/${id}`, options);
};

Github.prototype.deleteACommentFromAGist = function ({ gistId, id }, options) {
  // https://developer.Github.com/v3/gists/comments/#delete-a-comment
  return this.delete(`/gists/${gistId}/comments/${id}`, options);
};

// https://developer.Github.com/v3/git/blobs/

Github.prototype.getABlob = function ({ owner, repo, sha }, options) {
  // https://developer.Github.com/v3/git/blobs/#get-a-blob
  return this.get(`/repos/${owner}/${repo}/git/blobs/${sha}`, options);
};

Github.prototype.createABlob = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/git/blobs/#create-a-blob
  return this.post(`/repos/${owner}/${repo}/git/blobs`, options);
};

// https://developer.Github.com/v3/git/commits/

Github.prototype.getACommit = function ({ owner, repo, sha }, options) {
  // https://developer.Github.com/v3/git/commits/#get-a-commit
  return this.get(`/repos/${owner}/${repo}/git/commits/${sha}`, options);
};

Github.prototype.createACommit = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/git/commits/#create-a-commit
  return this.post(`/repos/${owner}/${repo}/git/commits`, options);
};

// https://developer.Github.com/v3/git/refs/

Github.prototype.getAReference = function ({ owner, repo, ref }, options) {
  // https://developer.Github.com/v3/git/refs/#get-a-reference
  return this.get(`/repos/${owner}/${repo}/git/refs/${ref}`, options);
};

Github.prototype.getAllReferences = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/git/refs/#get-all-references
  return this.get(`/repos/${owner}/${repo}/git/refs`, options);
};

Github.prototype.createAReference = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/git/refs/#create-a-reference
  return this.post(`/repos/${owner}/${repo}/git/refs`, options);
};

Github.prototype.updateAReference = function ({ owner, repo, ref }, options) {
  // https://developer.Github.com/v3/git/refs/#update-a-reference
  return this.patch(`/repos/${owner}/${repo}/git/refs/${ref}`, options);
};

Github.prototype.deleteAReference = function ({ owner, repo, ref }, options) {
  // https://developer.Github.com/v3/git/refs/#delete-a-reference
  return this.delete(`/repos/${owner}/${repo}/git/refs/${ref}`, options);
};

// https://developer.Github.com/v3/git/tags/

Github.prototype.getATag = function ({ owner, repo, sha }, options) {
  // https://developer.Github.com/v3/git/tags/#get-a-tag
  return this.get(`/repos/${owner}/${repo}/git/tags/${sha}`, options);
};

Github.prototype.createATagObject = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/git/tags/#create-a-tag-object
  return this.post(`/repos/${owner}/${repo}/git/tags`, options);
};

// https://developer.Github.com/v3/git/trees/

Github.prototype.getATree = function ({ owner, repo, sha }, options) {
  // https://developer.Github.com/v3/git/trees/#get-a-tree
  return this.get(`/repos/${owner}/${repo}/git/trees/${sha}`, options);
};

Github.prototype.getATreeRecursively = function ({ owner, repo, sha }, options) {
  // https://developer.Github.com/v3/git/trees/#get-a-tree-recursively
  return this.get(`/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`, options);
};

Github.prototype.createATree = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/git/trees/#create-a-tree
  return this.post(`/repos/${owner}/${repo}/git/trees`, options);
};

// https://developer.Github.com/v3/issues/

Github.prototype.listIssues = function (_, options) {
  // https://developer.Github.com/v3/issues/#list-issues
  return this.get('/issues', options);
};

Github.prototype.listIssuesForARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/issues/#list-issues-for-a-repository
  return this.get(`/repos/${owner}/${repo}/issues`, options);
};

Github.prototype.getASingleIssue = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/issues/#get-a-single-issue
  return this.get(`/repos/${owner}/${repo}/issues/${number}`, options);
};

Github.prototype.createAnIssue = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/issues/#create-an-issue
  return this.post(`/repos/${owner}/${repo}/issues`, options);
};

Github.prototype.editAnIssue = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/issues/#edit-an-issue
  return this.patch(`/repos/${owner}/${repo}/issues/${number}`, options);
};

// https://developer.Github.com/v3/issues/assignees/

Github.prototype.listAssignees = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/issues/assignees/#list-assignees
  return this.get(`/repos/${owner}/${repo}/assignees`, options);
};

Github.prototype.checkAssignee = function ({ owner, repo, assignee }, options) {
  // https://developer.Github.com/v3/issues/assignees/#check-assignee
  return this.get(`/repos/${owner}/${repo}/assignees/${assignee}`, options);
};

// https://developer.Github.com/v3/issues/comments/

Github.prototype.listCommentsOnAnIssue = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/issues/comments/#list-comments-on-an-issue
  return this.get(`/repos/${owner}/${repo}/issues/${number}/comments`, options);
};

Github.prototype.listIssueCommentsInARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/issues/comments/#list-comments-in-a-repository
  return this.get(`/repos/${owner}/${repo}/issues/comments`, options);
};

Github.prototype.getASingleCommentFromARepository = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/issues/comments/#get-a-single-comment
  return this.get(`/repos/${owner}/${repo}/issues/comments/${id}`, options);
};

Github.prototype.createACommentForARepository = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/issues/comments/#create-a-comment
  return this.post(`/repos/${owner}/${repo}/issues/${number}/comments`, options);
};

Github.prototype.editACommentForARepository = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/issues/comments/#edit-a-comment
  return this.patch(`/repos/${owner}/${repo}/issues/comments/${id}`, options);
};

Github.prototype.deleteACommentFromARepository = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/issues/comments/#delete-a-comment
  return this.delete(`/repos/${owner}/${repo}/issues/comments/${id}`, options);
};

// https://developer.Github.com/v3/issues/events/

Github.prototype.listEventsForAnIssue = function ({ owner, repo, issueNumber }, options) {
  // https://developer.Github.com/v3/issues/events/#list-events-for-an-issue
  return this.get(`/repos/${owner}/${repo}/issues/${issueNumber}/events`, options);
};

Github.prototype.listEventsForARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/issues/events/#list-events-for-a-repository
  return this.get(`/repos/${owner}/${repo}/issues/events`, options);
};

Github.prototype.getASingleEvent = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/issues/events/#get-a-single-event
  return this.get(`/repos/${owner}/${repo}/issues/events/${id}`, options);
};

// https://developer.Github.com/v3/issues/labels/

Github.prototype.listAllLabelsForThisRepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/issues/labels/#list-all-labels-for-this-repository
  return this.get(`/repos/${owner}/${repo}/labels`, options);
};

Github.prototype.getASingleLabel = function ({ owner, repo, name }, options) {
  // https://developer.Github.com/v3/issues/labels/#get-a-single-label
  return this.get(`/repos/${owner}/${repo}/labels/${name}`, options);
};

Github.prototype.createALabel = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/issues/labels/#create-a-label
  return this.post(`/repos/${owner}/${repo}/labels`, options);
};

Github.prototype.updateALabel = function ({ owner, repo, name }, options) {
  // https://developer.Github.com/v3/issues/labels/#update-a-label
  return this.patch(`/repos/${owner}/${repo}/labels/${name}`, options);
};

Github.prototype.deleteALabel = function ({ owner, repo, name }, options) {
  // https://developer.Github.com/v3/issues/labels/#delete-a-label
  return this.delete(`/repos/${owner}/${repo}/labels/${name}`, options);
};

Github.prototype.listLabelsOnAnIssue = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/issues/labels/#list-labels-on-an-issue
  return this.get(`/repos/${owner}/${repo}/issues/${number}/labels`, options);
};

Github.prototype.addLabelsToAnIssue = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/issues/labels/#add-labels-to-an-issue
  return this.post(`/repos/${owner}/${repo}/issues/${number}/labels`, options);
};

Github.prototype.removeALabelFromAnIssue = function ({ owner, repo, number, name }, options) {
  // https://developer.Github.com/v3/issues/labels/#remove-a-label-from-an-issue
  return this.delete(`/repos/${owner}/${repo}/issues/${number}/labels/${name}`, options);
};

Github.prototype.replaceAllLabelsForAnIssue = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/issues/labels/#replace-all-labels-for-an-issue
  return this.put(`/repos/${owner}/${repo}/issues/${number}/labels`, options);
};

Github.prototype.removeAllLabelsFromAnIssue = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/issues/labels/#remove-all-labels-from-an-issue
  return this.delete(`/repos/${owner}/${repo}/issues/${number}/labels`, options);
};

Github.prototype.getLabelsForEveryIssueInAMilestone = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/issues/labels/#get-labels-for-every-issue-in-a-milestone
  return this.get(`/repos/${owner}/${repo}/milestones/${number}/labels`, options);
};

// https://developer.Github.com/v3/issues/milestones/

Github.prototype.listMilestonesForARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/issues/milestones/#list-milestones-for-a-repository
  return this.get(`/repos/${owner}/${repo}/milestones`, options);
};

Github.prototype.getASingleMilestone = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/issues/milestones/#get-a-single-milestone
  return this.get(`/repos/${owner}/${repo}/milestones/${number}`, options);
};

Github.prototype.createAMilestone = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/issues/milestones/#create-a-milestone
  return this.post(`/repos/${owner}/${repo}/milestones`, options);
};

Github.prototype.updateAMilestone = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/issues/milestones/#update-a-milestone
  return this.patch(`/repos/${owner}/${repo}/milestones/${number}`, options);
};

Github.prototype.deleteAMilestone = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/issues/milestones/#delete-a-milestone
  return this.delete(`/repos/${owner}/${repo}/milestones/${number}`, options);
};

// https://developer.Github.com/v3/migration/migrations/

Github.prototype.startAMigration = function ({ org }, options) {
  // https://developer.Github.com/v3/migration/migrations/#start-a-migration
  return this.post(`/orgs/${org}/migrations`, options);
};

Github.prototype.getAListOfMigrations = function ({ org }, options) {
  // https://developer.Github.com/v3/migration/migrations/#get-a-list-of-migrations
  return this.get(`/orgs/${org}/migrations`, options);
};

Github.prototype.getTheStatusOfAMigration = function ({ org, id }, options) {
  // https://developer.Github.com/v3/migration/migrations/#get-the-status-of-a-migration
  return this.get(`/orgs/${org}/migrations/${id}`, options);
};

Github.prototype.downloadAMigrationArchive = function ({ org, id }, options) {
  // https://developer.Github.com/v3/migration/migrations/#download-a-migration-archive
  return this.get(`/orgs/${org}/migrations/${id}/archive`, options);
};

Github.prototype.deleteAMigrationArchive = function ({ org, id }, options) {
  // https://developer.Github.com/v3/migration/migrations/#delete-a-migration-archive
  return this.delete(`/orgs/${org}/migrations/${id}/archive`, options);
};

Github.prototype.unlockARepository = function ({ org, id, repoName }, options) {
  // https://developer.Github.com/v3/migration/migrations/#unlock-a-repository
  return this.delete(`/orgs/${org}/migrations/${id}/repos/${repoName}/lock`, options);
};

// https://developer.Github.com/v3/migration/source_imports/

Github.prototype.startAnImport = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/migration/source_imports/#start-an-import
  return this.put(`/repos/${owner}/${repo}/import`, options);
};

Github.prototype.getImportProgress = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/migration/source_imports/#get-import-progress
  return this.get(`/repos/${owner}/${repo}/import`, options);
};

Github.prototype.updateExistingImport = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/migration/source_imports/#update-existing-import
  return this.patch(`/repos/${owner}/${repo}/import`, options);
};

Github.prototype.getCommitAuthors = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/migration/source_imports/#get-commit-authors
  return this.get(`/repos/${owner}/${repo}/import/authors`, options);
};

Github.prototype.mapACommitAuthor = function ({ owner, repo, authorId }, options) {
  // https://developer.Github.com/v3/migration/source_imports/#map-a-commit-author
  return this.patch(`/repos/${owner}/${repo}/import/authors/${authorId}`, options);
};

Github.prototype.setGitLfsPreference = function ({ owner, name }, options) {
  // https://developer.Github.com/v3/migration/source_imports/#set-git-lfs-preference
  return this.patch(`/${owner}/${name}/import/lfs`, options);
};

Github.prototype.getLargeFiles = function ({ owner, name }, options) {
  // https://developer.Github.com/v3/migration/source_imports/#get-large-files
  return this.get(`/${owner}/${name}/import/large_files`, options);
};

Github.prototype.cancelAnImport = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/migration/source_imports/#cancel-an-import
  return this.delete(`/repos/${owner}/${repo}/import`, options);
};

// https://developer.Github.com/v3/emojis/

Github.prototype.emojis = function (_, options) {
  // https://developer.Github.com/v3/emojis/#emojis
  return this.get('/emojis', options);
};

// https://developer.Github.com/v3/gitignore/

Github.prototype.listingAvailableTemplates = function (_, options) {
  // https://developer.Github.com/v3/gitignore/#listing-available-templates
  return this.get('/gitignore/templates', options);
};

Github.prototype.getASingleTemplate = function (_, options) {
  // https://developer.Github.com/v3/gitignore/#get-a-single-template
  return this.get('/gitignore/templates/C', options);
};

// https://developer.Github.com/v3/licenses/

Github.prototype.listAllLicenses = function (_, options) {
  // https://developer.Github.com/v3/licenses/#list-all-licenses
  return this.get('/licenses', options);
};

Github.prototype.getAnIndividualLicense = function (_, options) {
  // https://developer.Github.com/v3/licenses/#get-an-individual-license
  return this.get('/licenses/mit', options);
};

Github.prototype.getARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/licenses/#get-a-repositorys-license
  return this.get(`/repos/${owner}/${repo}`, options);
};

Github.prototype.getTheContentsOfARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/licenses/#get-the-contents-of-a-repositorys-license
  return this.get(`/repos/${owner}/${repo}/license`, options);
};

// https://developer.Github.com/v3/markdown/

Github.prototype.renderAnArbitraryMarkdownDocument = function (_, options) {
  // https://developer.Github.com/v3/markdown/#render-an-arbitrary-markdown-document
  return this.post('/markdown', options);
};

Github.prototype.renderAMarkdownDocumentInRawMode = function (_, options) {
  // https://developer.Github.com/v3/markdown/#render-a-markdown-document-in-raw-mode
  return this.post('/markdown/raw', options);
};

// https://developer.Github.com/v3/meta/

Github.prototype.meta = function (_, options) {
  // https://developer.Github.com/v3/meta/#meta
  return this.get('/meta', options);
};

// https://developer.Github.com/v3/rate_limit/

Github.prototype.getYourCurrentRateLimitStatus = function (_, options) {
  // https://developer.Github.com/v3/rate_limit/#get-your-current-rate-limit-status
  return this.get('/rate_limit', options);
};

// https://developer.Github.com/v3/orgs/

Github.prototype.listYourOrganizations = function (_, options) {
  // https://developer.Github.com/v3/orgs/#list-your-organizations
  return this.get('/user/orgs', options);
};

Github.prototype.listAllOrganizations = function (_, options) {
  // https://developer.Github.com/v3/orgs/#list-all-organizations
  return this.get('/organizations', options);
};

Github.prototype.listUserOrganizations = function ({ username }, options) {
  // https://developer.Github.com/v3/orgs/#list-user-organizations
  return this.get(`/users/${username}/orgs`, options);
};

Github.prototype.getAnOrganization = function ({ org }, options) {
  // https://developer.Github.com/v3/orgs/#get-an-organization
  return this.get(`/orgs/${org}`, options);
};

Github.prototype.editAnOrganization = function ({ org }, options) {
  // https://developer.Github.com/v3/orgs/#edit-an-organization
  return this.patch(`/orgs/${org}`, options);
};

// https://developer.Github.com/v3/orgs/members/

Github.prototype.membersList = function ({ org }, options) {
  // https://developer.Github.com/v3/orgs/members/#members-list
  return this.get(`/orgs/${org}/members`, options);
};

Github.prototype.checkMembership = function ({ org, username }, options) {
  // https://developer.Github.com/v3/orgs/members/#check-membership
  return this.get(`/orgs/${org}/members/${username}`, options);
};

Github.prototype.addAMember = function ({ org, username }, options) {
  // https://developer.Github.com/v3/orgs/members/#add-a-member
  return this.delete(`/orgs/${org}/members/${username}`, options);
};

Github.prototype.publicMembersList = function ({ org }, options) {
  // https://developer.Github.com/v3/orgs/members/#public-members-list
  return this.get(`/orgs/${org}/public_members`, options);
};

Github.prototype.checkPublicMembership = function ({ org, username }, options) {
  // https://developer.Github.com/v3/orgs/members/#check-public-membership
  return this.get(`/orgs/${org}/public_members/${username}`, options);
};

Github.prototype.publicizeAUser = function ({ org, username }, options) {
  // https://developer.Github.com/v3/orgs/members/#publicize-a-users-membership
  return this.put(`/orgs/${org}/public_members/${username}`, options);
};

Github.prototype.concealAUser = function ({ org, username }, options) {
  // https://developer.Github.com/v3/orgs/members/#conceal-a-users-membership
  return this.delete(`/orgs/${org}/public_members/${username}`, options);
};

Github.prototype.getOrganizationMembership = function ({ org, username }, options) {
  // https://developer.Github.com/v3/orgs/members/#get-organization-membership
  return this.get(`/orgs/${org}/memberships/${username}`, options);
};

Github.prototype.addOrUpdateOrganizationMembership = function ({ org, username }, options) {
  // https://developer.Github.com/v3/orgs/members/#add-or-update-organization-membership
  return this.put(`/orgs/${org}/memberships/${username}`, options);
};

Github.prototype.removeOrganizationMembership = function ({ org, username }, options) {
  // https://developer.Github.com/v3/orgs/members/#remove-organization-membership
  return this.delete(`/orgs/${org}/memberships/${username}`, options);
};

Github.prototype.listYourOrganizationMemberships = function (_, options) {
  // https://developer.Github.com/v3/orgs/members/#list-your-organization-memberships
  return this.get('/user/memberships/orgs', options);
};

Github.prototype.getYourOrganizationMembership = function ({ org }, options) {
  // https://developer.Github.com/v3/orgs/members/#get-your-organization-membership
  return this.get(`/user/memberships/orgs/${org}`, options);
};

Github.prototype.editYourOrganizationMembership = function ({ org }, options) {
  // https://developer.Github.com/v3/orgs/members/#edit-your-organization-membership
  return this.patch(`/user/memberships/orgs/${org}`, options);
};

// https://developer.Github.com/v3/orgs/teams/

Github.prototype.listTeamsForAnOrg = function ({ org }, options) {
  // https://developer.Github.com/v3/orgs/teams/#list-teams
  return this.get(`/orgs/${org}/teams`, options);
};

Github.prototype.getTeam = function ({ id }, options) {
  // https://developer.Github.com/v3/orgs/teams/#get-team
  return this.get(`/teams/${id}`, options);
};

Github.prototype.createTeam = function ({ org }, options) {
  // https://developer.Github.com/v3/orgs/teams/#create-team
  return this.post(`/orgs/${org}/teams`, options);
};

Github.prototype.editTeam = function ({ id }, options) {
  // https://developer.Github.com/v3/orgs/teams/#edit-team
  return this.patch(`/teams/${id}`, options);
};

Github.prototype.deleteTeam = function ({ id }, options) {
  // https://developer.Github.com/v3/orgs/teams/#delete-team
  return this.delete(`/teams/${id}`, options);
};

Github.prototype.listTeamMembers = function ({ id }, options) {
  // https://developer.Github.com/v3/orgs/teams/#list-team-members
  return this.get(`/teams/${id}/members`, options);
};

Github.prototype.getTeamMember = function ({ id, username }, options) {
  // https://developer.Github.com/v3/orgs/teams/#get-team-member
  return this.get(`/teams/${id}/members/${username}`, options);
};

Github.prototype.addTeamMember = function ({ id, username }, options) {
  // https://developer.Github.com/v3/orgs/teams/#add-team-member
  return this.put(`/teams/${id}/members/${username}`, options);
};

Github.prototype.removeTeamMember = function ({ id, username }, options) {
  // https://developer.Github.com/v3/orgs/teams/#remove-team-member
  return this.delete(`/teams/${id}/members/${username}`, options);
};

Github.prototype.getTeamMembership = function ({ id, username }, options) {
  // https://developer.Github.com/v3/orgs/teams/#get-team-membership
  return this.get(`/teams/${id}/memberships/${username}`, options);
};

Github.prototype.addTeamMembership = function ({ id, username }, options) {
  // https://developer.Github.com/v3/orgs/teams/#add-team-membership
  return this.put(`/teams/${id}/memberships/${username}`, options);
};

Github.prototype.removeTeamMembership = function ({ id, username }, options) {
  // https://developer.Github.com/v3/orgs/teams/#remove-team-membership
  return this.delete(`/teams/${id}/memberships/${username}`, options);
};

Github.prototype.listTeamRepos = function ({ id }, options) {
  // https://developer.Github.com/v3/orgs/teams/#list-team-repos
  return this.get(`/teams/${id}/repos`, options);
};

Github.prototype.checkIfATeamManagesARepository = function ({ id, owner, repo }, options) {
  // https://developer.Github.com/v3/orgs/teams/#check-if-a-team-manages-a-repository
  return this.get(`/teams/${id}/repos/${owner}/${repo}`, options);
};

Github.prototype.addOrUpdateTeamRepository = function ({ id, org, repo }, options) {
  // https://developer.Github.com/v3/orgs/teams/#add-or-update-team-repository
  return this.put(`/teams/${id}/repos/${org}/${repo}`, options);
};

Github.prototype.removeTeamRepository = function ({ id, owner, repo }, options) {
  // https://developer.Github.com/v3/orgs/teams/#remove-team-repository
  return this.delete(`/teams/${id}/repos/${owner}/${repo}`, options);
};

Github.prototype.listUserTeams = function (_, options) {
  // https://developer.Github.com/v3/orgs/teams/#list-user-teams
  return this.get('/user/teams', options);
};

// https://developer.Github.com/v3/orgs/hooks/

Github.prototype.scopes = function ({ org }, options) {
  // https://developer.Github.com/v3/orgs/hooks/#scopes--restrictions
  return this.get(`/orgs/${org}/hooks`, options);
};

Github.prototype.getSingleHookFromAnOrg = function ({ org, id }, options) {
  // https://developer.Github.com/v3/orgs/hooks/#get-single-hook
  return this.get(`/orgs/${org}/hooks/${id}`, options);
};

Github.prototype.createAHookForAnOrg = function ({ org }, options) {
  // https://developer.Github.com/v3/orgs/hooks/#create-a-hook
  return this.post(`/orgs/${org}/hooks`, options);
};

Github.prototype.editAHookForAnOrg = function ({ org, id }, options) {
  // https://developer.Github.com/v3/orgs/hooks/#edit-a-hook
  return this.patch(`/orgs/${org}/hooks/${id}`, options);
};

Github.prototype.pingAHookForAnOrg = function ({ org, id }, options) {
  // https://developer.Github.com/v3/orgs/hooks/#ping-a-hook
  return this.post(`/orgs/${org}/hooks/${id}/pings`, options);
};

Github.prototype.deleteAHookFromAnOrg = function ({ org, id }, options) {
  // https://developer.Github.com/v3/orgs/hooks/#delete-a-hook
  return this.delete(`/orgs/${org}/hooks/${id}`, options);
};

// https://developer.Github.com/v3/pulls/

Github.prototype.listPullRequests = function ({ owner, repo }, options) {
  // https://developer.github.com/v3/pulls/#list-pull-requests
  return this.get(`/repos/${owner}/${repo}/pulls`, options);
};

Github.prototype.getASinglePullRequest = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/pulls/#get-a-single-pull-request
  return this.get(`/repos/${owner}/${repo}/pulls/${number}`, options);
};

Github.prototype.createAPullRequest = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/pulls/#create-a-pull-request
  return this.post(`/repos/${owner}/${repo}/pulls`, options);
};

Github.prototype.updateAPullRequest = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/pulls/#update-a-pull-request
  return this.patch(`/repos/${owner}/${repo}/pulls/${number}`, options);
};

Github.prototype.listCommitsOnAPullRequest = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/pulls/#list-commits-on-a-pull-request
  return this.get(`/repos/${owner}/${repo}/pulls/${number}/commits`, options);
};

Github.prototype.listPullRequestsFiles = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/pulls/#list-pull-requests-files
  return this.get(`/repos/${owner}/${repo}/pulls/${number}/files`, options);
};

Github.prototype.getIfAPullRequestHasBeenMerged = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/pulls/#get-if-a-pull-request-has-been-merged
  return this.get(`/repos/${owner}/${repo}/pulls/${number}/merge`, options);
};

Github.prototype.mergeAPullRequest = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/pulls/#merge-a-pull-request-merge-button
  return this.put(`/repos/${owner}/${repo}/pulls/${number}/merge`, options);
};

// https://developer.Github.com/v3/pulls/comments/

Github.prototype.listCommentsOnAPullRequest = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/pulls/comments/#list-comments-on-a-pull-request
  return this.get(`/repos/${owner}/${repo}/pulls/${number}/comments`, options);
};

Github.prototype.listReviewCommentsInARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/pulls/comments/#list-comments-in-a-repository
  return this.get(`/repos/${owner}/${repo}/pulls/comments`, options);
};

Github.prototype.getASingleComment = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/pulls/comments/#get-a-single-comment
  return this.get(`/repos/${owner}/${repo}/pulls/comments/${id}`, options);
};

Github.prototype.createAComment = function ({ owner, repo, number }, options) {
  // https://developer.Github.com/v3/pulls/comments/#create-a-comment
  return this.post(`/repos/${owner}/${repo}/pulls/${number}/comments`, options);
};

Github.prototype.editAComment = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/pulls/comments/#edit-a-comment
  return this.patch(`/repos/${owner}/${repo}/pulls/comments/${id}`, options);
};

Github.prototype.deleteAComment = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/pulls/comments/#delete-a-comment
  return this.delete(`/repos/${owner}/${repo}/pulls/comments/${id}`, options);
};

// https://developer.Github.com/v3/repos/

Github.prototype.listYourRepositories = function (_, options) {
  // https://developer.Github.com/v3/repos/#list-your-repositories
  return this.get('/user/repos', options);
};

Github.prototype.listUserRepositories = function ({ username }, options) {
  // https://developer.Github.com/v3/repos/#list-user-repositories
  return this.get(`/users/${username}/repos`, options);
};

Github.prototype.listOrganizationRepositories = function ({ org }, options) {
  // https://developer.Github.com/v3/repos/#list-organization-repositories
  return this.get(`/orgs/${org}/repos`, options);
};

Github.prototype.listAllPublicRepositories = function (_, options) {
  // https://developer.Github.com/v3/repos/#list-all-public-repositories
  return this.get('/repositories', options);
};

Github.prototype.create = function (_, options) {
  // https://developer.Github.com/v3/repos/#create
  return this.post('/user/repos', options);
};

Github.prototype.get = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/#get
  return this.get(`/repos/${owner}/${repo}`, options);
};

Github.prototype.edit = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/#edit
  return this.patch(`/repos/${owner}/${repo}`, options);
};

Github.prototype.listContributors = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/#list-contributors
  return this.get(`/repos/${owner}/${repo}/contributors`, options);
};

Github.prototype.listLanguages = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/#list-languages
  return this.get(`/repos/${owner}/${repo}/languages`, options);
};

Github.prototype.listTeamsForARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/#list-teams
  return this.get(`/repos/${owner}/${repo}/teams`, options);
};

Github.prototype.listTags = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/#list-tags
  return this.get(`/repos/${owner}/${repo}/tags`, options);
};

Github.prototype.listBranches = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/#list-branches
  return this.get(`/repos/${owner}/${repo}/branches`, options);
};

Github.prototype.getBranch = function ({ owner, repo, branch }, options) {
  // https://developer.Github.com/v3/repos/#get-branch
  return this.get(`/repos/${owner}/${repo}/branches/${branch}`, options);
};

Github.prototype.deleteARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/#delete-a-repository
  return this.delete(`/repos/${owner}/${repo}`, options);
};

// https://developer.Github.com/v3/repos/collaborators/

Github.prototype.listCollaborators = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/collaborators/#list-collaborators
  return this.get(`/repos/${owner}/${repo}/collaborators`, options);
};

Github.prototype.checkIfAUserIsACollaborator = function ({ owner, repo, username }, options) {
  // https://developer.Github.com/v3/repos/collaborators/#check-if-a-user-is-a-collaborator
  return this.get(`/repos/${owner}/${repo}/collaborators/${username}`, options);
};

Github.prototype.addUserAsACollaborator = function ({ owner, repo, username }, options) {
  // https://developer.Github.com/v3/repos/collaborators/#add-user-as-a-collaborator
  return this.put(`/repos/${owner}/${repo}/collaborators/${username}`, options);
};

Github.prototype.removeUserAsACollaborator = function ({ owner, repo, username }, options) {
  // https://developer.Github.com/v3/repos/collaborators/#remove-user-as-a-collaborator
  return this.delete(`/repos/${owner}/${repo}/collaborators/${username}`, options);
};

// https://developer.Github.com/v3/repos/comments/

Github.prototype.listCommitCommentsForARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/comments/#list-commit-comments-for-a-repository
  return this.get(`/repos/${owner}/${repo}/comments`, options);
};

Github.prototype.listCommentsForASingleCommit = function ({ owner, repo, ref }, options) {
  // https://developer.Github.com/v3/repos/comments/#list-comments-for-a-single-commit
  return this.get(`/repos/${owner}/${repo}/commits/${ref}/comments`, options);
};

Github.prototype.createACommitComment = function ({ owner, repo, sha }, options) {
  // https://developer.Github.com/v3/repos/comments/#create-a-commit-comment
  return this.post(`/repos/${owner}/${repo}/commits/${sha}/comments`, options);
};

Github.prototype.getASingleCommitComment = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/comments/#get-a-single-commit-comment
  return this.get(`/repos/${owner}/${repo}/comments/${id}`, options);
};

Github.prototype.updateACommitComment = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/comments/#update-a-commit-comment
  return this.patch(`/repos/${owner}/${repo}/comments/${id}`, options);
};

Github.prototype.deleteACommitComment = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/comments/#delete-a-commit-comment
  return this.delete(`/repos/${owner}/${repo}/comments/${id}`, options);
};

// https://developer.Github.com/v3/repos/commits/

Github.prototype.listCommitsOnARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/commits/#list-commits-on-a-repository
  return this.get(`/repos/${owner}/${repo}/commits`, options);
};

Github.prototype.getASingleCommit = function ({ owner, repo, sha }, options) {
  // https://developer.Github.com/v3/repos/commits/#get-a-single-commit
  return this.get(`/repos/${owner}/${repo}/commits/${sha}`, options);
};

Github.prototype.getTheSha = function ({ owner, repo, ref }, options) {
  // https://developer.Github.com/v3/repos/commits/#get-the-sha-1-of-a-commit-reference
  return this.get(`/repos/${owner}/${repo}/commits/${ref}`, options);
};

Github.prototype.compareTwoCommits = function ({ owner, repo, base, head }, options) {
  // https://developer.Github.com/v3/repos/commits/#compare-two-commits
  return this.get(`/repos/${owner}/${repo}/compare/${base}...${head}`, options);
};

// https://developer.Github.com/v3/repos/contents/

Github.prototype.getTheReadme = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/contents/#get-the-readme
  return this.get(`/repos/${owner}/${repo}/readme`, options);
};

Github.prototype.getContents = function ({ owner, repo, path }, options) {
  // https://developer.Github.com/v3/repos/contents/#get-contents
  return this.get(`/repos/${owner}/${repo}/contents/${path}`, options);
};

Github.prototype.createAFile = function ({ owner, repo, path }, options) {
  // https://developer.Github.com/v3/repos/contents/#create-a-file
  return this.put(`/repos/${owner}/${repo}/contents/${path}`, options);
};

Github.prototype.updateAFile = function ({ owner, repo, path }, options) {
  // https://developer.Github.com/v3/repos/contents/#update-a-file
  return this.put(`/repos/${owner}/${repo}/contents/${path}`, options);
};

Github.prototype.deleteAFile = function ({ owner, repo, path }, options) {
  // https://developer.Github.com/v3/repos/contents/#delete-a-file
  return this.delete(`/repos/${owner}/${repo}/contents/${path}`, options);
};

Github.prototype.getArchiveLink = function ({ owner, repo, archiveFormat, ref }, options) {
  // https://developer.Github.com/v3/repos/contents/#get-archive-link
  return this.get(`/repos/${owner}/${repo}/${archiveFormat}/${ref}`, options);
};

// https://developer.Github.com/v3/repos/keys/

Github.prototype.listDeployKeys = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/keys/#list-deploy-keys
  return this.get(`/repos/${owner}/${repo}/keys`, options);
};

Github.prototype.getADeployKey = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/keys/#get-a-deploy-key
  return this.get(`/repos/${owner}/${repo}/keys/${id}`, options);
};

Github.prototype.addANewDeployKey = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/keys/#add-a-new-deploy-key
  return this.post(`/repos/${owner}/${repo}/keys`, options);
};

Github.prototype.editADeployKey = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/keys/#edit-a-deploy-key
  return this.delete(`/repos/${owner}/${repo}/keys/${id}`, options);
};

// https://developer.Github.com/v3/repos/deployments/

Github.prototype.listDeployments = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/deployments/#list-deployments
  return this.get(`/repos/${owner}/${repo}/deployments`, options);
};

Github.prototype.createADeployment = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/deployments/#create-a-deployment
  return this.post(`/repos/${owner}/${repo}/deployments`, options);
};

Github.prototype.updateADeployment = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/deployments/#update-a-deployment
  return this.get(`/repos/${owner}/${repo}/deployments/${id}/statuses`, options);
};

Github.prototype.createADeploymentStatus = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/deployments/#create-a-deployment-status
  return this.post(`/repos/${owner}/${repo}/deployments/${id}/statuses`, options);
};

// https://developer.Github.com/v3/repos/forks/

Github.prototype.listForks = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/forks/#list-forks
  return this.get(`/repos/${owner}/${repo}/forks`, options);
};

Github.prototype.createAFork = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/forks/#create-a-fork
  return this.post(`/repos/${owner}/${repo}/forks`, options);
};

// https://developer.Github.com/v3/repos/merging/

Github.prototype.performAMerge = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/merging/#perform-a-merge
  return this.post(`/repos/${owner}/${repo}/merges`, options);
};

// https://developer.Github.com/v3/repos/pages/

Github.prototype.getInformationAboutAPagesSite = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/pages/#get-information-about-a-pages-site
  return this.get(`/repos/${owner}/${repo}/pages`, options);
};

Github.prototype.listPagesBuilds = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/pages/#list-pages-builds
  return this.get(`/repos/${owner}/${repo}/pages/builds`, options);
};

Github.prototype.listLatestPagesBuild = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/pages/#list-latest-pages-build
  return this.get(`/repos/${owner}/${repo}/pages/builds/latest`, options);
};

// https://developer.Github.com/v3/repos/releases/

Github.prototype.listReleasesForARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/releases/#list-releases-for-a-repository
  return this.get(`/repos/${owner}/${repo}/releases`, options);
};

Github.prototype.getASingleRelease = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/releases/#get-a-single-release
  return this.get(`/repos/${owner}/${repo}/releases/${id}`, options);
};

Github.prototype.getTheLatestRelease = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/releases/#get-the-latest-release
  return this.get(`/repos/${owner}/${repo}/releases/latest`, options);
};

Github.prototype.getAReleaseByTagName = function ({ owner, repo, tag }, options) {
  // https://developer.Github.com/v3/repos/releases/#get-a-release-by-tag-name
  return this.get(`/repos/${owner}/${repo}/releases/tags/${tag}`, options);
};

Github.prototype.createARelease = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/releases/#create-a-release
  return this.post(`/repos/${owner}/${repo}/releases`, options);
};

Github.prototype.editARelease = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/releases/#edit-a-release
  return this.patch(`/repos/${owner}/${repo}/releases/${id}`, options);
};

Github.prototype.deleteARelease = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/releases/#delete-a-release
  return this.delete(`/repos/${owner}/${repo}/releases/${id}`, options);
};

Github.prototype.listAssetsForARelease = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/releases/#list-assets-for-a-release
  return this.get(`/repos/${owner}/${repo}/releases/${id}/assets`, options);
};

Github.prototype.uploadAReleaseAsset = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/releases/#upload-a-release-asset
  return this.post(`https://&lt;upload_url&gt;/repos/${owner}/${repo}/releases/${id}/assets?name=foo.zip`, options);
};

Github.prototype.getASingleReleaseAsset = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/releases/#get-a-single-release-asset
  return this.get(`/repos/${owner}/${repo}/releases/assets/${id}`, options);
};

Github.prototype.editAReleaseAsset = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/releases/#edit-a-release-asset
  return this.patch(`/repos/${owner}/${repo}/releases/assets/${id}`, options);
};

Github.prototype.deleteAReleaseAsset = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/releases/#delete-a-release-asset
  return this.delete(`/repos/${owner}/${repo}/releases/assets/${id}`, options);
};

// https://developer.Github.com/v3/repos/statistics/

Github.prototype.getContributorsListWithAdditions = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/statistics/#get-contributors-list-with-additions-deletions-and-commit-counts
  return this.get(`/repos/${owner}/${repo}/stats/contributors`, options);
};

Github.prototype.getTheLastYearOfCommitActivityData = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/statistics/#get-the-last-year-of-commit-activity-data
  return this.get(`/repos/${owner}/${repo}/stats/commit_activity`, options);
};

Github.prototype.getTheNumberOfAdditionsAndDeletionsPerWeek = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/statistics/#get-the-number-of-additions-and-deletions-per-week
  return this.get(`/repos/${owner}/${repo}/stats/code_frequency`, options);
};

Github.prototype.getTheWeeklyCommitCountForTheRepositoryOwnerAndEveryoneElse = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/statistics/#get-the-weekly-commit-count-for-the-repository-owner-and-everyone-else
  return this.get(`/repos/${owner}/${repo}/stats/participation`, options);
};

Github.prototype.getTheNumberOfCommitsPerHourInEachDay = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/statistics/#get-the-number-of-commits-per-hour-in-each-day
  return this.get(`/repos/${owner}/${repo}/stats/punch_card`, options);
};

// https://developer.Github.com/v3/repos/statuses/

Github.prototype.createAStatus = function ({ owner, repo, sha }, options) {
  // https://developer.Github.com/v3/repos/statuses/#create-a-status
  return this.post(`/repos/${owner}/${repo}/statuses/${sha}`, options);
};

Github.prototype.listStatusesForASpecificRef = function ({ owner, repo, ref }, options) {
  // https://developer.Github.com/v3/repos/statuses/#list-statuses-for-a-specific-ref
  return this.get(`/repos/${owner}/${repo}/commits/${ref}/statuses`, options);
};

Github.prototype.getTheCombinedStatusForASpecificRef = function ({ owner, repo, ref }, options) {
  // https://developer.Github.com/v3/repos/statuses/#get-the-combined-status-for-a-specific-ref
  return this.get(`/repos/${owner}/${repo}/commits/${ref}/status`, options);
};

// https://developer.Github.com/v3/repos/hooks/

Github.prototype.listHooks = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/hooks/#list-hooks
  return this.get(`/repos/${owner}/${repo}/hooks`, options);
};

Github.prototype.getSingleHookFromARepository = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/hooks/#get-single-hook
  return this.get(`/repos/${owner}/${repo}/hooks/${id}`, options);
};

Github.prototype.createAHookForARepository = function ({ owner, repo }, options) {
  // https://developer.Github.com/v3/repos/hooks/#create-a-hook
  return this.post(`/repos/${owner}/${repo}/hooks`, options);
};

Github.prototype.editAHookForARepository = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/hooks/#edit-a-hook
  return this.patch(`/repos/${owner}/${repo}/hooks/${id}`, options);
};

Github.prototype.testA = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/hooks/#test-a-push-hook
  return this.post(`/repos/${owner}/${repo}/hooks/${id}/tests`, options);
};

Github.prototype.pingAHookForARepository = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/hooks/#ping-a-hook
  return this.post(`/repos/${owner}/${repo}/hooks/${id}/pings`, options);
};

Github.prototype.deleteAHookFromARepository = function ({ owner, repo, id }, options) {
  // https://developer.Github.com/v3/repos/hooks/#delete-a-hook
  return this.delete(`/repos/${owner}/${repo}/hooks/${id}`, options);
};

// https://developer.Github.com/v3/search/

Github.prototype.searchRepositories = function (_, options) {
  // https://developer.Github.com/v3/search/#search-repositories
  return this.get('/search/repositories', options);
};

Github.prototype.searchCode = function (_, options) {
  // https://developer.Github.com/v3/search/#search-code
  return this.get('/search/code', options);
};

Github.prototype.searchIssues = function (_, options) {
  // https://developer.Github.com/v3/search/#search-issues
  return this.get('/search/issues', options);
};

Github.prototype.searchUsers = function (_, options) {
  // https://developer.Github.com/v3/search/#search-users
  return this.get('/search/users', options);
};

// https://developer.Github.com/v3/users/

Github.prototype.getASingleUser = function ({ username }, options) {
  // https://developer.Github.com/v3/users/#get-a-single-user
  return this.get(`/users/${username}`, options);
};

Github.prototype.getTheAuthenticatedUser = function (_, options) {
  // https://developer.Github.com/v3/users/#get-the-authenticated-user
  return this.get('/user', options);
};

Github.prototype.updateTheAuthenticatedUser = function (_, options) {
  // https://developer.Github.com/v3/users/#update-the-authenticated-user
  return this.patch('/user', options);
};

Github.prototype.getAllUsers = function (_, options) {
  // https://developer.Github.com/v3/users/#get-all-users
  return this.get('/users', options);
};

// https://developer.Github.com/v3/users/emails/

Github.prototype.listEmailAddressesForAUser = function (_, options) {
  // https://developer.Github.com/v3/users/emails/#list-email-addresses-for-a-user
  return this.get('/user/emails', options);
};

Github.prototype.addEmailAddress = function (_, options) {
  // https://developer.Github.com/v3/users/emails/#add-email-addresses
  return this.post('/user/emails', options);
};

Github.prototype.deleteEmailAddress = function (_, options) {
  // https://developer.Github.com/v3/users/emails/#delete-email-addresses
  return this.delete('/user/emails', options);
};

// https://developer.Github.com/v3/users/followers/

Github.prototype.listFollowersOfAUser = function ({ username }, options) {
  // https://developer.Github.com/v3/users/followers/#list-followers-of-a-user
  return this.get(`/users/${username}/followers`, options);
};

Github.prototype.listUsersFollowedByAnotherUser = function ({ username }, options) {
  // https://developer.Github.com/v3/users/followers/#list-users-followed-by-another-user
  return this.get(`/users/${username}/following`, options);
};

Github.prototype.checkIfYouAreFollowingAUser = function ({ username }, options) {
  // https://developer.Github.com/v3/users/followers/#check-if-you-are-following-a-user
  return this.get(`/user/following/${username}`, options);
};

Github.prototype.checkIfOneUserFollowsAnother = function ({ username, targetUser }, options) {
  // https://developer.Github.com/v3/users/followers/#check-if-one-user-follows-another
  return this.get(`/users/${username}/following/${targetUser}`, options);
};

Github.prototype.followAUser = function ({ username }, options) {
  // https://developer.Github.com/v3/users/followers/#follow-a-user
  return this.put(`/user/following/${username}`, options);
};

Github.prototype.unfollowAUser = function ({ username }, options) {
  // https://developer.Github.com/v3/users/followers/#unfollow-a-user
  return this.delete(`/user/following/${username}`, options);
};

// https://developer.Github.com/v3/users/keys/

Github.prototype.listPublicKeysForAUser = function ({ username }, options) {
  // https://developer.Github.com/v3/users/keys/#list-public-keys-for-a-user
  return this.get(`/users/${username}/keys`, options);
};

Github.prototype.listYourPublicKeys = function (_, options) {
  // https://developer.Github.com/v3/users/keys/#list-your-public-keys
  return this.get('/user/keys', options);
};

Github.prototype.getASinglePublicKey = function ({ id }, options) {
  // https://developer.Github.com/v3/users/keys/#get-a-single-public-key
  return this.get(`/user/keys/${id}`, options);
};

Github.prototype.createAPublicKey = function (_, options) {
  // https://developer.Github.com/v3/users/keys/#create-a-public-key
  return this.post('/user/keys', options);
};

Github.prototype.updateAPublicKey = function ({ id }, options) {
  // https://developer.Github.com/v3/users/keys/#update-a-public-key
  return this.delete(`/user/keys/${id}`, options);
};

// https://developer.Github.com/v3/users/administration/

Github.prototype.promoteAnOrdinaryUserToASiteAdministrator = function ({ username }, options) {
  // https://developer.Github.com/v3/users/administration/#promote-an-ordinary-user-to-a-site-administrator
  return this.put(`/users/${username}/site_admin`, options);
};

Github.prototype.demoteASiteAdministratorToAnOrdinaryUser = function ({ username }, options) {
  // https://developer.Github.com/v3/users/administration/#demote-a-site-administrator-to-an-ordinary-user
  return this.delete(`/users/${username}/site_admin`, options);
};

Github.prototype.suspendAUser = function ({ username }, options) {
  // https://developer.Github.com/v3/users/administration/#suspend-a-user
  return this.put(`/users/${username}/suspended`, options);
};

Github.prototype.unsuspendAUser = function ({ username }, options) {
  // https://developer.Github.com/v3/users/administration/#unsuspend-a-user
  return this.delete(`/users/${username}/suspended`, options);
};

// https://developer.Github.com/v3/enterprise/admin_stats/

Github.prototype.getStatistics = function ({ type }, options) {
  // https://developer.Github.com/v3/enterprise/admin_stats/#get-statistics
  return this.get(`/enterprise/stats/${type}`, options);
};

// https://developer.Github.com/v3/enterprise/ldap/

Github.prototype.updateLdapMappingForAUser = function ({ username }, options) {
  // https://developer.Github.com/v3/enterprise/ldap/#update-ldap-mapping-for-a-user
  return this.patch(`/admin/ldap/users/${username}/mapping`, options);
};

Github.prototype.syncLdapMappingForAUser = function ({ username }, options) {
  // https://developer.Github.com/v3/enterprise/ldap/#sync-ldap-mapping-for-a-user
  return this.post(`/admin/ldap/users/${username}/sync`, options);
};

Github.prototype.updateLdapMappingForATeam = function ({ teamId }, options) {
  // https://developer.Github.com/v3/enterprise/ldap/#update-ldap-mapping-for-a-team
  return this.patch(`/admin/ldap/teams/${teamId}/mapping`, options);
};

Github.prototype.syncLdapMappingForATeam = function ({ teamId }, options) {
  // https://developer.Github.com/v3/enterprise/ldap/#sync-ldap-mapping-for-a-team
  return this.post(`/admin/ldap/teams/${teamId}/sync`, options);
};

// https://developer.Github.com/v3/enterprise/license/

Github.prototype.getLicenseInformation = function (_, options) {
  // https://developer.Github.com/v3/enterprise/license/#get-license-information
  return this.get('/enterprise/settings/license', options);
};

// https://developer.Github.com/v3/enterprise/management_console/

Github.prototype.uploadALicenseForTheFirstTime = function (_, options) {
  // https://developer.Github.com/v3/enterprise/management_console/#upload-a-license-for-the-first-time
  return this.post('/setup/api/start', options);
};

Github.prototype.upgradeALicense = function (_, options) {
  // https://developer.Github.com/v3/enterprise/management_console/#upgrade-a-license
  return this.post('/setup/api/upgrade', options);
};

Github.prototype.checkConfigurationStatus = function (_, options) {
  // https://developer.Github.com/v3/enterprise/management_console/#check-configuration-status
  return this.get('/setup/api/configcheck', options);
};

Github.prototype.startAConfigurationProcess = function (_, options) {
  // https://developer.Github.com/v3/enterprise/management_console/#start-a-configuration-process
  return this.post('/setup/api/configure', options);
};

Github.prototype.retrieveSettings = function (_, options) {
  // https://developer.Github.com/v3/enterprise/management_console/#retrieve-settings
  return this.get('/setup/api/settings', options);
};

Github.prototype.modifySettings = function (_, options) {
  // https://developer.Github.com/v3/enterprise/management_console/#modify-settings
  return this.put('/setup/api/settings', options);
};

Github.prototype.checkMaintenanceStatus = function (_, options) {
  // https://developer.Github.com/v3/enterprise/management_console/#check-maintenance-status
  return this.get('/setup/api/maintenance', options);
};

Github.prototype.enableOrDisableMaintenanceMode = function (_, options) {
  // https://developer.Github.com/v3/enterprise/management_console/#enable-or-disable-maintenance-mode
  return this.post('/setup/api/maintenance', options);
};

Github.prototype.retrieveAuthorizedSshKeys = function (_, options) {
  // https://developer.Github.com/v3/enterprise/management_console/#retrieve-authorized-ssh-keys
  return this.get('/setup/api/settings/authorized-keys', options);
};

Github.prototype.addANewAuthorizedSshKey = function (_, options) {
  // https://developer.Github.com/v3/enterprise/management_console/#add-a-new-authorized-ssh-key
  return this.post('/setup/api/settings/authorized-keys', options);
};

Github.prototype.removeAnAuthorizedSshKey = function (_, options) {
  // https://developer.Github.com/v3/enterprise/management_console/#remove-an-authorized-ssh-key
  return this.delete('/setup/api/settings/authorized-keys', options);
};

// https://developer.Github.com/v3/enterprise/search_indexing/

Github.prototype.queueAnIndexingJob = function (_, options) {
  // https://developer.Github.com/v3/enterprise/search_indexing/#queue-an-indexing-job
  return this.post('/staff/indexing_jobs', options);
};

// https://developer.Github.com/v3/enterprise/orgs/

Github.prototype.createAnOrganization = function (_, options) {
  // https://developer.Github.com/v3/enterprise/orgs/#create-an-organization
  return this.post('/admin/organizations', options);
};

module.exports = Github;
