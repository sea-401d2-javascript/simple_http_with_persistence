'use strict';

var http = require('http');
var router = require('../router/router');
var routes = require('../routes/route-handle.js');

http.createServer(productsRouter.route()).listen(3000)
