var fs = require('fs');
var path = require('path');
let fetch = require('node-fetch');
let lines = require('./index.js')
let links = [];
let getStatusCode = require('./index2.js')

function obtainFilesMDFromDirectory(currentPath) {
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
let filesStats = [];
mdLinks('test')
 .then((files) => {
 promisesFilesArray = [];
 files.forEach(function(element) {
   lines(element)
    .then(result => filesStats.push(result))
 })
 return filesStats;
})
.then(result => console.log(result))


 //
 //
 // promisesFilesArray = [];
 // files.forEach(function(element) {
 //   promisesFilesArray.push(getStatusCode(element.href));
 // })
 // //
 // Promise.all(promisesFilesArray)
 //   .then((response) => {
 //     for(i=0;i<files.length;i++) {
 //       files[i].statusText = response[i].statusText;
 //       files[i].statusCode = response[i].status;
 //     }
 //     return files;
 //   })
 //   .then((response) => {
 //     let unique = 0;
 //     let broken = 0;
 //     let total = 0;
 //     let links = [];
 //     files.forEach(function(element) {
 //       total++;
 //       if(element.statusText === 'Fail') {
 //         broken++;
 //       }
 //       links.push(element.href);
 //       console.log(element.fileName + "\t" +element.lineNumber+" "+element.href+" "+element.text+" "+element.statusCode+'/'+element.statusText)
 //     });
 //     unique = links.filter(function(item, index, array) {
 //       return array.indexOf(item) === index;
 //     });
 //     console.log('unique:'+unique.length+', broken:'+broken+', total:'+ total)
 //   })

module.exports = mdLinks;
