'use strict';

var os = require('os');
var execSync = require('child_process').execSync;

module.exports = function() {
  if (typeof os.userInfo === 'function') {
    return module.exports.os();
  }

  let env = module.exports.env();

  if (typeof env === 'string') {
    return env;
  }

  return module.exports.execSync();
};

module.exports.env = function() {
  let env = process.env;

  return env.SUDO_USER ||
    env.C9_USER /* Cloud9 */ ||
    env.LOGNAME ||
    env.USER ||
    env.LNAME ||
    env.USERNAME;
};

module.exports.os = function() {
  return os.userInfo().username;
};

module.exports.execSync = function() {
  let username = require('child_process').execSync('whoami').toString().trim();

  if (process.platform === 'win32') {
    username = username.replace(/^.*\\/, ''); // remove DOMAIN stuff
  }

  return username;
};
