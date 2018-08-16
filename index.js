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
let path1 = "test";
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
    if(".md" === path.slice(path.length-3, path.length)) {
      fileStats = {path, links : []};
      files.push(fileStats);
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
  console.log(files.length)
}
// function mdLinks(someValue){
//     return new Promise(function(resolve, reject){
//         getData(someValue, function(error, result){
//             if(error){
//                 reject(error);
//             }
//             else{
//                 resolve(result);
//             }
//         })
//     });
// }
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
