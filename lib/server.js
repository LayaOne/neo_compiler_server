var path = require("path");

var koa = require("koa");
var websockify = require('koa-websocket');



var serve       = require("koa-static");
var	router 	    = require("koa-router")();
var	views 		= require("koa-views");
var	validate	= require("koa-validate");
var	session     = require("koa-session");
var	koaBody 	= require("koa-body");
var logger 		= require('./middleware/logger');
var mongoose    = require("./middleware/mongoose");

var wsServer = require('./middleware/ws_server');


var	app = koa();
var socket = websockify(app);



var normalController = require('./controllers/normal_controller');





module.exports = function(config){


	var componentsConfig = config["components"]



	app.use(serve(__dirname + "/../../neo_workspace/avm_output"));
	app.use(views(path.join(__dirname,"/../views"),{default:"ejs",map:{html:"html"}}));

	app.use(koaBody());
	app.use(validate());

	app.keys = ["nimeide"];

	app.use(session(app));
	app.use(logger());



	app.use(function*(next){
		yield next;
		this.set("Access-Control-Allow-Origin","*");
		this.set("Access-Control-Allow-Methods","POST, GET, OPTIONS");
		this.set("Access-Control-Allow-Headers","XMLHttpReqeust, access_token,Content-Type");
	})



	app.use(function *(next) {
	  try {
	    yield next;
	  } catch (err) {
	    this.status = err.status || 500;
	    this.body = err.message;
	    this.app.emit('error', err, this);
	  }
	});


    
	app.use(router.routes()).use(router.allowedMethods());



	var ws_server = new wsServer();
	ws_server.start();

	console.log('NEO Complier ENV server start');




	return app;
}
