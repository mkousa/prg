#!/usr/bin/env node

var fs = require('fs');

fs.access("/dev/null", fs.R_OK | fs.W_OK, function(err){console.log("/dev/null rw:" + (err ? err : "ok"))});
fs.access("/dev/null", fs.X_OK, function(err){console.log("/dev/null execute:" + (err ? err : "ok"))});

//fs.readdirSync

read_testfile = "/etc/issue";

//encoding = null;
encoding = "utf8";
fs.readFile(read_testfile, encoding, function (err, data) {
    if (err) {
        console.log(read_testfile +"fs.readFile err=" + err);
    } else {
        console.log("fs.readFile " + read_testfile + " contents >>>:");
        console.log(data);
        console.log("<<< file " + read_testfile + " end");
    }
}
           );

var data = fs.readFileSync(read_testfile, encoding);
console.log("fs.readFileSync file " + read_testfile + " contents >>>:");
console.log(data);
console.log("<<< sync file " + read_testfile + " end");

//////////

write_testfile = "write_testfile";

fs.writeFile(write_testfile, "test data\n", function (err) {
    if (err) {
        console.log(write_testfile +"fs.writeFile err=" + err);
    } else {
        console.log("file " + write_testfile + " fs.writeFile ok");
    }
}
            );

//////////

fs.appendFile(write_testfile, "append data\n", function (err) {
    if (err) {
        console.log(write_testfile +"fs.appendFile err=" + err);
    } else {
        console.log("file " + write_testfile + " fs.appendFile ok");
    }
}
             );

//////////

fs.readdir(process.argv[2], function (err, all_dirs_files) {
    if (err) {
        console.log(process.argv[2] +" err=" + err);
    } else {
        console.log("dirs + files in " + process.argv[2] + ":" + all_dirs_files);
        all_dirs_files.forEach(function(f) {
            //fs.stat
            console.log("f=" + f)
        });
    }
}
          );

fs.mkdir("mkdir-test", function(err) {
    if (err) {
        console.log("mkdir nok:err=" + err);
    } else {
        console.log("mkdir mkdir-test ok");
        fs.rmdir("mkdir-test", function(err) {
            if (err) {
                console.log("rmdir nok:err=" + err);
            } else {
                console.log("rmdir mkdir-test ok");
            }
        }
                )
    }
}
        ):
