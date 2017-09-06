'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var request = chai.request;
var expect = chai.expect;
var userData = __dirname + '/../data/userData.json';
var users = require(userData);
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
  it('should append new user "test" to data file', (done) => {
    request('localhost:3000')
      .post('/users')
      .send({'name': 'test'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).have.status(200);
        expect(res.text).to.eql('User saved');
        done();
      });
    after(function() {
      var userCount = Object.keys(users).length;
      var testUserId = 'user' + (userCount);
      expect(users[testUserId].name).to.eql('test');
    });
  });
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
