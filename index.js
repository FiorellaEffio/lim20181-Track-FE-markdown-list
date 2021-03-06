let fs = require('fs');
let path = require('path');
let fetch = require('node-fetch');
let lineReader = require('line-reader');
let filesMD = [];
let linksFromFilesMD = [];
let promisesFilesMDArray = [];
let promisesLinksValidate = [];

const getStatusCode = (url) => {
  return new Promise((resolved, reject) => {
    fetch(url)
      .then((response) => {
        resolved(response);
      })
      .catch((error) => {
        resolved({status:'', statusText:'Fail'});
      });
  })
}

const lines = (path) => {
  return new Promise((resolved, reject) => {
    let lineNumber = 0;
    lineReader.eachLine(path, (line, last) => {
      lineNumber++;
      let href,text;
      url = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if(url !== null) {
        href = url[2];
        text = url[1];
        linksFromFilesMD.push({fileName:path, lineNumber, href, text});
      }
      if (last) {
        resolved(linksFromFilesMD)
        return false; // stop reading
      }
    });
  })
}

const obtainFilesMDFromDirectory = (currentPath) => {
  let files = fs.readdirSync(currentPath);
  files.forEach((element) => {
    let currentFile = path.join(currentPath, element);
    if (fs.statSync(currentFile).isFile() && path.extname(currentFile) === '.md') {
      filesMD.push(currentFile);
    } else if (fs.statSync(currentFile).isDirectory()) {
     obtainFilesMDFromDirectory(currentFile);
    }
  })
  return filesMD;
};

const mdLinks = (ruta, options) => {
 ruta = path.join(process.cwd(), ruta)
 options = (options) ? options : {validate:false, stats:false};
 return new Promise((resolved, reject) => {
   if(fs.statSync(ruta).isFile()) {
     let ext = path.extname(ruta);
     if(ext === '.md') {
       filesMD = [ruta]
     } else {
       resolved('No es archivo markdown');
     }
   } else {
     filesMD = obtainFilesMDFromDirectory(ruta);
   }
   filesMD.forEach((archivo) => {
     promisesFilesMDArray.push(lines(archivo));
   })
   if(options.process !== false) {
     Promise.all(promisesFilesMDArray).then((response) => {
       return response[promisesFilesMDArray.length-1];
     }).then((links) => {
       if(options.validate === false && options.stats === false) {
         resolved(links);
       } else {
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
           links.forEach((element) => {
             total++;
             if(element.statusText !== 'OK') {
               broken++;
             }
             linksFilter.push(element.href);
           });
           unique = (linksFilter.filter((item, index, array) => {
             return array.indexOf(item) === index;
           })).length;
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

module.exports = mdLinks;
