'use strict'

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server.js');
var fs = require('fs');
var isEmpty;

describe('Checking HTTP GET to server', () => {
  var errorGET = 'Error 404, no dogs files found.';
  it('should respond, \'Error 404, no dogs files found.\' IF data dir is empty.', (done) => {
    request('localhost:3000')
    .get('/dogs')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(404);
      expect(res.text).to.eql(errorGET);
      done();
    })
  })

  describe('checking HTTP Post to server', () => {
    it('should respond with a named bob.json file in data dir', (done) => {
      fs.readdir(__dirname + '/../data', (err, files) => {
        if (err) {throw err}
        isEmpty = files;
      })
      request('localhost:3000')
      .post('/dogs')
      .send({"name":"bob"})
      .end((err, req) => {
        expect(err).to.eql(null);
        expect(req).to.have.status(200);
        expect(isEmpty[0]).to.eql('bob.json');
        done();
      })
    })
  })
})
