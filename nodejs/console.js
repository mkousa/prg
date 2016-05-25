#!/usr/bin/env node

console.time("my timer");
console.log("console.log");
console.log("console.log format: %d %s", 123, "abc");
console.info("console.info");
console.warn("console.warn (to stderr)");
console.error("console.error (to stderr)");
console.dir("console.dir");
console.timeEnd("my timer");
console.trace("trace test (to stderr)");
console.assert(true, "true value");
try {
    console.assert(false, "false value");
} catch (err) {
    console.log("catched AssertionError:");
    console.log(err);
}

console.log("append to log file");
fs = require('fs');
logfile_stream = fs.createWriteStream('console-outlog', { "flags" : "a" });
my_log = new console.Console(logfile_stream); // = console.Console(logfile_stream, logfile_stream);
my_log.log("my_log.log");
my_log.info("my_log.info");
my_log.warn("my_log.warn");
my_log.error("my_log.error");

console.log("done");
