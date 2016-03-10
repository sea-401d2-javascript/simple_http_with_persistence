var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require(__dirname + '/../http-server');
chai.use(chaiHTTP);
var expect = chai.expect;
var request = chai.request;
var dateformat = require('dateformat');

// describe('Vanilla HTTP server tests', () => {
//
//   it('should respond to / with hello', (done) => {
//     request('localhost:3000')
//       .get('/')
//       .end((err, res) => {
//         expect(err).to.eql(null);
//         expect(res).to.have.status(200);
//         expect(res.text).to.eql('Hello!');
//         done();
//       })
//   })
//
//   it('should return "Hello, Brandon" with POST request', (done) => {
//     request('localhost:3000')
//     .post('/greet')
//     .send({'name': 'Brandon'})
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       expect(res.text).to.eql('{"name":"Brandon"}');
//       done();
//     });
//   });
// })
