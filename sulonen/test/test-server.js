'use strict';

const fs = require('fs');
const chai = require('chai');
const chai_http = require('chai-http');
const assert = require('chai').assert;

chai.use(chai_http);
const request = chai.request;
const expect = chai.expect;

require('./../server').server;

describe('HTTP Server Tests', () => {
  it('should respond with a fiile list at GET /', (done) => {
    request('localhost:3000')
    .get('/')
    .end((err, res) => {
      if (err) throw err;
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.text.endsWith('</ul>\n')).to.equal(true);
      done();
    });
  });

  it('should write a JSON file in /data', () => {
    var testTime = new Date().getTime();
    var latestFile;
    request('localhost:3000')
    .post('/')
    .send({'island': 'It is not down in any map; true places never are.'})
    .end((err, res, done) => {
      if (err) throw err;
      fs.readdir(__dirname + '/../data/', (err, files) => {
        if (err) throw err;
        files.sort();
        latestFile = files[files.length - 1].slice(0, 13);
        latestFile = parseInt(latestFile);
      });
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      assert.isAtLeast(testTime, latestFile);
      done();
    });
  });
});
