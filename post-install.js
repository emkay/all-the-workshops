var spawn = require('child_process').spawn;
var fstream = require('fstream');
var fs = require('fs');
var zlib = require('zlib');
var tar = require('tar');
var mkdirp = require('mkdirp');
var ls = require('ls-stream');
var through = require('through');

process.chdir('workshops');

var npm = spawn('npm', ['i']);

npm.stdout.on('data', function (data) {
    console.log(data.toString());
});

npm.stderr.on('data', function (data) {
    console.log(data.toString());
});

function skipper(entry) {
    return (entry.path.split('/').length > 2) || entry.path === 'node_modules/.bin';
}

npm.on('close', function () {
    ls('node_modules').pipe(through(function (entry) {
        var skip = skipper(entry);
        var json;
        var str;
        var packagePath;

        if (skip) {
            entry.ignore();
        } else {
            packagePath = __dirname + '/workshops/' + entry.path + '/package.json';
            json = require(packagePath);
            if (json.dependencies) {
                json.bundledDependencies = json.dependencies;
                delete json.dependencies;
                str = JSON.stringify(json);
                fs.createWriteStream(packagePath).end(str);
            }
            fstream.Reader({ 'path': entry.path, 'type': 'Directory' })
                .pipe(tar.Pack())
                .pipe(zlib.Gzip())
                .pipe(fstream.Writer({ 'path': './' + entry.path.split('/')[1] + '.tgz' }));
        }
    }));
});
