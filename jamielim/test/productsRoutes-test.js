'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../routes/productsRoutes.js');

describe('Test for /products routes', () => {
  it('should respond to GET /products', (done) => {
    request('localhost:3000')
      .get('/products')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should respond to POST /products', (done) => {
    request('localhost:3000')
      .post('/products')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        done();
      });
  });
});
