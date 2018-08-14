#!/usr/bin/env node
let fetch = require('node-fetch');
let fs = require('fs');
const path = require('path');

var dir = '..';
fs.readdir(dir, (err, files) => {
	var r = [];
	files.forEach((file) => {
		s(file);
		function s(file){
			fs.stat(dir + '/' + file, (err, stat) => {
				if(err){console.error(err);return;}
				if(stat.isDirectory())r.push({f:file, type: 'dir'});
				else if(stat.isFile())r.push({f:file, type: 'file'});
				else r.push(0);
				if(r.length == files.length){
					r.filter((m) => {return m;});
					console.log(r);
				}
			});
		}
	});
});
const mdLinks = (dir) => {
  let stats = fs.statSync(dir);
  if(stats.isFile()) {
    var valor = dir,
        archivo = valor.substr(valor.lastIndexOf("\\") + 1);
    if (/[a-z\d\-_\.]+\.md/gi.test(archivo))
        console.log("Es un archivo markdown");
    else
        console.log("No es un archivo markdown");

  } else {
    console.log('is a directory')
  }
}
options = {
  validate : true,
  stats : true
};
mdLinks(dir);
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
// module.exports = mdLinks;
