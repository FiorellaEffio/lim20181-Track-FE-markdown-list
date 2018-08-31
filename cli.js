#!/usr/bin/env node
// Grab provided args
const mdLinks = require('./index.js');
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

myFuncionLinks
.then((response) => {
  console.log(response);
})
