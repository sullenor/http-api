const Github = require('../github');
const nock = require('nock');
const test = require('tape');

const github = new Github({
  authorization: 'token magic_sequence',
  timeout: 100,
});

test('GET', t => {
  nock.cleanAll();
  const scope = nock('https://api.github.com/')
    .get('/test')
    .reply(200, require('./lib/fixture/response'));

  github
    .get('test')
    .then(response => {
      t.deepEqual(response.body, {result: 'ok'});
      t.end();
    })
    .catch(er => t.end(er));
});
