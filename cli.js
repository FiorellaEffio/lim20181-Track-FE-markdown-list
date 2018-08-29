#!/usr/bin/env node
// Grab provided args
const {lines, getStatusCode, mdLinks} = require('./index.js');
const [,, ... args] = process.argv;
var colors = require('colors');
let myFuncionLinks;
let promisesFilesArray = [];
let promisesArchivosMDArray = [];
let fs = require('fs');
let options;
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
  if(pathBoolean === true) {
    if(args.length === 1) {
      options = {validate:false, stats:false};
      myFuncionLinks = mdLinks(args[0], options);
    } else if (args.length === 2) {
      switch (args[1]) {
        case '--validate':
          options = {validate:true, stats:false};
          myFuncionLinks = mdLinks(args[0],options)
          break;
        case '--stats':
          options = {validate:false, stats:true};
          myFuncionLinks = mdLinks(args[0],options);
          break;
        case '--v':
          options = {validate:true, stats:false};
          myFuncionLinks = mdLinks(args[0],options)
          break;
        case '--s':
          options = {validate:false, stats:true};
          myFuncionLinks = mdLinks(args[0],options)
          break;
        default:
          options = {validate:false, stats:false, process:false};
          myFuncionLinks = mdLinks('test', options);
          console.log("no existe esa opcion");
          break;
      }
    }  else if (args.length ===3) {
      if((args[1] === '--v' || args[1] === '--validate') && (args[2] === '--s' || args[2]==='--stats')) {
        options = {validate:true, stats:true};
        myFuncionLinks = mdLinks(args[0],options)
      }
      if((args[2] === '--v' || args[2] === '--validate') && (args[1] === '--s' || args[1]==='--stats')) {
        options = {validate:true, stats:true};
        myFuncionLinks = mdLinks(args[0],options)
      }
    }
  } else {
    options = {validate:false, stats:false, process:false};
    myFuncionLinks = mdLinks('test', options);
    console.log("no existe la ruta")
  }
} else {
  options = {validate:false, stats:false, process:false};
  myFuncionLinks = mdLinks('test', options);
  console.log('Demasiados argumentos, máx2');
}

myFuncionLinks.then((archivosMD) => {
  archivosMD.forEach(function(archivo) {
    promisesArchivosMDArray.push(lines(archivo));
  })
  return promisesArchivosMDArray;
})
.then((response) => {
  if(options.process !== false) {
    Promise.all(response)
      .then((links) => {return links[promisesArchivosMDArray.length-1];})
      .then((links) => {
        if(options.validate === false && options.stats === false) {
          links.forEach((element)=>{
            console.log(element.fileName.green +"\t"+ element.lineNumber+"\t"+ element.href.underline.blue +"\t"+ element.text)
          })
        } else {
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
          .then((links) => {
            if(options.validate === true && options.stats === false) {
              links.forEach((element)=>{
                console.log(element.fileName.green +"\t"+ element.lineNumber+"\t"+ element.href.underline.blue +"\t"+ element.statusCode+"\t"+ element.statusText+"\t"+ element.text)
              })
            } else if (options.stats === true) {
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
              console.log('Unique: ' + unique.length);
              console.log('Total: ' + total);
              if(options.validate === true) {
                console.log('Broken: ' + broken);
              }
            }
          })
        }
      })
  }
})
