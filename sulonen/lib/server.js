'use strict';

const http = require('http');
const fs = require('fs');

var server = module.exports = http.createServer((req, res) => {
  //root
  if(req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>All your base are belong to us...</h1>\n');
    return res.end();
  }

  if(req.method === 'POST') {
    var body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      console.log(body);
      var dateString = new Date().getTime();
      fs.writeFile(__dirname + '/../data/' + dateString
        + '.json', body, (err) => {
          if (err) throw err;
        });
      res.end('File written.\n');
    });
    return;
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// curl -v -H "Content-Type: application/json" -X POST -d @./lib/test-json.json localhost:3000
