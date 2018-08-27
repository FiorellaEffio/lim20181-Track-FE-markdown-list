#!/usr/bin/env node
// Grab provided args
const mdLinks = require('./index.js');
const [,, ... args] = process.argv;
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
console.log(args.length)
if(args.length<=3){
  if (args.length == 0) {
    mdLinks('.');
  }
  if (args.length == 1 && validatePath(args[0])==true) {
    mdLinks(args[0]);
  }
  if (args.length == 2 && validatePath(args[0])==true) {
    if(args[1] === "--validate" || args === "--v") {
      mdLinks(args[0],{validate:true});
    }
    if(args[1] === "--stats" || args === "--s") {
      mdLinks(args[0],{stats:true});
    }
  }
  if(args.length == 3 && validatePath(args[0])==true) {
    if(((args[1]==="--validate" || args[1] ==="--v" )&& (args[2]==="--stats" || args[2]==="--s")) || ((args[2]==="--validate" || args[2] ==="--v" )&& (args[1]==="--stats" || args[1]==="--s"))) {
      mdLinks(args[0], {validate:true, stats:true})
    }
  }
} else {
  console.log('Demasiados argumentos, máx2');
}
