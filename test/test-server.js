'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var expect = require('chai').expect;

var request = chai.request;

require(__dirname + '/../server');
var fs = require('fs');

describe('HTTP server tests for routes', ()=>{
  it('Should respond to GET request to "/data" with json file', (done)=>{
    request('localhost:5000')
    .get('/data')
    .end((err, res)=>{
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  })
  it('Should POSt new data to a specified directory', (done)=>{
    request('localhost:5000')
    .post('/data')
    .send({'name': 'Pappy'})
    .end((err, res)=>{
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"name":"Pappy"}');
      done();
    });
  });
});
