'use strict';

const assert = require('assert');
const HttpApi = require('../../');
const nock = require('nock');

const httpApi = new HttpApi({retries: 0, timeout: 100});
let scope;

suite('http-api', () => {
  teardown(() => nock.cleanAll());

  suite('.get() → success', () => {
    setup(() => {
      scope = nock('https://api.github.com/')
        .get('/users/sullenor')
        .reply(200, require('../fixture/usersSullenor'));
    });

    test('should receive a response', done => {
      httpApi.get('https://api.github.com/users/sullenor')
        .then(response => {
          if (!scope.isDone()) {
            console.error('pending mocks: %j', scope.pendingMocks());
            throw new Error('not all all expectations have been met');
          }

          assert.equal(response.login, 'sullenor');

          done();
        })
        .catch(er => done(er));
    });
  });

  suite('.get() → failure', () => {
    setup(() => {
      scope = nock('https://api.github.com/')
        .get('/users/sullenor')
        .reply(404, 'Not found');
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

  suite('.post() → success', () => {
    setup(() => {
      scope = nock('https://api.github.com/')
        .post('/users/sullenor', {request: 'hello'})
        .reply(200, require('../fixture/usersSullenor'));
    });

    teardown(() => {
      nock.cleanAll();
    });

    test('should receive a response', done => {
      httpApi.post('https://api.github.com/users/sullenor', {request: 'hello'})
        .then(response => {
          if (!scope.isDone()) {
            console.error('pending mocks: %j', scope.pendingMocks());
            throw new Error('not all all expectations have been met');
          }

          assert.equal(response.login, 'sullenor');

          done();
        })
        .catch(er => done(er));
    });
  });

  suite('.post() → failure', () => {
    setup(() => {
      scope = nock('https://api.github.com/')
        .post('/users/sullenor', {request: 'hello'})
        .reply(404, 'Not found');
    });

    teardown(() => {
      nock.cleanAll();
    });

    test('should throw an error', done => {
      httpApi.post('https://api.github.com/users/sullenor', {request: 'hello'}, {json: false})
        .then(response => done(new Error('Successfully received a response instead of error')))
        .catch(er => {
          if (!scope.isDone()) {
            console.error('pending mocks: %j', scope.pendingMocks());
            throw new Error('not all all expectations have been met');
          }

          assert.equal(er.message, '404 Not Found ← POST https://api.github.com/users/sullenor');
          done();
        })
        .catch(er => done(er));
    });
  });
});
