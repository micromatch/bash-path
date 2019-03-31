'use strict';

require('mocha');
const assert = require('assert');
const bashPath = require('./');

describe('bash-path', () => {
  it('should export a function', () => {
    console.log(bashPath());
    assert.equal(typeof bashPath(), 'string');
  });
});
