#!/usr/bin/env node

const program = require('commander');
const version = require('../package').version;

program
  .version(version)
  .option('-a, --arg <json>', 'Arbitrary arguments', JSON.parse)
  .option('-b, --body <json>', '', JSON.parse)
  .option('-t, --token <auth_token>', 'Authorization token')
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}

process.env.DEBUG='http-api';

const Github = require('../github');
const github = new Github({
  authorization: program.token
    ? `token ${program.token}`
    : void 0,
});

const method = program.args.pop();

if (!github[method]) {
  throw new Error(`Method is not defined ${method}`);
}

github[method](program.arg, {body: program.body})
  .then(response => console.log(response.body))
  .catch(er => console.error(er.message));
