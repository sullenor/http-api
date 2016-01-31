'use strict';

const assert = require('assert');
const HttpApi = require('../../');
const nock = require('nock');

const httpApi = new HttpApi({retries: 0, timeout: 100});
let scope;

suiteTeardown(() => {
  nock.restore();
});

suite('http-api', () => {
  suite('GET → success', () => {
    setup(() => {
      scope = nock('https://api.github.com/')
        .get('/users/sullenor')
        .reply(200, require('../fixture/usersSullenor'));
    });

    teardown(() => {
      nock.cleanAll();
    });

    test('should receive a response', done => {
      httpApi.get('https://api.github.com/users/sullenor')
        .then(response => {
          assert.equal(response.login, 'sullenor');

          if (!scope.isDone()) {
            throw new Error('not all all expectations have been met');
          }

          done();
        })
        .catch(er => {
          console.error('pending mocks: %j', scope.pendingMocks());
          done(er);
        });
    });
  });

  suite('GET → failure', () => {
    setup(() => {
      scope = nock('https://api.github.com/')
        .get('/users/sullenor')
        .reply(404, 'Not found');
    });

    teardown(() => {
      nock.cleanAll();
    });

    test('should throw an error', done => {
      httpApi.get('https://api.github.com/users/sullenor', {json: false})
        .then(response => done(new Error('Successfully received a response instead of error')))
        .catch(er => {
          assert.equal(er.message, '404 Not Found ← GET https://api.github.com/users/sullenor');
          done();
        })
        .catch(er => done(er));
    });
  });
});
