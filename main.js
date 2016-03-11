var http = require("http");
var fs = require('fs');
http.createServer( function(request, response) {
 response.writeHead(200, {'Content-Type': 'text/html'});
 fs.readFile('index.html', function(err, content) {
 	 	response.end(content);
 }); 
}).listen(8080);
console.log('Server running at http://localhost:8080/');

var EventEmitter = require('events').EventEmitter;
var logger = new EventEmitter();
logger.on('error', function(message) {
	console.log('Error: ' + message);
});
logger.emit('error', 'Something went wrong');

var server = http.createServer();
server.on('request', function(request, response) {
	fs.readFile('index.html', function(err, contents) {
		if (err) {
			response.writeHead(500, 'text/plain');
			logger.emit('error', err);
			response.end(err);
		} else {
			response.writeHead(200, 'text/html');
			response.end(contents);
		}
	})
}); 

server.on('close', function() {
	console.log('Server shutting down...');
});
