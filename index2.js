let fetch = require('node-fetch')

function getStatusCode(url) {
  return new Promise((resolved, reject) => {
    fetch(url)
      .then(function(response) {
        resolved(response);
      })
      .catch(function(error) {
        resolved({status:'', statusText:'Fail'});
      });
  })
}

promisesFilesArray = [];
files.forEach(function(element) {
  promisesFilesArray.push(getStatusCode(element.href));
})
//
Promise.all(promisesFilesArray)
  .then((response) => {
    for(i=0;i<files.length;i++) {
      files[i].statusText = response[i].statusText;
      files[i].statusCode = response[i].status;
    }
    return files;
  })
  .then((response) => {
    let unique = 0;
    let broken = 0;
    let total = 0;
    let links = [];
    files.forEach(function(element) {
      total++;
      if(element.statusText === 'Fail') {
        broken++;
      }
      links.push(element.href);
      console.log(element.fileName + "\t" +element.lineNumber+" "+element.href+" "+element.text+" "+element.statusCode+'/'+element.statusText)
    });
    unique = links.filter(function(item, index, array) {
      return array.indexOf(item) === index;
    });
    console.log('unique:'+unique.length+', broken:'+broken+', total:'+ total)
  })
