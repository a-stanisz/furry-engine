const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
      res.write('<html>');
      res.write('<head><title>Enter a message</title></head>');
      res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
      res.write('</html>');
      return res.end();

  }
//   process.exit();
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, () => {
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
      });
    })
  };
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>A HTML Page generated from Node.js</title></head>');
  res.write('<body><h1>Hello from a Node.js server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);