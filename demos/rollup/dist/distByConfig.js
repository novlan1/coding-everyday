'use strict';

function logA() {
  console.log('function logA called, wait a minute');
}

var version = "1.0.0";

logA();

function index () {
  console.log('version ' + version);
}

module.exports = index;
