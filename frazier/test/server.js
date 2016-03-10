'use strict';
var fs = require('fs');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var request = chai.request;
var expect = chai.expect;

require(__dirname + '/../lib/server.js');

describe('server.js', () => {
  before((done) => {
    console.log('going to delete everything in the notes directory');
    fs.readdir(__dirname + '/../lib/notes', (err, files) => {
      if (err) throw err;
      files.forEach((current) => {
        fs.unlinkSync(__dirname + '/../lib/notes/' + current);
      });
      done();
      console.log('done deleting all files');
    });
  });
  
  describe('it should respond to post requests', () => {
    it('should save new file when /notes is hit with a post request', (done) => {
      request('localhost:3000').post('/notes').send({body: 'hello world 1'}).end((request, response) => {
        expect(response.status).to.equal(200);
        fs.readFile(__dirname + '/../lib/notes/1.json', 'utf8', (err, data) => {
          expect(err).to.eql(null);
          expect(JSON.parse(data)).to.eql({body: 'hello world 1'});
          done();
        });
      });
    });
  });
  
  describe('it should respond to get requests', () => {
    it('should return a file when /notes/number is hit with a GET request and that file exists', (done) => {
      request('localhost:3000').get('/notes/1').end((request, response) => {
        expect(response.status).to.equal(200);
        expect(response.text).to.equal('{"body":"hello world 1"}');
        done();
      });
    });
    it('should return all files when /notes is hit with a GET request and notes exist', (done) => {
      request('localhost:3000').post('/notes').send({body: 'hello world 2'}).end((request2, response2) => {
        request('localhost:3000').post('/notes').send({body: 'hello world 3'}).end((request3, response3) => {
          request('localhost:3000').post('/notes').send({body: 'hello world 4'}).end((request4, response4) => {
            request('localhost:3000').get('/notes').end((getRequest, getResponse) => {
              expect(response2.status).to.equal(200);
              expect(response3.status).to.equal(200);
              expect(response4.status).to.equal(200);
              expect(getResponse.status).to.equal(200);
              var i = 1;
              getResponse.on('data', (err, data) => {
                expect(err).to.eql(null);
                expect(JSON.parse(data)['body']).to.eql('hello world ' + i);
                i++;
                if (i === 4){
                  done();
                }
              });
            });
          });
        });        
      });
    });
  });
  
  describe('should 404 appropriately', () => {
    before((done) => {
      console.log('going to delete everything in the notes directory');
      fs.readdir(__dirname + '/../lib/notes', (err, files) => {
        if (err) throw err;
        files.forEach((current) => {
          fs.unlinkSync(__dirname + '/../lib/notes/' + current);
        });
        done();
      });
    });
    it('should 404 on a bad url', (done) => {
      request('localhost:3000').get('/asfjasldfjas').end((request, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });
    
    describe('should throw a 404 if no files are present for get requests', () => {
      it('should 404 a request to /notes if no files are there', (done) => {
        request('localhost:3000').get('/notes').end((request, response) => {
          expect(response.status).to.equal(404);
          done();
        });
      });
      it('should 404 a request to /notes/:id if that file does not exist', (done)=> {
        request('localhost:3000').get('/1').end((request, response) => {
          expect(response.status).to.equal(404);
          done();
        });
      });
    });
  });  
});
