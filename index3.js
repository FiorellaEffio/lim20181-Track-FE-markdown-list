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

function obtainFilesMDFromDirectory(currentPath) {
  return new Promise((resolved, reject) => {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var currentFile = path.join(currentPath, files[i]);
      if (fs.statSync(currentFile).isFile() && path.extname(currentFile) === '.md') {
        let lineNumber = 0;
        lines(currentFile);

      } else if (fs.statSync(currentFile).isDirectory()) {
       obtainFilesMDFromDirectory(currentFile);
      }
    }
    resolved(links);
  })
};


const mdLinks = (path, options) => {
 options = (options) ? options : {validate:false, stats:false};
 return new Promise((resolved, reject) => {
   if(fs.statSync(path).isFile()) {
     if(path.extname(path) === '.md') {
     } else {
       console.log('No es archivo markdown');
     }
   } else {
     links = obtainFilesMDFromDirectory(path);
     resolved(links)
   }
 })
}
//print the txt files in the current directory
let options = {validate:false,stats:false}
// mdLinks('test')
//  .then((files)=> console.log(files))

lines('test/hola.md')
 .then((files)=> console.log(files))
module.exports = mdLinks;
