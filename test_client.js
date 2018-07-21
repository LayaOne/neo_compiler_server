var Worker = require('./client/worker');

Worker.init(function(){

    //注册log回调
    Worker.regist_websocket_callback('log_print',complie_log);

    //注册编译成功回调
    Worker.regist_websocket_callback('complie_done',onComplieSuceess);

    //编译合约
    Worker.complier_contract('./demo_contract.cs');

})


function complie_log(packet){
    console.log(packet.data);
}

function onComplieSuceess(packet){
    console.log('编译完成',packet.data);
    if(packet.data.code == 0){


        //下载编译结果avm
        Worker.download_avmFile(packet.data.avm_url,'./demo.avm',function(){
            console.log('编译流程完毕');
        })
    }
}