let lineNumber = 0;
lineReader.eachLine(path, function(line, last) {
  lineNumber++;
  url = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if(url !== null) {
    file = path;
    text = url[1]
    href = url[2];
    links.push({lineNumber, text, href});
    let fileStats = {file, links};
    console.log(fileStats)
    files.push(fileStats);
    console.log(files)
  }
  if (last) {
    return false; // stop reading
  }
});

let links = [{href:'https://www.google.com.pe', lineNumber: 3, file: 'test'},
  {href:'https://developer.mozilla.org/es/docs/Web', lineNumber:7,file:'test'}];

function getLinks() {
  return new Promise((resolved, reject) => {
    setTimeout(()=>{
      resolved(links)
    }, 1000)
  })
}

function getStatusCode(links) {
  return new Promise((resolved, reject) => {
    links.forEach(function(element) {
      console.log(element.href);
      fetch(element.href)
      .then(function(response) {
        console.log(response)
        element.statusCode = response.status;
        element.url = response.url
      })
    });
    resolved(links);
  })
}
