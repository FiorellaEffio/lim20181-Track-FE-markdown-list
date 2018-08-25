

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
