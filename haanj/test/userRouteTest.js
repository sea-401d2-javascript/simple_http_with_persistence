'use strict';
require(__dirname + '/../index');

var fs = require('fs');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;

describe('/users resource routing tests', () => {
  it('should send back list of files with GET request', (done) => {
    request('localhost:3000')
      .get('/users')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        fs.readdir(__dirname + '/../data/', (err, files) => {
          expect(res.text).to.eql(JSON.stringify(files.slice(1)));
          done();
        });
      });
  });

  it('should send back name of new file with POST request', (done) => {
    request('localhost:3000')
      .post('/users')
      .send({'name': 'boogers'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        fs.readdir(__dirname + '/../data/', (err, files) => {
          expect(files.indexOf(res.text)).to.not.equal(-1); // checks that new file exists in directory
          done();
        });
      });
  });
});
