var chai = require('chai');
var chaiHTTP = require('chai-http');
var fs = require('fs');
var server = require(__dirname + '/../server');
chai.use(chaiHTTP);
var expect = chai.expect;
var request = chai.request;

var resText;
var errCheck;
var fileContent;
var fileString;

describe('HTTP server with persistance tests', () => {
  before(function(done){
    request('localhost:3000')
    .post('/notes')
    .send({'name': 'Brandon'})
    .end((err, res) => {
      resText = res.text;
      errCheck = err;
    });
    fs.readFile(__dirname + '/test-docs/doc1.json', (err, data) => {
      if (err) throw err;
      // var resDat = data
      fileContent = data.toString();
    })
    fs.readdir(__dirname + '/test-docs', (err, files) => {
      if (err) throw err;
        fileString = files.toString();
        // return res.end();
    })
    done();
  })

  it('GET request should respond to / with hello', (done) => {
    request('localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello!');
        done();
      })
  })
  it('GET request should respond to /notes with list of files in test-docs directory', (done) => {
    request('localhost:3000')
    .get('/notes')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(fileString).to.eql('doc1.json,doc2.json,doc3.json,doc4.json');
      done();
    });
  });

  it('should return "name":"Brandon" with POST request', () => {
      expect(errCheck).to.eql(null);
      expect(resText).to.eql('{"name":"Brandon"}');
  });

  it('should write correct data to doc file', () => {
      expect(fileContent).to.eql(resText);
  });

})
