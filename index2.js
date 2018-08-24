let lineReader = require('line-reader');
let fetch = require('node-fetch');
let fs = require('fs');
let path = require('path');
let files = [];
const validatePath = (path) => {
  try {
    require('fs').accessSync(path)
    return true;
  } catch (e) {
    return false;
  }
}
const validateFileOrDirectory = (path) => {
  let stats = fs.statSync(path);
  if(stats.isFile()) {
    if(".md" === path.slice(path.length-3, path.length)) {
      let links = [];
      let lineNumber = 0;
      lineReader.eachLine(path, function(line, last) {
        lineNumber++;
        url = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if(url !== null) {
          file = path;
          text = url[1]
          href = url[2];
          links.push({lineNumber, text, href});
          let fileStats = {file, links};
          console.log(fileStats)
          files.push(fileStats);
          console.log(files)
        }
        if (last) {
          return false; // stop reading
        }
      });
    }
    console.log(files)
  } else {
    return obtainFilesMDFromDirectory(path);
  }
}
//funcion para extraer archivos md de carpeta
const obtainFilesMDFromDirectory = (path) => {
  fs.readdir(path, (err, files) => {
  if(files !== undefined) {
    files.forEach((file) => {
      validateFileOrDirectory(path + "/" + file);
  	 });
  }
  });
}

function mdLinks(path, options) {
 options = (options) ? options : {validate:false, stats:false};
 return new Promise((resolved, reject) => {
   if(validatePath(path)) {
     console.log('ruta valida')
     validateFileOrDirectory(path);
     files.push({file:'hola'})
   } else {
     console.log('ruta no es valida')
   }
   resolved(files);
 })
}


let options = {validate:false,stats:false}
mdLinks('test', options)
 .then((links)=> console.log(files))
module.exports = mdLinks;
