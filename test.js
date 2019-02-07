'use strict';

var expect = require('chai').expect;
var username = require('./');

describe('env', function() {
  var originalEnv = process.env;

  afterEach(function() {
    process.env = originalEnv;
  });

  it('has correct precedence', function() {
    process.env = {
      SUDO_USER: 'SUDO_USER',
      C9_USER: 'C9_USER',
      LOGNAME: 'LOGNAME',
      USER: 'USER',
      LNAME: 'LNAME',
      USERNAME: 'USERNAME'
    };

    expect(username.env()).to.eql('SUDO_USER');
    delete process.env.SUDO_USER;
    expect(username.env()).to.eql('C9_USER');
    delete process.env.C9_USER;
    expect(username.env()).to.eql('LOGNAME');
    delete process.env.LOGNAME;
    expect(username.env()).to.eql('USER');
    delete process.env.USER;
    expect(username.env()).to.eql('LNAME');
    delete process.env.LNAME;
    expect(username.env()).to.eql('USERNAME');
    delete process.env.USERNAME;
    expect(username.env()).to.eql(undefined);
  });
});

describe('os', function() {
  var os = require('os');

  it('has the same value as the os module does', function() {
    var userInfo = require('os').userInfo;
    var expected;
    if (typeof userInfo === 'function') {
      // node >= 6
      expected = userInfo().username;
    }

    expect(username.os()).to.eql(expected);
  });
});

describe('osUserInfoNotFound', function() {
  var os = require('os');

  it('handles ENOENT exceptions', function() {
    var old = os.userInfo;
    try {
      os.userInfo = function() {
	var error = new Error();
	error.code = 'ENOENT';
	throw error;
      };

      expect(username.os()).to.eql(undefined);
    } finally {
      os.userInfo = old;
    }
  });
});

describe('execSync', function() {
  it('seems ok', function() {
    expect(username.execSync()).to.match(/^\w+$/);
  });
});

describe('default', function() {
  it('seems ok', function() {
    expect(username()).to.match(/^\w+$/);
  });
});
