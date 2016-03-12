'use strict';
require(__dirname + '/../index');

// var fs = require('fs');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;

describe('/users resource routing tests', () => {
  it('should send back \'hello users\' with GET request', (done) => {
    request('localhost:3000')
      .get('/users')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('hello users');
        done();
      });
  });
  it('should send back \'hello boogers\' with POST request', (done) => {
    request('localhost:3000')
      .post('/users')
      .send({'name': 'boogers'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('"hello boogers"');
        done();
      });
  });
});
