var https = require('https');
var querystring = require('querystring');
var crypto = require('crypto');
var fs = require('fs');
var db = require('models');

var nonce = 0;
var vrs = {nonce: 0};

//*************************

if (nonce == 0){
fs.readFile('./conf.tx', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var vrs = (JSON.parse(data));
  nonce = vrs.nonce+1;
console.log(nonce);
});
}
//*************************

/* http.createServer().listen(5000);
 console.log('Server running at 5000'); */


exports.Ticker = function (){
  https.get({host:'btc-e.com', path:'/api/2/btc_usd/ticker'}, function(res) {
  //console.log("statusCode: ", res.statusCode);
  //console.log("headers: ", res.headers);

  res.on('data', function(d) {
      console.log('************ TickerSchema *************');
      var jd = (JSON.parse(d));
//      var NTicker = new db.Ticker(jd.ticker);
    process.stdout.write(jd);
  });

}).on('error', function(e) {
  console.error(e);
});
}

//*************************************

exports.Trades = function (){
  https.get({host:'btc-e.com', path:'/api/2/btc_usd/trades'}, function(res) {
//  console.log("statusCode: ", res.statusCode);
//  console.log("headers: ", res.headers);

  res.on('data', function(d) {
    process.stdout.write(d);
  });

}).on('error', function(e) {
  console.error(e);
});
}

exports.info = function (req, res) {

// API settings
    var key = '5DJAWZNH-BE4IB96V-0FDAMXMX-ERFWL3YG-59OWUNGV'; // your API-key
    var secret = '32b08ed5aa235473ec69658e7cc9632f9d1247edbc85dc2c58f1dfc8e6595638'; // your Secret-key

    var post_data = querystring.stringify({
        'method' : req.params.op,
        'nonce': nonce++
    });

//**
vrs.nonce = nonce;
fs.writeFile('conf.tx', JSON.stringify(vrs, null, 4), function (err) {
    if (err) return console.log(err);
    console.log('nonce > conf.tx');
});
//**
//console.log(post_data);

    var signer = crypto.createHmac('sha512', new Buffer(secret, 'utf8'));
    var result = signer.update(post_data).digest('hex');

    var options = {
        host: 'btc-e.com',
        port: 443,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length,
            'Connection': 'keep-alive',
            'Sign': result,
            'Key': key
        },
        path: '/tapi',
        method: 'POST'
    };

    console.log(options);

var dta = 'err';

    var rq = https.request(options, function(rs) {
        console.log('STATUS: ' + rs.statusCode);
        console.log('HEADERS: ' + JSON.stringify(rs.headers));
        rs.setEncoding('utf8');
        rs.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            dta = JSON.parse(chunk);
            console.log(dta);
   res.send(dta);
        });
    });
    rq.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    rq.write(post_data);
    rq.end();
    
}