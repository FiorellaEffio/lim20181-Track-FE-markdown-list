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
//funcion para ver si es archivo o carpeta
const validateFileOrDirectory = (path) => {
  //verificamos que la ruta es valida
  try {
    if(fs.accessSync(path)) {
      console.log("existe");
      let stats = fs.statSync(path);
      console.log(stats);
      if(stats.isFile()) {
        console.log(path.slice(path.length-3, path.length))
        if(".md" === path.slice(path.length-3, path.length)) {
          console.log('Es un archivo markdown');
          mdLinks(path);
        } else {
          console.log('No es markdown');
        }
      } else {
        return obtainFilesMDFromDirectory(path);
      }
    }
  } catch (e) {
      console.log("ruta no valida");
  }
}
validateFileOrDirectory('index.js')
//funcion para extraer archivos md de carpeta
const obtainFilesMDFromDirectory = (path) => {

};
//funcion que valida el status code de una url
const urlValidateStatus = (url) => {
  fetch(url)
    .then(function(response) {
      console.log(response.statusText);
      return response.status;
    })
}
// module.exports = mdLinks;
