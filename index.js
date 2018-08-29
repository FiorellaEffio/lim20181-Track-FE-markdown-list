var fs = require('fs');
var path = require('path');
let fetch = require('node-fetch');
let lineReader = require('line-reader');
let filesMD = [];
let links1 = [];

const getStatusCode = (url) => {
  return new Promise((resolved, reject) => {
    fetch(url)
      .then(function(response) {
        resolved(response);
      })
      .catch(function(error) {
        resolved({status:'', statusText:'Fail'});
      });
  })
}

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
        links1.push({fileName:path, lineNumber, href, text});
      }
      if (last) {
        resolved(links1)
        return false; // stop reading
      }
    });
  })
}

const obtainFilesMDFromDirectory = (currentPath) => {
  return new Promise((resolved, reject) => {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var currentFile = path.join(currentPath, files[i]);
      if (fs.statSync(currentFile).isFile() && path.extname(currentFile) === '.md') {
        filesMD.push(currentFile);
      } else if (fs.statSync(currentFile).isDirectory()) {
       obtainFilesMDFromDirectory(currentFile);
      }
    }
    resolved(filesMD);
  })
};

const mdLinks = (ruta, options) => {
 options = (options) ? options : {validate:false, stats:false};
 return new Promise((resolved, reject) => {
   if(fs.statSync(ruta).isFile()) {
     var ext = path.extname(ruta);
     if(ext === '.md') {
       resolved([ruta])
     } else {
       console.log('No es archivo markdown');
     }
   } else {
     filesMD = obtainFilesMDFromDirectory(ruta);
     resolved(filesMD)
   }
 })
}
//print the txt files in the current directory

module.exports = {
  lines,
  getStatusCode,
  mdLinks
}
