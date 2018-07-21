const WebSocket = require('ws')
var config = require('../config/main.json');
var wsRouter = require('./ws_router');


function WsServer() {
  this.wss = null
}

WsServer.prototype.start = function() {

  let opts = {
    port: config.components.websocket.wsport,
    backlog: 256
  }
  this.wss = new WebSocket.Server(opts)
  this.wss.on('listening', this.onStarted.bind(this))
  this.wss.on('error', this.onError.bind(this))
  this.wss.on('connection', this.onConnection.bind(this))

  var handler = require('../controllers/normal_controller');
  wsRouter.route('upload_contract',handler.on_upload_contract);

}


/**
 * 在线连接数
 */
WsServer.prototype.online = function() {
  // TODO
  return 0
}

WsServer.prototype.onStarted = function() {
  console.info("ws server started")
}

WsServer.prototype.onError = function(err) {
  console.error("ws server error:", err)
  app.exit(100)
}

/**
 * 当有新的连接
 * @param {socket|object} socket 客户端socket
 * @param {*} request 
 */
WsServer.prototype.onConnection =  async function(socket, request) {
    console.log("player enter")
    socket.on('message',wsRouter.onMessage.bind(socket));
}


module.exports = WsServer
