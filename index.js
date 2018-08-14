let fetch = require('node-fetch');
let fs = require('fs');
const path = require('path');
const marked = require('marked');

let dir = 'README.md';
const mdLinks = (dir) => {
  let stats = fs.statSync(dir);
  if(stats.isFile()) {
    var valor = dir,
        archivo = valor.substr(valor.lastIndexOf("\\") + 1);
    if (/[a-z\d\-_\.]+\.md/gi.test(archivo))
        { fs.readFile(dir, 'utf8', function(err, contents) {
              console.log(contents[10]);
          });
          console.log("Es un archivo markdown");}
    else
        {console.log("No es un archivo markdown");}

  } else {
    console.log('is a directory')
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
    					r.forEach((file1) =>{
                console.log(file1);
              });
    				}
    			});
    		}
    	});
    });
  }
}
mdLinks(dir);
//funcion que valida el status code de una url
const urlValidateStatus = (url) => {
  fetch(url)
    .then(function(response) {
      console.log(response.statusText);
      return response.status;
    })
    .then(function(status) {
      console.log(status);
    });
}
urlValidateStatus('https://www.google.com');
// module.exports = mdLinks;
