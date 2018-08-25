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
