const Logger = require('logplease');
const logger = Logger.create('utils');
const lineReader = require('line-reader');
// logger.log(`ñoo`); // alias for debug()
// logger.info(`Información de ultimo momento`);
// logger.warn(`URL sin respuesta`);
logger.debug(`URL válida`);
logger.error(`URL sin respuesta`);
let fetch = require('node-fetch');
let fs = require('fs');
const path = require('path');
let files = [];
let path1 = "test";
//funcion para ver si es archivo o carpeta
const validatePath = (path) => {
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
      let links = [];
      console.log(path)
      let lineno = 0;
      lineReader.eachLine(path, function(line, last) {
        lineno++;
        console.log(lineno)
        url = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if(url !== null) {
          console.log(line);
          console.log(url[2]);
          href = url[2];
          links.push({lineno, href});
          links.push('hola')
          let fileStats = {path, links};
          console.log(fileStats)
          files.push(fileStats);
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
//funcion que valida el status code de una url
const urlValidateStatus = (url) => {
  fetch(url)
    .then(function(response) {
      console.log(response.statusText);
      return response.status;
    })
}
validatePath(path1);
// module.exports = mdLinks;
