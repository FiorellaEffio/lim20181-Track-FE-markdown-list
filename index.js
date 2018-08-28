var fs = require('fs');
var path = require('path');
let lineReader = require('line-reader');
let fetch = require('node-fetch');
let links = [];
let promisesFilesArray = [];

function getStatusCode(url) {
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
lines('README.md')
  .then(files => {
    console.log(files)
    files.forEach(function(element) {
      promisesFilesArray.push(getStatusCode(element.href));
    })
    Promise.all(promisesFilesArray)
    .then((response) => {
     for(i=0;i<files.length;i++) {
       files[i].statusText = response[i].statusText;
       files[i].statusCode = response[i].status;
     }
     return files;
    })
    .then((response) => {
     let unique = 0;
     let broken = 0;
     let total = 0;
     let links = [];
     files.forEach(function(element) {
       total++;
       if(element.statusText === 'Fail') {
         broken++;
       }
       links.push(element.href);
       console.log(element.fileName + "\t" +element.lineNumber+" "+element.href+" "+element.text+" "+element.statusCode+'/'+element.statusText)
     });
     unique = links.filter(function(item, index, array) {
       return array.indexOf(item) === index;
     });
     console.log('unique:'+unique.length+', broken:'+broken+', total:'+ total)
    })
  })

module.exports = lines;
