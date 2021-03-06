'use strict';
const api = "https://api.nel.group/api/testnet";

function makeRpcUrl (url, method, _params) {
    if (url[url.length - 1] != '/')
        url = url + "/";
    var urlout = url + "?jsonrpc=2.0&id=1&method=" + method + "&params=[";
    for (var i = 0; i < _params.length; i++) {
        urlout += JSON.stringify(_params[i]);
        if (i != _params.length - 1)
            urlout += ",";
    }
    urlout += "]";
    return urlout;
}

function makeRpcPostBody (url,method, _params){
    var body = {};
    body["jsonrpc"] = "2.0";
    body["id"] = 1;
    body["method"] = method;
    var params = [];
    for (var i = 0; i < _params.length; i++)
    {
        params.push(_params[i]);
    }
    body["params"] = params;
    return body;
}

async function get(method, ..._params) {
    var str = makeRpcUrl(api, method,_params);
    var result = await fetch(str, { "method": "get" });
    var json = await result.json();
    var r = json["result"];
    return r;
}

async function post(method, ..._params) {
    var postdata = makeRpcPostBody(api, method,_params);
    var result = await fetch(api, { "method": "post" ,"body":JSON.stringify(postdata)});
    var json = await result.json();
    var r = json["result"];
    return r;
}
