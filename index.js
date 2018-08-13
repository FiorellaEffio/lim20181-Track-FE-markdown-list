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
  console.log(url);
  request(url, function (error, response) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  });
});
