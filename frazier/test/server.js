'use strict';
var fs = require('fs');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var request = chai.request;
var expect = chai.expect;

require(__dirname + '/../lib/server.js');


describe('server.js', () => {
  // describe('it should respond to get requests', () => {
  //   it('should return a file when /notes/number is hit with a GET request and that file exists', (done) => {
  //     
  //     
  //     
  //     
  //   });
  //   it('should return all files when /notes is hit with a GET request and notes exist', (done) => {
  //     
  //     
  //   });
  //   
  // })
  // describe('it should respond to post requests', () => {
  //   it('should save new file when /notes is hit with a post request', (done) => {
  //     
  //     
  //   });
  // })
  
});
