const HttpApi = require('../../lib/index');
const nock = require('nock');
const test = require('tape');

const http = new HttpApi({
  basepath: 'https://api.github.com/',
  retries: 0,
  timeout: 100,
});

test('GET', t => {
  nock.cleanAll();
  nock('https://api.github.com/')
    .get('/test')
    .reply(200, require('./fixture/response'));

  http.get('test')
    .then(response => {
      t.deepEqual(response.body, {result: 'ok'});
      t.end();
    })
    .catch(er => t.end(er));
});

test('POST', t => {
  nock.cleanAll();
  nock('http://my.hostname.com/')
    .post('/', {msg: 'hello'})
    .reply(200, require('./fixture/response'));

  http.post('http://my.hostname.com/', {body: {msg: 'hello'}})
    .then(response => {
      t.deepEqual(response.body, {result: 'ok'});
      t.end();
    })
    .catch(er => t.end(er));
});
