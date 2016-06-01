#!/usr/bin/env node

/*
 testing
 nc localhost 5555
 nc -z localhost 5555
*/

var os=require('os')
var net = require('net');
//console.log("net:");
//console.log(net);

function connect_cb() {
    console.log("connect cb");
    //console.log(clientsock);
    clientsock.write("ABC");
}

opts = { host: "localhost",
         port: 5555
};
var clientsock = net.connect(opts);

clientsock.on('connect', connect_cb);
clientsock.on('end', function (x) {
    console.log("end cb,"+x);
    //console.log(clientsock);
});
clientsock.on('finish', function (x) {
    console.log("finish cb,"+x);
    //console.log(clientsock);
});

//console.log("clientsock:");
//console.log(clientsock);
