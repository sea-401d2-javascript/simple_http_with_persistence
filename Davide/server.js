'use strict';

const http = require('http');
const fs = require('fs');

var server = http.createServer( function (req, res) {

  if (req.url === '/time') {
          var now = new Date().toString();
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('now');
    return res.end();
  }

var url = req.url.toString();
var name = url.substring;

if(req.url === url && req.method === "GET") {
    res.writeHead(200, {'Content-type': 'application/json'});
    res.write('hello,' + name);
    return res.end();
}


if(req.url ===  '/stock' && req.method === 'POST') {
    var parsed = '';
    req.on('data', function(data) {
      fs.writeFile(__dirname + '/data/' + 'Wine' + '.js', data, (err) => {
          if (err) throw err;
             console.log('Its saved!');
           });
           res.write('you saved');
        return res.end();
})


}

  // res.writeHead(404, {'content-type': 'text/plain'});
  // res.write('404 Not Found');
  // res.end();

})

server.listen(3000, () => console.log('server up on 3000'));
