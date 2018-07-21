var Worker = {};
var ws = require('ws');
var fs = require('fs');
var request = require('request');
var WSURL = 'ws://neo.loocall.com/ws'
Worker.ws_client = undefined;
Worker.callback_pool = [];






/**
    注册socket回调信息，例如编译日志，编译完成等
    * @param {string} cmd Paket的命令
    * @param {function} handler 处理函数
*/
Worker.regist_websocket_callback = function(cmd,handler){
    var single_callback_rule = {};
    single_callback_rule.cmd = cmd;
    single_callback_rule.handler = handler;
    Worker.callback_pool.push(single_callback_rule);
}



/**
 *  初始化，连接远程编译 socket
 *  @param {function} finish_callback 连接成功后回调
 */
   

Worker.init = function(finish_callback){
    Worker.ws_client = new ws(WSURL);
    Worker.ws_client.on('open',function(){
        Worker.bconnect = true;
        if(finish_callback){
            finish_callback();
        }
    })

    /*
        一些回调
    */
    Worker.ws_client.on('message',function(data){
        var packet;
        try{
            var packet = JSON.parse(data);
            if(packet.cmd == undefined){
                console.log('wrong server format');
                return;
            }

            var bhandle = false;
            for(var i = 0; i < Worker.callback_pool.length; ++i){
                var single_woker_cb = Worker.callback_pool[i];
                if(single_woker_cb.cmd == packet.cmd ){
                    single_woker_cb.handler(packet);
                    bhandle  = true;
                }
            }
            
            //默认Handler
            if(bhandle == false){
                switch(packet.cmd){

                    //打印编译Log
                    case 'log_print' : {
                        console.log(packet.data);
                    }
                    break;
    
                    //编译完成
                    case 'complie_done' : {
                        console.log('编译完成');
                    }
                    break;
    
    
                }
            }
            
        }catch(e){
            console.log(data,'cant parse')
        }

    })
}

/** 
    * 下载avm
    * @param {string} url 下载地址
    * @param {string} filename 文件名
    * @param {function} callback 完成回调
*/
Worker.download_avmFile = function(url , filename,callback){
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', callback); 
}


/*
    编译合约，传入 *.cs 路径
*/
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