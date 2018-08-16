#!/usr/bin/env node
// Grab provided args
const mdLinks = require('./index.js')
const [,, ... args] = process.argv
// Print hello world provided args
console.log(args)
mdLinks(args[0]);
