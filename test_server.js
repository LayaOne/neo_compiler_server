var wsServer = require('./lib/middleware/ws_server');

var server = new wsServer();
server.start();