'use strict';

var Router = module.exports = function() {
  this.routes = {
  	'GET': {},
  	'POST': {},
    'ERROR': (req, res) => {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write('404 Not Found');
      return res.end();
    }
  };
};

Router.prototype.get = (url, cb) => {
  this.routes['GET'][url] = cb
};

Router.prototype.post = (url, cb) => {
  this.routes['POST'][url] = cb
};

Router.prototype.route = () => {
	return (req, res) => {
		var routeFunction = this.routes[req.method][req.url]
		routeFunction(req, res)
	};
};
