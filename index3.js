var fs = require('fs');
var path = require('path');

function getFilesFromDir(dir) {
  var filesToReturn = [];
  function walkDir(currentPath) {
    console.log(currentPath)
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      console.log(currentPath)
      console.log(files[i])
      var currentFile = path.join(currentPath, files[i]);
      console.log(path.extname(currentFile))
      if (fs.statSync(currentFile).isFile() && path.extname(currentFile) === '.md') {
        filesToReturn.push(currentFile.replace(dir, ''));
      } else if (fs.statSync(currentFile).isDirectory()) {
       walkDir(currentFile);
      }
    }
  };
  walkDir(dir);
  return filesToReturn;
}

//print the txt files in the current directory
console.log(getFilesFromDir("test"));
