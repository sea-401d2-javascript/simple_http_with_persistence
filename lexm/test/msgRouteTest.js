var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../routes/seriesRoutes');

describe('Testing series POST', () => {
  it('should respond to POST request by creating a series', (done) => {
    request('localhost:3000')
      .post('/series')
      .set('Content-Type', 'application/json')

  });
});
