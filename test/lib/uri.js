'use strict';

const HttpApi = require('../../');
const nock = require('nock');

let scope;

suite('.uri', () => {
  teardown(() => nock.cleanAll());

  suite('should use uri option to fullfil the user\'s url', () => {
    setup(() => {
      scope = nock('https://api.github.com/')
        .get('/users/sullenor')
        .reply(200, require('../fixture/usersSullenor'));
    });

    test('should pass', done => {
      new HttpApi({
        retries: 0,
        timeout: 100,
        uri: 'https://api.github.com/users/'
      }).get('/sullenor')
        .then(response => {
          if (!scope.isDone()) {
            console.error('pending mocks: %j', scope.pendingMocks());
            throw new Error('not all all expectations have been met');
          }

          done();
        })
        .catch(er => done(er));
    });
  });

  suite('should respect the user\'s choice', () => {
    setup(() => {
      scope = nock('https://api.github.com/')
        .get('/users/sullenor')
        .reply(200, require('../fixture/usersSullenor'));
    });

    test('should pass', done => {
      new HttpApi({
        retries: 0,
        timeout: 100,
        uri: 'https://something/else/'
      }).get('https://api.github.com/users/sullenor')
        .then(response => {
          if (!scope.isDone()) {
            console.error('pending mocks: %j', scope.pendingMocks());
            throw new Error('not all all expectations have been met');
          }

          done();
        })
        .catch(er => done(er));
    });
  });
});
