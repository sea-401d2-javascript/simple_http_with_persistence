'use strict';
var Router = module.exports = function(){
  this.routes = {
    'GET': {},
    'POST': {}
  };
};

Router.prototype.get = function(route, cb) {
  this.routes['GET'][route] = cb;
  console.log(this.routes['GET'] + ' is inside of Router proto get');
};

Router.prototype.post = function(route, cb) {
  this.routes['POST'][route] = cb;
  console.log(this.routes['POST'] + 'is inside of Router proto post');
};

Router.prototype.route = function() {
  return (req,res) => {
    console.log('I reached here!');
    var routeFunction = this.routes[req.method][req.url];
    routeFunction(req,res);
    console.log(req.method);
    console.log(req.url);
    console.log(req.body);
  };
};
