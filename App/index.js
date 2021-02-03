/*
 *
 * Primary file for API
 *
 */

// Dependencies
const http = require("http");
const url = require("url");

// The server should respond to requests with a string
const server = http.createServer((req, res) => {
  // Get url and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Send response
  res.end("Hello World\n");

  // Log the request path
  console.log("Request recieved on path: " + trimmedPath);
});

// Start server, listen on port 3000
server.listen(3000, () => {
  console.log("The server is listening on port 3000");
});
