
var crypto	 = require("crypto")
var path     = require("path");
var fs = require('fs');
var config = require('../config/main.json');
var neocp = require('../middleware/neo_complier');

exports.visit = function*(){
	return this.body = {retcode:0};
}
/*
	{
		cmd
		code_data
	}
*/
exports.on_upload_contract = function(socket,packet){

	var temp_folder = __dirname+'/../../temp_contract_upload_folder/';
	var complier_id = Date.now();
	var temp_file_name = 'temp_' + complier_id + '.cs';
	var final_file_abs = temp_folder + '/' + temp_file_name;
	fs.writeFile(final_file_abs,packet.code_data,function(err,res){
		console.log('write',final_file_abs,'done');
		var complier_log = function(data){
			var packet = {};
			packet.cmd = 'log_print';
			packet.data = data;
			socket.send(JSON.stringify(packet));
		}

		neocp.complier_contract_avm(complier_id,final_file_abs,complier_log);

	});


}

