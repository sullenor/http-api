'use strict';

const assert = require('assert');
const Github = require('../github');
const nock = require('nock');

let scope;

suite('github', () => {
  teardown(() => nock.cleanAll());

  suite('uses https://api.github.com/ uri by default', () => {
    setup(() => {
      scope = nock('https://api.github.com/')
        .get('/users/sullenor')
        .reply(200, require('./fixture/usersSullenor'));
    });

    test('should pass', done => {
      new Github({retries: 0, timeout: 100})
        .get('/users/sullenor')
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

  suite('uses oauth token', () => {
    setup(() => {
      scope = nock('https://api.github.com/', {
        reqHeaders: {
          authorization: 'token test_token',
        },
      })
        .get('/users/sullenor')
        .reply(200, require('./fixture/usersSullenor'));
    });

    test('should pass', done => {
      new Github({retries: 0, timeout: 100, token: 'test_token'})
        .get('/users/sullenor')
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
});
