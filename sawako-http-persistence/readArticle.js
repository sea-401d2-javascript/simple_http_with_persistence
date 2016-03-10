'use strict';
var fs = require('fs');
var server = require('./server.js');

var readarticle = fs.readFile('original.txt','utf-8', (err, data) => {
  try {
    server.obj[POST][article] = data;
    console.log('Here is my article' + server.obj);

  } catch (err) {
    console.log('File is not being parsed :' + err);
  }
});

exports.readarticle = readarticle;
