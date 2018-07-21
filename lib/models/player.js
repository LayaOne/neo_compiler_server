
var mongoose = require("mongoose"),
Schema   = mongoose.Schema;

var playerSchema = new Schema({

	token:String,
	name:{type:String,default:测试用户},
	city_level:{type:Number,default:1},
	item_list:[
		{
			item_code:String, 	//道具模板id
			item_number:Number,
		}
	],

	worker_list:[
		{
			worker_id:String,
			worker_number:Number,
		}
	],



})

playerSchema.statics.findPlayerByToken = function(token){
	return this.findOne({token:token}).exec();
}