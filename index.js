#!/usr/bin/env node
let request = require('request');
let fetch = require('node-fetch');

// const mdLinks = (path, options) => {
//
// }
// module.exports = mdLinks;
// options = {
//   validate : true,
//   stats : true
// };
urlLinks = ['https://www.google.com', 'https://www.facebook.com'];
urlLinks.forEach(function(url) {
  fetch(url)
    .then(function(response) {
      return response.status;
    })
    .then(function(status) {
      console.log(status);
    });
});
