/**
 * Module   dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , btc = require('./routes/btc')
  , http = require('http')
  , path = require('path');


var app = express();
var nonce = 25;
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var i = 0;
var tmr = '';
var ST = 0;
var TP = 0;

function tm(){
   console.log(i++);
   btc.Ticker();
   btc.Trades();
}


function getTrades (t){
  switch (t){
    case 'start':   
       console.log(t+' ST: '+ST+' TP: '+ TP);
       if(tmr !==''){
          clearInterval(tmr);
       }
                  
       tmr = setInterval(function(){
         tm();
  // if (i>6){clearInterval(tmr);}
     },1000);
       break;
    case 'stop':
       console.log(t);
       clearInterval(tmr);
       break;
   }
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/btc.:op', btc.info);
app.post('/', function(req, res){
   //console.log(req.body.in0);
   if (req.body.in1){ST = parseFloat(req.body.in1);}
   if (req.body.in2){TP = parseFloat(req.body.in2);}
   getTrades(req.body.in0);
   res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
nonce++;
  console.log('Express server listening on port ' + app.get('port')+' /nonce++: '+nonce);

});