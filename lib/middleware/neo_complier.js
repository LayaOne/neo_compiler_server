var exec = require('child_process').exec;
var NEOComplier = {};
var script_path = __dirname+'/../../gen_temp_neo_contract.sh';

NEOComplier.complier_contract_avm = function(project_name, contract_path){
    var cmd = 'sh ' + script_path + ' ' + project_name + ' ' + contract_path;
    console.log('exec',cmd);
    var script_child = exec(cmd);
    script_child.stdout.on('data',function(data){
        console.log(data);
    })
    script_child.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
      });

    child.on('close', function(code) {
        console.log('closing code: ' + code);
    });

  
}

module.exports  = NEOComplier;