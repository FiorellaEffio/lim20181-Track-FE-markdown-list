var fs = require('fs');
var path = require('path');
let fetch = require('node-fetch');
let lines = require('./index.js')
let links = [];

const obtainFilesMDFromDirectory = (currentPath) => {
  return new Promise((resolved, reject) => {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var currentFile = path.join(currentPath, files[i]);
      if (fs.statSync(currentFile).isFile() && path.extname(currentFile) === '.md') {
        links.push(currentFile);
      } else if (fs.statSync(currentFile).isDirectory()) {
       obtainFilesMDFromDirectory(currentFile);
      }
    }
    resolved(links);
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
     links = obtainFilesMDFromDirectory(ruta);
     resolved(links)
   }
 })
}
//print the txt files in the current directory
let options = {validate:false,stats:false}
let filesStats = [];
mdLinks('test')
 .then((files) => { console.log(files)})

module.exports = mdLinks;
