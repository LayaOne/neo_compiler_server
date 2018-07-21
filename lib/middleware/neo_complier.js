var exec = require('child_process').exec;
var NEOComplier = {};
var script_path = __dirname+'/../../gen_temp_neo_contract.sh';

NEOComplier.complier_contract_avm = function(project_name, contract_path){
    var cmd = 'sh ' + script_path + ' ' + project_name + ' ' + contract_path;
    console.log('exec',cmd);
    exec(cmd,function(error,stdout,stderr){
        if(error){

        }
        else{
            console.log(stdout);
        }
        
    })
  
}

module.exports  = NEOComplier;