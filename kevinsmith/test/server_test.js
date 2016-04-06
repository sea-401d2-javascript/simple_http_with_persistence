'use strict';

const fs = require('fs');
var expect =  require('chai').expect;
var chai = require('chai')
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const request = chai.request;

var serverObject = require(__dirname + '/../server.js');



describe('Testing the server.js', () => {
 
  it('should write a JSON file in /output', () => {
    var now = new Date().getTime();
    request('localhost:3000')
    .post('/')
    .send({message:'test'})
    .end((err, res, done) => {
      if (err) throw err;
        console.log('HERE one');
      fs.readdir('../output', (err, files) => {
        console.log('HERE two');
        if (err) {
          console.log(err.toString());
        }// if
        console.log(files);
        files.sort();
        newestFile = files[files.length - 1];
        fileSplit   = newestFile.split('.');
        newestFilename = fileSplit[0];
        console.log('newestFilename: ', newestFilename)
  
      });// readdir
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      console.log(Number(newestFilename), ' : ', Number(now))
      expect(Number(newestFilename)).to.be.below(Number(now))
      done();
    });// end
  });// it

});// describe