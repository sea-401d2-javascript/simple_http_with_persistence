'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var request = chai.request;
var expect = chai.expect;

require(__dirname + '/../index.js');

describe('http server tests', () => {

  it('should respond to /users/user2 with "Bob"', (done) => {
    request('localhost:3000')
      .get('/users/user2')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).have.status(200);
        expect(res.text).to.include('Bob');
        done();
      });
  });
  // it('should receive JSON data', (done) => {
  //   request('localhost:3000')
  //     .post('/post')
  //     .send({'name': 'test'})
  //     .end((err, res) => {
  //       expect(err).to.eql(null);
  //       expect(res).have.status(200);
  //       expect(res.text).to.eql('Post Received');
  //       done();
  //     });
  // });
  it('should get back a 404', (done) => {
    request('localhost:3000')
      .get('/404')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        done();
      });
  });
});
