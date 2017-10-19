'use strict';

require('mocha');
var assert = require('assert');
var isWindows = require('is-windows');
var bashPath = require('./');

describe('bash-path', function() {
  it('should export a string', function() {
    assert.equal(typeof bashPath, 'string');
  });
});
