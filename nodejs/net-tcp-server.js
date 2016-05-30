#!/usr/bin/env node

var os = require('os');
var net = require('net');
console.log("net:");
console.log(net);

function listen_cb() {
    console.log("listen cb");
}

function connection_cb(socket) {
    console.log("connection cb, socket:", socket);
    socket.write(Date() + " uptime=" + os.uptime() + "\n");
}

function close_cb() {
    console.log("close cb");
}

function error_cb(err) {
    console.log("error cb, err:" + err);
}

var server = net.createServer();
server.on('connection', connection_cb);
server.on('close', close_cb);
server.on('error', error_cb);
server.listen(5555, listen_cb);
console.log("server:");
console.log(server);
