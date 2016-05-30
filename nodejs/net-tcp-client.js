#!/usr/bin/env node

var os=require('os')
var net = require('net');
console.log("net:");
console.log(net);

function connect_cb() {
    console.log("connect cb");
}

opts = { host: "localhost",
         port: 5555
};
var clientsock = net.connect(opts);

clientsock.on('connect', connect_cb);

console.log("clientsock:");
console.log(clientsock);
