#!/usr/bin/env node
let request = require('request');
// to start  with the node executable because is referenced in bin
console.log('its ok')
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
  request(url, function (error, response) {
    console.log('error:', error); // Print the error if one occurred
    if(200 <= response.statusCode && response.statusCode <400) {
      console.log(url + ' es una url valida')
    } else {
      console.log(url + ' esta rota')
    }
  });
});
