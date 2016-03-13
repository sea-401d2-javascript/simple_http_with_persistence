'use strict';
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
var fs = require('fs');
var server = require( __dirname + '/../server.js');
var filesArray;
var filesArray2;

describe('Vanilla http server testing', () => {
  before((done) => {
    fs.readdir( __dirname + '/../data', (err, files) => {
      filesArray = files.length;
      done();
    });
  });
  after(()=> server.close());
//****************************************************************************
//you need .send({})to be able to test post so the res.on('data'..)event would
//fire and can test.
//****************************************************************************
  it('should create a new file inside of data directory', (done) => {
    request('localhost:3000')
    .post('/mynotes')
    .send({})
    .end((err, res) => {
      console.log('this is then ' + res);
      fs.readdir( __dirname + '/../data', (err, files) =>{
        filesArray2 = files.length;
        expect(filesArray).to.be.below(filesArray2);
        done();
      });
    });
  });
});
