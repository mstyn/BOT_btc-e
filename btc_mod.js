var fs = require('fs');

// fs.writeFile(filename, data, [encoding], [callback])
// fs.readFile(file, [encoding], [callback]);

//fs.readFile('/doesnt/exist', 'utf8', function (err,data) {
//    if (err) {
//        return console.log(err);
//    }
//    console.log(data);
//});

var vrs = {nonce:76};

fs.writeFile('conf.tx', JSON.stringify(vrs, null, 4), function (err) {
    if (err) return console.log(err);
    console.log('nonce > conf.tx');
});