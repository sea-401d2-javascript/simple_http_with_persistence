'use strict';
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var request = chai.request;
var expect = chai.expect;
require(__dirname + './router.js');
var fs = require('fs');

describe('Testing the ')
