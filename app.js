var express = require('express'),
  http = require('http'),
  path = require('path');

var app = express();

// all environments
app.set('port', process.argv[2] || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400000 }));
app.use(app.router);
app.use(function (req, res) {
  res.sendfile(__dirname + "/index.html");
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
