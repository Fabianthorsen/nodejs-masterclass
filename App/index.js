/*
 *
 * Primary file for API
 *
 */

// Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const config = require('./config');

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
  const decoder = new StringDecoder('utf8');
  let buffer = '';

  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();

    // Choose the handler this request should go to. If not found then use notFound handler
    const chosenHandler = router[trimmedPath] || handlers.notFound;

    // Construct the data object to send to the handler
    const data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer,
    };

    // Route the request specified in the router
    chosenHandler(data, function (statusCode, payload) {
      // Use the status code called back by the handler, or default to 200
      statusCode = typeof statusCode == 'number' ? statusCode : 200;

      // Use the payload called back by the handler, or default to empty object
      payload = typeof payload == 'object' ? payload : {};

      // Convert the payload to a string
      const payloadString = JSON.stringify(payload);

      // Return response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path
      console.log('Request this respnse: ', statusCode, payloadString);
    });
  });
});

// Start server
server.listen(config.port, () => {
  console.log(
    'The server is listening on port ' +
      config.port +
      ' in ' +
      config.envName +
      ' mode.'
  );
});

// Define handlers
const handlers = {};

// Sample handler
handlers.sample = (data, callback) => {
  // Callback a http status code, and a payload object
  callback(406, { name: 'Sample handler' });
};

// Not found handler
handlers.notFound = (data, callback) => {
  callback(404);
};

// Define a request router
const router = {
  sample: handlers.sample,
};
