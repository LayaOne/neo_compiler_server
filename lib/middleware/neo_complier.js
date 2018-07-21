var exec = require('child_process').exec;
var NEOComplier = {};
var script_path = __dirname+'/../../gen_temp_neo_contract.sh';
var output_path = '/home/ubuntu/neo_workspace/avm_output/';
var before_project = 'neo_temp_project_';
var fs = require('fs');


NEOComplier.complier_contract_avm = function(project_name, contract_path,log_print){
    var cmd = 'sh ' + script_path + ' ' + project_name + ' ' + contract_path;
    console.log('exec',cmd);
    var script_child = exec(cmd);
    script_child.stdout.on('data',function(data){
        console.log(data);
        if(log_print){
            log_print(data);
        }
    })
    script_child.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
        if(log_print){
            log_print('ERROR:' + data);
        }
      });

    script_child.on('close', function(code) {
        console.log('closing code: ' + code);
        if(fs.existsSync(output_path+before_project+project_name+'.avm') == true){
            console.log('文件存在，生成成功')
        }
        else{
            console.log('文件不存在')
        }
        
    });

  
}

module.exports  = NEOComplier;