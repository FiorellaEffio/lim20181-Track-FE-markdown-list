var fs = require('fs');
var path = require('path');
let fetch = require('node-fetch');
let lineReader = require('line-reader');
let links = [];
let promisesFilesArray = [];
let promisesArchivosMDArray = [];
let archivosMD = [];
let filesMD = [];

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
        links.push({fileName:path, lineNumber, href, text});
      }
      if (last) {
        resolved(links)
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
let options = {validate:false,stats:false}
let filesStats = [];
mdLinks('test')
 .then((archivosMD) => {
   archivosMD.forEach(function(archivo) {
     promisesArchivosMDArray.push(lines(archivo));
   })
   return promisesArchivosMDArray;
 })
 .then((response) => {
   console.log(response)
   Promise.all(response)
     .then((response) => {
           console.log(links)
           links.forEach(function(element) {
             promisesFilesArray.push(getStatusCode(element.href));
           })
           Promise.all(promisesFilesArray)
           .then((response) => {
            for(i=0;i<links.length;i++) {
              links[i].statusText = response[i].statusText;
              links[i].statusCode = response[i].status;
            }
            return links;
           })
           .then((response) => {
            let unique = 0;
            let broken = 0;
            let total = 0;
            let linksFilter = [];
            links.forEach(function(element) {
              total++;
              if(element.statusText === 'Fail') {
                broken++;
              }
              linksFilter.push(element.href);
              console.log(element.fileName + "\t" +element.lineNumber+" "+element.href+" "+element.text+" "+element.statusCode+'/'+element.statusText)
            });
            unique = linksFilter.filter(function(item, index, array) {
              return array.indexOf(item) === index;
            });
            console.log('unique:'+unique.length+', broken:'+broken+', total:'+ total)
           })
     })
 })

module.exports = mdLinks;
