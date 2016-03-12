'use strict';
const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require('../server');
var fs = require('fs');

describe('HTTP-server simple persistence test', () => {
  describe('POST request made to "/messages"', () => {
    it('should respond to /messages with a JSON object with a key "name"', (done) => {
      request('localhost:3000')
        .post('/messages')
        .send({message: 'Alem is here.'})
        .end((err, res) => {
          // console.log(res);
          fs.writeFile(__dirname +'/../data/message_alem.json', '{"name":"alem"}', (err) => {
            if(err) throw err;
            fs.readdir(__dirname +'/../data', (err, files) => {
              if(err) throw err;
              // console.log('from tests: '+files);
              expect(err).to.eql(null);
              expect(res).to.have.status(200);
              expect(files.indexOf('message_alem.json')).to.not.eql(-1);
              done();
            });
          });
        });
    });
  });
  describe('GET request made to /messages', () => {
    it('should respond to /messages with a print out of all messages', (done) => {
      request('localhost:3000')
        .get('/messages')
        .end((err, res) => {
          fs.readdir(__dirname + '/../data', (err, files) => {
            if(err) throw err;
            var numOfFiles = files.length;
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(res.text.split('\n')[0]).to.eql('You have ' + numOfFiles + ' new Messages');
            done();
          });
        });
    });
  });
});
