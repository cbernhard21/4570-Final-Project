'use strict'

const http = require('http');
const fs = require('fs');
const port = 3000;
const hostname = '127.0.0.1'

//create server
const server = http.createServer(function(request, response) {
  response.setHeader('Content-Type', 'application/json');

  //get json data from file
  const data = fs.readFileSync('./products.json')
  const products = JSON.parse(data);
  console.log(products);

  //send json data to the browser
  response.end(JSON.stringify(products));
})

//start server
server.listen(port, hostname);
console.log(`server is running on http://${hostname}:${port}`)