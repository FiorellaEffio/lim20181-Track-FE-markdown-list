#!/usr/bin/env node
// Grab provided args
const {lines, getStatusCode, mdLinks} = require('./index.js');
const [,, ... args] = process.argv;
let promisesFilesArray = [];
let promisesArchivosMDArray = [];
var fs = require('fs');
const validatePath = (path) => {
  try {
    require('fs').accessSync(path)
    return true;
  } catch (e) {
    return false;
  }
}
// Print hello world provided args
if(args.length<=3){
  let pathBoolean = validatePath(args[0]);
  console.log(pathBoolean)
  if (args.length == 0) {
    mdLinks('test')
     .then((archivosMD) => {
       console.log(archivosMD)
       archivosMD.forEach(function(archivo) {
         promisesArchivosMDArray.push(lines(archivo));
       })
       return promisesArchivosMDArray;
     })
     .then((response) => {
       Promise.all(response)
         .then((links) => {return links[promisesArchivosMDArray.length-1];})
         .then((links) => {
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

  }
  if (args.length == 1 && pathBoolean === true) {
    mdLinks(args[0]);
  }
  if (args.length == 2 && pathBoolean === true) {
    if(args[1] === "--validate" || args === "--v") {
      mdLinks(args[0],{validate:true});
    }
    if(args[1] === "--stats" || args === "--s") {
      mdLinks(args[0],{stats:true});
    }
  }
  if(args.length == 3 && pathBoolean === true) {
    if(((args[1]==="--validate" || args[1] ==="--v" )&& (args[2]==="--stats" || args[2]==="--s")) || ((args[2]==="--validate" || args[2] ==="--v" )&& (args[1]==="--stats" || args[1]==="--s"))) {
      mdLinks(args[0], {validate:true, stats:true})
    }
  }
} else {
  console.log('Demasiados argumentos, máx2');
}
