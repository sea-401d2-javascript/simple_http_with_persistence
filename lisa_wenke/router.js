'use strict';

var Router = module.exports = () => {
  this.routes = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'DELETE': {}
  };
};
Router.prototype.route = () => {
  return(req, res) => {
    var routeFunction = this.routes[req.method][req.url];
    routeFunction(req, res);
  };
};

Router.prototype.post = (route, cb) =>{
  this.routes['POST'][route] = cb;
};
Router.prototype.get = (route, cb) => {
  this.routes['GET'][route] = cb;
};
Router.prototype.put = (route, cb) => {
  this.routes['PUT'][route] = cb;
};
Router.prototype.delete = (route, cb) => {
  this.routes['DELETE'][route] = cb;

};
