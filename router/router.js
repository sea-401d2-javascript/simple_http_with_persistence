'use strict';

var Router = module.exports = function() {
  this.routes = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'DEL': {}
  }
}

Router.prototype.get = function(route, cb) {
  this.routes.get[route] = cb;
}

Router.prototype.post = function(route, cb) {
  this.routes.post[route] = cb;
}

Router.prototype.route = function() {
  return (req, res) => {
    var routeFunction = this.routes[req.method][req.url]
    routeFunction(req, res)
  }
}
