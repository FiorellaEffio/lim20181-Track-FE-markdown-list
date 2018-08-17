#!/usr/bin/env node
// Grab provided args
const mdLinks = require('./index.js')
const [,, ... args] = process.argv
// Print hello world provided args
console.log(args.length)
if(args.length<=2){
  if(args.length == 0) {
    mdLinks('.');
  } 
} else {
  console.log('Demasiados argumentos, máx2');
}
