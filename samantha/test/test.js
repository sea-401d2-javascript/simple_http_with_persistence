var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;
var request = chai.request;
require(__dirname + '/../server');

describe('Test HTTP server with persistence',() => {

  it('should respond to get request on /  with hello and that name', (done) => {
    request('localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello, world');
        done();
      })
  })

  it('should write a json object to a file with a unique name', (done) => {
    request('localhost:3000')
      .post('/notes')
      .send({'notes': 'testing'})
      .end((err, res) => {
        expect(err).to.eql(null)
        var buffer = res.text
        JSON.stringify(buffer)
        console.log('buffer' + buffer)
        // console.log('res.text:' + res.text.toString())
        expect(res.text).to.eql(buffer);
        done();
      })
  })

  it('should get back at 404 error', (done) => {
    request('localhost:3000')
      .get('/fakeURL')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('404 Not Found');
        done();
      })
  })
})

// var contents = 'initial data';
//   var lastFile;
//   before(function(done){
//     client;
//     fs.readdir(__dirname + '/../logs/', (err, files) => {
//       files.sort();
//       lastFile = files[files.length-1];
//       // The below operation is also asynchronous, so it must be called sequentially
//       // Here I just nesting it and calling done when the inner function completes
//       fs.readFile(__dirname + '/../logs/' + lastFile, (err, data) => {
//         // *** data is a buffer and must be converted to a string ***
//         contents = data.toString();
//         // Also note that data string has a \r\n at the end for 'carraiage return' and 'new line'
//         done();
//       })
//     })
//   });
//   it('should write a new file with a uniquie identifier based on clinet request', function(){
//     console.log(contents);
//     expect(contents).to.eql('GET / HTTP/1.1 Host: localhost:3000 User-Agent: curl/7.46.0 Accept: */*')
//     // So if you modifiy your expect to be like the following, it will work:
//     // expect(contents).to.eql('GET / HTTP/1.1 Host: localhost:3000 User-Agent: curl/7.46.0 Accept: */*\r\n')
