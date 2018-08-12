var fs = require('fs');
var http = require('http');
//rutas de archivo
var path = require('path');

function iniciar(){
  http.createServer(function(request,response){
    fs.readFile(path.join(__dirname 'public', request.url), function(error, content){
      if(error && error.code === 'ENOENT'){
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write('La pagina no existe');
      } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(content);
      }
        response.end();
    });
  }).listen(8080, function(){
    console.log("server is in " + "http://localhost:8080")
  });
}
exports.iniciar = iniciar;
