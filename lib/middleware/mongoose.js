/**
*  实现操作mongodb的中间件
**/

var mongoose = require('mongoose'),
	fs		 = require("fs"),
	path 	 = require("path");

module.exports = function (config){

	mongoose.connect(config.uri,config.options);

/*
	var modelPath = __dirname+"/../models";

	dir = fs.readdirSync(modelPath);
	dir.forEach(function(i){
		if(i == ".DS_Store")
			return;

		var ms = require("../models/"+i)
		var modelName = path.basename(i,".js");
		mongoose.model(modelName,ms);
	});
*/
	

	return function *(next){
		this.mongoose = mongoose;

		yield next;
	}
}