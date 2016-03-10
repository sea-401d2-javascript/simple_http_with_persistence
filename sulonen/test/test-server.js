'use strict';

const chai = require('chai');
const chai_http = require('chai-http');

chai.use(chai_http);
const request = chai.request;
const expect = chai.expect;

require('./../lib/server').server;

describe('HTTP Server Tests', () => {
  it('should respond with a silly greeting at GET /', (done) => {
    request('localhost:3000')
    .get('/')
    .end((err, res) => {
      if (err) throw err;
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.text.endsWith('</h1>\n')).to.equal(true);
      done();
    });
  });

  it('should write a JSON file', (done) => {
    request('localhost:3000')
    .post('/')
    .end((err, res) => {
      if (err) throw err;
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.text.endsWith('</h1>\n')).to.equal(true);
      done();
    });
  });
});
