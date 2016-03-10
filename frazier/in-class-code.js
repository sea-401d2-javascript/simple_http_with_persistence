//server
'use strict';
var http = require('http');
var Router = require('../lib/router');
var studentsRouter = new Router();

studentsRouter.get('/students', (req, res) => {
  console.log('/students route hit');
  // Would actually do a students database lookup
  res.end();
})

http.createServer(studentsRouter.route()).listen(3000)



//router
var Router = module.exports = function() {
  this.routes = {
    'GET': {},
    'POST': {}
  };
};

Router.prototype.get = function(route, cb) {
  this.routes['GET'][route] = cb;
}

Router.prototype.route = function() {
  return (req, res) => {
    var routeFunction = this.routes[req.method][req.url];
    routeFunction(req, res);
  };
};
