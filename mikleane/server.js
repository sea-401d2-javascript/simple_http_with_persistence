'use strict';

var fs = require('fs');
var http = require('http');
var lastFile;


var server = http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/'){
    res.writeHead(200, {'content-type': 'application/json'})
    res.write(JSON.stringify({message: 'hello!'}));
    return res.end();
  };

  if(req.method === 'POST' && req.url === '/notes') {
    res.writeHead(200, {'content-type': 'application/json'});
    req.on('data',(data) => {
      res.write(data);
      fs.readdir(__dirname + '/data', (err, files) => {
        files.sort();
        lastFile = files.length+1;
        fs.writeFile(__dirname + '/data/note' + lastFile + '.json', data);
      });
    });
    req.on('end', ()=> {
      return res.end();
    });

  } else {
      res.writeHead(404, {'content-type': 'text/html'});
      res.write('404 - Not Found');
      return res.end();
    };
}).listen(3000, () => console.log('server running on 3000'));
