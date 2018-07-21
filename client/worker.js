var Worker = {};
var ws = require('ws');
var fs = require('fs');
var wsRouter = require('../lib/middleware/ws_router');

var WSURL = 'ws://neo.loocall.com/ws'
Worker.ws_client = undefined;



Worker.init = function(finish_callback){
    Worker.ws_client = new ws(WSURL);
    Worker.ws_client.on('open',function(){
        Worker.bconnect = true;
        if(finish_callback){
            finish_callback();
        }
    })

    Worker.ws_client.on('message',function(data){
        var packet;
        try{
            var packet = JSON.parse(data);;
            switch(packet.cmd){

                //打印编译Log
                case 'log_print' : {
                    console.log(packet.data);
                }
                break;
            }
        }catch(e){
            console.log(data,'cant parse')
        }

    })
}

Worker.complier_contract = function(path){
    if(Worker.bconnect == false){
        return;
    }

    fs.readFile(path,function(err,res){

     
        if(!err){
            var packet = {};
            packet.cmd = 'upload_contract';
            packet.code_data=res.toString();
            

            Worker.ws_client.send(JSON.stringify(packet));
            console.log('编译源文件已经发送');
        }
    })
}




module.exports = Worker;