#!/usr/bin/env node

var fs = require('fs');

file_or_dir = process.argv[2];
// "The recursive option is only supported on OS X and Windows.", encoding : 'utf8'
obj = { persistent : true };
fs.watch(file_or_dir, obj, function (event, file) {
    console.log("fs.watch event=%s file=%s", event, file);
});
console.log("fs.watch:" + file_or_dir);

obj2 = { persistent : true, interval : 3000 };
fs.watchFile(file_or_dir, obj, function (curr, prev) {
    console.log("fs.watchFile prev=");
    console.log(prev);
    console.log("fs.watchFile curr=");
    console.log(curr);
});
console.log("fs.watchFile:" + file_or_dir);
