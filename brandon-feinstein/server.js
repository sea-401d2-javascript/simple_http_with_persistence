'use strict';
var http = require('http');
var fs = require('fs');
var docNum = 0;


var server = http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type':'text/plain'}); //tells what kind of response status and what format the response will be in
    res.write('Hello!');
    res.end();
  }
  else if(req.method === 'GET' && req.url === '/notes') {
    fs.readdir(__dirname + '/docs', (err, files) => {
      if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(files.toString());
        return res.end();
    })
  }
  else if(req.method === 'POST' && req.url === '/notes') {
    docNum++;
    req.on('data', (data) => {
      console.log(docNum);
      var newFile = 'doc' + docNum + '.json';
      var file = __dirname + '/docs/' + newFile;
      var content = (data.toString());
      console.log(content);
      fs.writeFile(file, content, (err) => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Mic check added to ' + file);
        // console.log(docNum);
        return res.end();
      });
    });
    console.log("docNum = " + docNum);
  }
  // else if(req.method === 'POST' && req.url === '/notes') {
  //   req.on('data', (data) => {
  //     var newFile = 'doc.json';
  //     var file = __dirname + '/' + newFile;
  //     var content = (data.toString());
  //     console.log(content);
  //     fs.writeFile(file, content, (err) => {
  //       if (err) throw err;
  //       console.log(content);
  //       res.writeHead(200, {'Content-Type': 'text/plain'});
  //       res.write('Notes add to ' + fileLoc);
  //       return res.end();
  //     });
  //   });
  // }
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write("404 not found");
    res.end();
  }
}).listen(3000, () => console.log('server up on 3000'));
