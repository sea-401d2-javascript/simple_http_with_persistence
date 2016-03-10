'use strict';

var http = require('http');
var Router = require(__dirname + './routes/router');
var fooRouter = new Router();

var server = http.createServer((req, res, err) => {
  if (req.method === 'GET' && req.url === '/time') {
    var getTime = new Date;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>' + getTime + '</h1>');
    return res.end();
  }
  if (req.method === 'GET' && req.url.slice(0, 6) === '/greet') {
    var greetName = req.url.slice(7);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1> Greetings ' + greetName + '!</h1>');
    return res.end();
  }
  if (req.method === 'POST' && req.url === '/post') {
    req.on('data', (data) => {
      var body = JSON.parse(data);
      console.log(body);
    });
    res.writeHead(200, 'Content-Type: text/html');
    res.write('Post Received');
    return res.end();
  }
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.write('<h1>404 Not Found</h1>');
  return res.end();

}).listen(3000, () => {
  console.log('Server started on port 3000');
});
