'use strict';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var fs = require('fs');
var expect = chai.expect;
var request = chai.request;
require(__dirname + '/../routes/route-handle.js');
require(__dirname + '/../router/router.js');

describe('testing different routes', () => {
  it('should return a log when hitting product route with GET request', (done) => {
    request('localhost:3000')
    .get('/products')
    .end((err,res) => {
      expect(res).to.have.status(200);
      // expect(res.body).to.equal('/products route hit with GET request')
      done();
    });
  });
  it('should return a log when hitting product route with GET request and ID', (done) => {
    request('localhost:3000')
    .get('/products/:id')
    .end((err, res) => {
      expect(res).to.have.status(200);
      // expect(res.body).to.equal('products route hit with specific id')
    });
    done();
  });
  it('should create a file when hitting product route with POST request', (done) => {
    request('localhost:3000')
    .post('/products')
    .send({'name': 'James'})
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res.text).to.eql('{"name":"James"}');
    });
    done();
  });
});
