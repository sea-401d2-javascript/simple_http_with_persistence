'use strict';

var http = require('http');
var fs = require('fs');
var userData = __dirname + '/data/userData.json';
var users = require(userData);

http.createServer((req, res) => {

  if (req.method === 'POST' && req.url === '/users') {
    req.on('data', (data) => {
      var body = JSON.parse(data);
      console.log(body);
      var userCount = Object.keys(users).length;
      var newUserId = 'user' + (userCount += 1);
      users[newUserId] = body;
      fs.writeFile(userData, JSON.stringify(users, null, 2), function (err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(users, null, 2));
        console.log('writing to ' + userData);
      });
    });
    res.write('User saved');
    return res.end();
  }
  if (req.method === 'GET' && req.url.slice(0, 6) === '/users') {
    var userQuery = req.url.slice(7);
    console.log(users[userQuery]);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(users[userQuery].name);
    return res.end();
  }
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.write('<h1>404 Not Found</h1>');
  return res.end();

}).listen(3000, () => {
  console.log('Server started on port 3000');
});
