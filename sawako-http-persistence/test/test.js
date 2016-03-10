'use strict';
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
var fs = require('fs');
require( __dirname + '/../server.js');
var filesArray;

describe('Vanilla http server testing', () => {
  beforeEach((done) => {
    fs.readdir( __dirname + '/../data', (err, files) => {
      filesArray = files;
      console.log('Here is my files: ' + files);
      console.log('Here is my err: ' + err);
      done();
    });
  });
  it('should create a file inside of data directory', () => {
    request('localhost:3000')
    .post('/mynotes')
    .send({"user": "sawako"})
    
    });
  });
});
