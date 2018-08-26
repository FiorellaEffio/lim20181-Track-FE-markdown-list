var fs = require('fs');
var path = require('path');
let lineReader = require('line-reader');
let fetch = require('node-fetch');

const validatePath = (path) => {
  try {
    require('fs').accessSync(path)
    return true;
  } catch (e) {
    return false;
  }
}

const getFilesFromDir = (dir) => {
  var filesToReturn = [];
  function walkDir(currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var currentFile = path.join(currentPath, files[i]);
      if (fs.statSync(currentFile).isFile() && path.extname(currentFile) === '.md') {
        filesToReturn.push({file:currentFile});
      } else if (fs.statSync(currentFile).isDirectory()) {
       walkDir(currentFile);
      }
    }
  };
  if(fs.statSync(dir).isFile()) {
    if(path.extname(dir) === '.md') {
      filesToReturn.push({file:dir});
    } else {
      console.log('No es archivo markdown');
    }
  } else {
    walkDir(dir);
  }
  return filesToReturn;
}
const linksOfFile = (files) => {
  return new Promise((resolved, reject) => {
    files.forEach(function(element) {
      console.log(element)
      let lineNumber = 0;
      linksArray = element.links;
      linksArray = [];
      lineReader.eachLine(element.file, function(line, last) {
        console.log(element.file)
        lineNumber++;
        url = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if(url !== null) {
          file = element.file;
          text = url[1]
          href = url[2];
          (linksArray).push({lineNumber, text, href});
          console.log(linksArray)
        }
        if (last) {
          return false; // stop reading
        }
      });
    });

    resolved(files)
  })
}
const mdLinks = (path, options) => {
 options = (options) ? options : {validate:false, stats:false};
 return new Promise((resolved, reject) => {
   if(validatePath(path)) {
     files = getFilesFromDir(path);
     resolved(files);
   } else {
     resolved('ruta no valida');
   }
 })
}
//print the txt files in the current directory
let options = {validate:false,stats:false}
mdLinks('test', options)
 .then((files)=> linksOfFile(files))
 .then((files)=> console.log(files))
module.exports = mdLinks;
