var app = require("./lib/server");
var config = require("./lib/config/main.json");
app(config).listen(config["port"]);
