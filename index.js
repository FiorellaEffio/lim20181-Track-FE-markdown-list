const Logger = require('logplease');
const logger = Logger.create('utils');
logger.debug(`Hola Mundo de Node`);
logger.log(`ñoo`); // alias for debug()
logger.info(`Información de ultimo momento`);
logger.warn(`Tirando warnings como campeones`);
logger.error(`Algo no esta bien`);
let fetch = require('node-fetch');
let fs = require('fs');
const path = require('path');
const marked = require('marked');
let files = [];
let path1 = "..";
//funcion para ver si es archivo o carpeta
const validatePath = (path) => {
  //verificamos que la ruta es valida
  try {
    require('fs').accessSync(path)
    validateFileOrDirectory(path);
    return true;
  } catch (e) {
    console.log("ruta no valida");
  }
}
const validateFileOrDirectory = (path) => {
  let stats = fs.statSync(path);
  if(stats.isFile()) {
    console.log(path.slice(path.length-3, path.length))
    if(".md" === path.slice(path.length-3, path.length)) {
      fileStats = {path, links : []};
      files.push(fileStats);
      console.log('Es un archivo markdown');
      console.log(files)
    } else {
      console.log('No es markdown');
    }
  } else {
    return obtainFilesMDFromDirectory(path);
  }
}
//funcion para extraer archivos md de carpeta
const obtainFilesMDFromDirectory = (path) => {
  console.log('obteniendo archivos')
  fs.readdir(path, (err, files) => {
  console.log(files)
  if(files !== undefined) {
    files.forEach((file) => {
      validateFileOrDirectory(path + "/" + file);
  	 });
  }
  });
}
//funcion que valida el status code de una url
const urlValidateStatus = (url) => {
  fetch(url)
    .then(function(response) {
      console.log(response.statusText);
      return response.status;
    })
}
validatePath(path1)
// module.exports = mdLinks;
