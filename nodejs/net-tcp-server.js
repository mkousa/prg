#!/usr/bin/env node

var os = require('os');
var net = require('net');
//console.log("net:");
//console.log(net);

function listen_cb() {
    console.log("listen cb");
}

function connection_cb(socket) {
    client = socket;
    //console.log("connection cb, socket:", socket);
    console.log("connection cb");
    socket.write(Date() + " uptime=" + os.uptime() + "\n");
    server.getConnections(function (err, count) {
        if (err) {
            console.log("getConnections, err=" + err);
        } else {
            socket.write("getConnections=" + count + "\n");
        }
    });

    socket.on('data', socket_data_cb);
    socket.on('close', socket_close_cb);
    socket.on('error', socket_error_cb);
    //server.close(close_cb);
}

function close_cb() {
    console.log("close cb, closing server");
}

function error_cb(err) {
    console.log("error cb");
    console.log(err);
}

function socket_data_cb(data) {
    console.log("socket data cb:");
    console.log(data);
    if (client)
        client.write("len=" + data.length +"\n");
}

function socket_close_cb(err) {
    console.log("socket close cb, err=" + err);
}

function socket_error_cb(err) {
    console.log("socket error cb");
    console.log(err);
}

var server = net.createServer();
server.on('connection', connection_cb);
server.on('close', close_cb);
server.on('error', error_cb);
server.listen(5555, listen_cb);
//console.log("server:");
//console.log(server);
