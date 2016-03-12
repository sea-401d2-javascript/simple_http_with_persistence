var fs = require('fs');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = chai.request;
var expect = chai.expect;
var fileContent;

require(__dirname + '/../server');

describe('persistent HTTP server tests', () => {
  before(function(){
    request('localhost:3000')
    .post('/notes')
    .send({"Hello":"World"})
    .end(function(err, res) {
      fs.readdir(__dirname + '/../data', function (err, files) {
        files.sort();
        var lastFile = files[files.length-1]
        fs.readFile(__dirname + '/../data/' + lastFile, 'utf-8', function(err, data) {
          fileContent = data;
        })
      })
    })
  })

  it('should respond to / with greeting', (done) => {
    request('localhost:3000')
    .get('/')
    .end((err,res)=> {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"message":"hello!"}');
      done();
    })
  })
  it('accept post request to /notes', (done) =>{
    request('localhost:3000')
    .post('/notes')
    .send({"Hello":"World"})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body).to.eql({"Hello":"World"});
      done();
    })
  })
  it('post writes to new file', function(done) {

    expect(fileContent).to.eql('{"Hello":"World"}');
    done();
  });

  it('should get back at 404 error', (done) => {
   request('localhost:3000')
     .get('/URLerror')
     .end((err, res) => {
       expect(err).to.not.eql(null);
       expect(res).to.have.status(404);
       expect(res.text).to.eql('404 - Not Found');
       done();
     })
   })
});
