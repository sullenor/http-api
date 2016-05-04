const { camelCase } = require('lodash');
const { get } = require('got');

const pattern = /<h2><[^>]+class="anchor".*?\/a>([a-z\s]+).*?pre><code>(.*?)<\/code><\/pre>/gi;
const varPattern = /:([a-z_]+)/g;

const urls = [
  // 'https://developer.github.com/v3/activity/events/',
  // 'https://developer.github.com/v3/activity/feeds/',
  // 'https://developer.github.com/v3/activity/notifications/',
  // 'https://developer.github.com/v3/activity/starring/',
  // 'https://developer.github.com/v3/activity/watching/',
  // 'https://developer.github.com/v3/gists/',
  // 'https://developer.github.com/v3/gists/comments/',
  // 'https://developer.github.com/v3/git/blobs/',
  // 'https://developer.github.com/v3/git/commits/',
  // 'https://developer.github.com/v3/git/refs/',
  // 'https://developer.github.com/v3/git/tags/',
  // 'https://developer.github.com/v3/git/trees/',
  // 'https://developer.github.com/v3/issues/',
  // 'https://developer.github.com/v3/issues/assignees/',
  // 'https://developer.github.com/v3/issues/comments/',
  // 'https://developer.github.com/v3/issues/events/',
  // 'https://developer.github.com/v3/issues/labels/',
  // 'https://developer.github.com/v3/issues/milestones/',
  // 'https://developer.github.com/v3/migration/migrations/',
  // 'https://developer.github.com/v3/migration/source_imports/',
  // 'https://developer.github.com/v3/emojis/', // ?
  // 'https://developer.github.com/v3/gitignore/',
  // 'https://developer.github.com/v3/licenses/',
  // 'https://developer.github.com/v3/markdown/',
  // 'https://developer.github.com/v3/meta/', // ?
  // 'https://developer.github.com/v3/rate_limit/',
  // 'https://developer.github.com/v3/orgs/',
  // 'https://developer.github.com/v3/orgs/members/',
  // 'https://developer.github.com/v3/orgs/teams/',
  // 'https://developer.github.com/v3/orgs/hooks/',
  // 'https://developer.github.com/v3/pulls/',
  // 'https://developer.github.com/v3/pulls/comments/',
  // 'https://developer.github.com/v3/repos/',
  // 'https://developer.github.com/v3/repos/collaborators/',
  // 'https://developer.github.com/v3/repos/comments/',
  // 'https://developer.github.com/v3/repos/commits/',
  // 'https://developer.github.com/v3/repos/contents/',
  // 'https://developer.github.com/v3/repos/keys/',
  // 'https://developer.github.com/v3/repos/deployments/',
  // 'https://developer.github.com/v3/repos/forks/',
  // 'https://developer.github.com/v3/repos/merging/',
  // 'https://developer.github.com/v3/repos/pages/',
  // 'https://developer.github.com/v3/repos/releases/',
  // 'https://developer.github.com/v3/repos/statistics/',
  // 'https://developer.github.com/v3/repos/statuses/',
  // 'https://developer.github.com/v3/repos/hooks/',
  'https://developer.github.com/v3/search/',
  'https://developer.github.com/v3/users/',
  'https://developer.github.com/v3/users/emails/',
  'https://developer.github.com/v3/users/followers/',
  'https://developer.github.com/v3/users/keys/',
  'https://developer.github.com/v3/users/administration/',
  'https://developer.github.com/v3/enterprise/admin_stats/',
  'https://developer.github.com/v3/enterprise/ldap/',
  'https://developer.github.com/v3/enterprise/license/',
  'https://developer.github.com/v3/enterprise/management_console/',
  'https://developer.github.com/v3/enterprise/search_indexing/',
  'https://developer.github.com/v3/enterprise/orgs/',
];

Promise.all(urls.map(getDocs))
  .then(response => response.join('\n\n'))
  .then(console.log)
  .catch(console.error);

function getDocs(url) {
  return get(url)
  .then(response => response.body)
  .then(html => html.replace(/\n/g, ''))
  .then(getChunks)
  .then(chunks => chunks.map(chunk => format(url, chunk)))
  .then(methods => methods.join('\n\n'))
  .then(methods => `// ${url}\n\n${methods}`);
}

function getChunks(html) {
  var chunks = [];
  var chunk;

  while (chunk = pattern.exec(html)) {
    chunks.push({
      name: camelCase(chunk[1]),
      method: chunk[2].split(' ')[0].toLowerCase(),
      query: chunk[2].split(' ')[1],
      part: /href="(.*?)"/i.exec(chunk[0])[1],
    })
  }

  return chunks;
}

function format(url, chunk) {
  if (!chunk.query) {
    return '';
  }

  return [
    `github.prototype.${chunk.name} = function (${extractVariables(chunk.query)}, options) {`,
    `  // ${url}${chunk.part}`,
    `  this.${chunk.method}(\`${formatVariables(chunk.query)}\`, options);`,
    `};`,
  ].join('\n');
}

function extractVariables(query) {
  var vars = [];
  var m;

  while (m = varPattern.exec(query)) {
    vars.push(m[1]);
  }

  if (vars.length === 0) {
    return '_';
  }

  return `{ ${vars.map(camelCase).join(', ')} }`;
}

function formatVariables(query) {
  return query.replace(varPattern, (m, v) => `$\{${camelCase(v)}\}`);
}
