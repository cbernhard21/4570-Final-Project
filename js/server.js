//script for Node server
'use strict'

const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {

  //checks the request url and sends the needed file, either the html, css, image or JS
  switch (req.url) {
    //HTML files
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream('./index.html').pipe(res);
      break;

    case '/index.html':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream('./index.html').pipe(res);
      break;

    case '/login.html':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream('./login.html').pipe(res);
      break;

    case '/register.html':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream('./register.html').pipe(res);
      break;

    case '/thanks.html':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream('./thanks.html').pipe(res);
      break;
    case '/profile.html':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream('./profile.html').pipe(res);
      break;

    case '/products.html':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream('./products.html').pipe(res);
      break;

    case '/checkout.html':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream('./checkout.html').pipe(res);
      break;

    case '/cart.html':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream('./cart.html').pipe(res);
      break;
      //end HTML files

      //CSS files
    case '/css/acme_styles.css':
      res.writeHead(200, { 'Content-Type': 'text/css' });
      fs.createReadStream('./css/acme_styles.css').pipe(res);
      break;
      //end CSS files

      //image files
    case '/images/Acme_logo.png':
      res.writeHead(200, { 'Content-Type': 'image/png' });
      fs.createReadStream('./images/Acme_logo.png').pipe(res);
      break;
      //end image files

      //javascript files
    case '/js/register.js':
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      fs.createReadStream(__dirname + '/register.js').pipe(res);
      break;

    case '/js/login.js':
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      fs.createReadStream(__dirname + '/login.js').pipe(res);
      break;

    case '/js/profile.js':
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      fs.createReadStream(__dirname + '/profile.js').pipe(res);
      break;

    case '/js/products.js':
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      fs.createReadStream(__dirname + '/products.js').pipe(res);
      break;

    case '/js/cart.js':
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      fs.createReadStream(__dirname + '/cart.js').pipe(res);
      break;
      //end JS files

      //JSON file
    case '/products.json':
      res.setHeader('Content-Type', 'application/json');
      //get json data from file
      const data = fs.readFileSync('./products.json')
      const products = JSON.parse(data);
      //send json data to the browser
      res.end(JSON.stringify(products));
      break;

      //404 file
    default:
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream('./404.html').pipe(res);
  }
})

server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
})