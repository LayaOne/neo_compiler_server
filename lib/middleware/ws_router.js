var wsRouter = {};

wsRouter.hash = []
wsRouter.route = function(cmd, listen){
    var single_rule = {};
    single_rule.cmd = cmd;
    single_rule.callback = listen
    wsRouter.hash.push(single_rule);
}

wsRouter.onMessage = function(data){


    var socket = this;

    var packet = undefined;
    console.log(data);
    try{
        packet =  JSON.parse(data);
    }
    catch(e){
        console.log('wrong format msg');
        return;
    }
   

    if(!packet.cmd){
        console.log('wrong format msg');
    }

    for(var i=0; i< wsRouter.hash.length; ++i){
        var single_rule = wsRouter.hash[i];
        if(single_rule.cmd == packet.cmd){
            single_rule.callback(socket,packet);
        }
    }
}

module.exports = wsRouter;