var fs = require('fs');
var path = require('path');
let fetch = require('node-fetch');
let lineReader = require('line-reader');
let filesMD = [];
let links1 = [];
let promisesFilesMDArray = [];
let promisesLinksValidate = [];

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
  var files = fs.readdirSync(currentPath);
  for (var i in files) {
    var currentFile = path.join(currentPath, files[i]);
    if (fs.statSync(currentFile).isFile() && path.extname(currentFile) === '.md') {
      filesMD.push(currentFile);
    } else if (fs.statSync(currentFile).isDirectory()) {
     obtainFilesMDFromDirectory(currentFile);
    }
  }
  return filesMD;
};

const mdLinks = (ruta, options) => {
 ruta = path.join(process.cwd(), ruta)
 options = (options) ? options : {validate:false, stats:false};
 return new Promise((resolved, reject) => {
   if(fs.statSync(ruta).isFile()) {
     var ext = path.extname(ruta);
     if(ext === '.md') {
       filesMD = [ruta]
     } else {
       resolved('No es archivo markdown');
     }
   } else {
     filesMD = obtainFilesMDFromDirectory(ruta);
   }
   filesMD.forEach(function(archivo) {
     promisesFilesMDArray.push(lines(archivo));
   })
   if(options.process !== false) {
     Promise.all(promisesFilesMDArray).then((response) => {
       return response[promisesFilesMDArray.length-1];
     }).then((links) => {
       if(options.validate === false && options.stats === false) {
         resolved(links);
       } else {
         console.log(links)
         links.forEach((elemento) => {
           promisesLinksValidate.push(getStatusCode(elemento.href))
         })
         Promise.all(promisesLinksValidate).then((response) => {
           for(i=0;i<links.length;i++) {
             links[i].statusText = response[i].statusText;
             links[i].statusCode = response[i].status;
           }
           return links;
         }).then((links)=>{
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
           });
           unique = linksFilter.filter(function(item, index, array) {
             return array.indexOf(item) === index;
           });
           unique = unique.length;
           if(options.validate === true && options.stats === true) {
             resolved({unique, total, broken})
           } else if (options.validate === true) {
             resolved(links);
           } else if (options.stats === true) {
             resolved({unique, total})
           }
         })
       }
     })
   }
 })
}
//print the txt files in the current directory

module.exports = mdLinks;
