'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server');


describe('Testing the HTTP server', () => {
  it('should GET venues from /venues', (done) =>{
    request('localhost:3000')
    .get('/venues')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).eql(null);
      expect(res.text).to.eql('1.json');
      done();
    });
  });

  it('should create new files in /data on request',(done) =>{
    request('localhost:3000')
    .post('/venues')
    .send({message: 'Hey'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.be.status(200);
      done();
    });
  });
});
