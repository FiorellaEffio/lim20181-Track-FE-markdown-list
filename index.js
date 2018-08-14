const par = require('./numeros')
const ispar = par(201)
console.log(par)
console.log(ispar);
const Logger = require('logplease');
const logger = Logger.create('utils');
logger.debug(`Hola Mundo de Node`);
logger.log(`ñoo`); // alias for debug()
logger.info(`Información de ultimo momento`);
logger.warn(`Tirando warnings como campeones`);
logger.error(`Algo no esta bien`);
const saludar = (nombre, apellido, callback) => {
  console.log('Hola ' + nombre + ' ' + apellido);
}
const callback = () => {
  console.log('Luego de saludar se ejecuta el callback');
}
saludar('fiorella','effio', callback())
