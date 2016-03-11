'use strict';
var fs = require('fs');



function logFile(jsonObject) {
  fs.readdir(__dirname + '/../data/', (err, files) => {
    let counter = files.length;
    let dir = __dirname + '/../data/';
    let newFile = 'userFile-' + counter + '.json';
    fs.writeFileSync(dir + newFile, jsonObject, 'utf-8');
  });
}


module.exports = logFile;
