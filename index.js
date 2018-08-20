const Logger = require('logplease');
const logger = Logger.create('utils');
const lineReader = require('line-reader');
let fetch = require('node-fetch');
let fs = require('fs');
const path = require('path');
let files = [];
//funcion para ver si es archivo o carpeta
const validatePath = (path) => {
  try {
    fs.accessSync(path)
    validateFileOrDirectory(path);
    console.log(files)
    return true;
  } catch (e) {
    console.log("ruta no valida");
  }
}
const validateFileOrDirectory = (path) => {
  let stats = fs.statSync(path);
  if(stats.isFile()) {
    if(".md" === path.slice(path.length-3, path.length)) {
      let links = [];
      let lineNumber = 0;
      lineReader.eachLine(path, function(line, last) {
        lineNumber++;
        url = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if(url !== null) {
          file = path;
          text = url[1]
          href = url[2];
          let statusCode
          fetch(href)
            .then(function(response) {
              statusCode = response.status;
              return response.status;
            })
            .then(function(response2){
              links.push({lineNumber, text, href, statusCode});
              let fileStats = {file, links};
              files.push(fileStats);
            })
            console.log(files)

        }
        if (last) {
          return false; // stop reading
        }
      });
    } else {
    }
  } else {
    return obtainFilesMDFromDirectory(path);
  }
}
//funcion para extraer archivos md de carpeta
const obtainFilesMDFromDirectory = (path) => {
  fs.readdir(path, (err, files) => {
  if(files !== undefined) {
    files.forEach((file) => {
      validateFileOrDirectory(path + "/" + file);
  	 });
  }
  });
}
//promesa mdLinks
let mdLinks = new Promise((resolve, reject) => {
  let datos = {};
  //...
  //muchas lineas de código
  //...
  if (error) {
    //uh oh, las cosas no salieron tan bien
    reject(new Error('Fallamos, lo siento'));
  }
  //...
  resolve(datos);
});

//funcion que valida el status code de una url
const urlValidateStatus = (url) => {
  fetch(url)
    .then(function(response) {
      console.log(response.statusText);
      return response.status;
    })
}
module.exports = validatePath;
