/*
 *
 * Primary file for API
 *
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to requests with a string
const server = http.createServer((req, res) => {
  // Get url and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the querystring as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toLowerCase();

  // Get headers as object
  const headers = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();

    // Send response
    res.end('Hello World\n');

    // Log the request path
    console.log('Request recieved with this payload: ', buffer);
  });
});

// Start server, listen on port 3000
server.listen(3000, () => {
  console.log('The server is listening on port 3000');
});
