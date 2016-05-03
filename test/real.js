const Github = require('../github');
const test = require('tape');

const github = new Github();

test.skip('real https request', t => {
  github.listIssuesForARepository({owner: 'sullenor', repo: 'http-api'})
    .then(response => {
      t.ok(response.body);
      t.end();
    })
    .catch(er => t.end(er));
});
