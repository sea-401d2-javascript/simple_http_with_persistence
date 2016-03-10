var http = require('http');
var fs = require('fs');

var nd;

var server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'content-type': 'text/html'})
    res.write('Hello, world');
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/notes') {
    res.writeHead(200, {'content-type': 'text/plain'})
    var files = fs.readdirSync(__dirname + '/notesData')
      // console.log('filesconsole: ' + files)
      res.write(files.toString())
    return res.end();
  }

  if(req.method === 'POST' && req.url === '/notes') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    req.on('data', (data) => {
      res.write(data);
      fs.readdir(__dirname + '/notesData', (err, files) => {
        // console.log('files' + files)
        files.sort();
        nd = files.length
        fs.writeFile(__dirname + '/notesData/notes' + nd + '.json', data)
      })
    });
    req.on('end', () => {
      return res.end()
    });

  } else {
    res.writeHead(404, {'content-type': 'text/html'});
    res.write('404 Not Found');
    res.end();
  }
}).listen(3000, () => console.log('server up on 3000'));
