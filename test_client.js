var Worker = require('./client/worker');

Worker.init(function(){
    Worker.complier_contract('./demo_contract.cs');
})