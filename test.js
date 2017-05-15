var expect = require('chai').expect;
var username = require('.');

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
  it('has the same value as the os module does', function() {
    expect(username.os()).to.eql(require('os').userInfo().username);
  });
});

describe('execSync', function() {
  it('works', function() {
    console.log(username.execSync());
  });
});

describe('default', function() {
  it('works', function() {
    console.log(username());
  });
});
