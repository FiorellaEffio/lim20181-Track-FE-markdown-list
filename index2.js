let fetch = require('node-fetch')

function getStatusCode(url) {
  return new Promise((resolved, reject) => {
    fetch(url)
      .then(function(response) {
        resolved(response.status);
      })
  })
}

let files = [
  {fileName:'test/uno.md', lineNumber:1, href:'https://www.google.com.pe', text:'[Markdown]'},
  {fileName:'test/uno.md', lineNumber:2, href:'https://www.google.com.pe', text:'[Google]'},
  {fileName:'test/dos.md', lineNumber:3, href:'https://www.google.com.pe', text:'[Facebook]'},
  {fileName:'test/dos.md', lineNumber:4, href:'https://www.google.com.pe', text:'[Twiiter]'},
  {fileName:'tres.md', lineNumber:5, href:'https://www.google.com.pe', text:'[Laboratoria]'},
  {fileName:'tres.md', lineNumber:6, href:'https://www.google.com.pe', text:'[Fiorella]'}
];
promisesFilesArray = [];
files.forEach(function(element) {
  promisesFilesArray.push(getStatusCode(element.href));
})
//
Promise.all(promisesFilesArray)
  .then((response) => {
    for(i=0;i<files.length;i++) {
      files[i].status = response[i];
    }
    return files;
  })
  .then((response) => console.log(response))
