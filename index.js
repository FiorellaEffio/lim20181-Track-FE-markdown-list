var fs = require('fs');
var path = require('path');
let lineReader = require('line-reader');
let fetch = require('node-fetch');
let links = [];

const lines = (path) => {
  return new Promise((resolved, reject)=>{
    let lineNumber = 0;
    lineReader.eachLine(path, function(line, last) {
      lineNumber++;
      let href,text;
      url = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if(url !== null) {
        href = url[2];
        text = url[1];
        links.push({fileName:path, lineNumber, href, text});
      }
      if (last) {
        resolved(links)
        return false; // stop reading
      }
    });
  })
}
lines('README.md')
  .then(response => console.log(response))

module.exports = lines;
