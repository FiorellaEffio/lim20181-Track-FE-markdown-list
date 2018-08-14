#!/usr/bin/env node
// Grab provided args
const [,, ... args] = process.argv
// Print hello world provided args
console.log(`hello ${args}`)
