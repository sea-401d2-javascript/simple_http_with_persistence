// 'use strict';
//
// var http = require('http');
// var fs = require('fs');
//
//
// http.createServer((req, res) => {
//   if(req.url === '/') {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     var rr = fs.createReadStream(__dirname + './venue-route.js');
//     return rr.pipe(res);
//   }
//   res.writeHead(404, {'Content-Type': 'application/json'});
//   res.write('404 Not Found');
//   res.end();
//
// }).listen(3000), () => {
//   console.log('server is up on 3000');
// };
