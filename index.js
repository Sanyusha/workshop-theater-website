var path = require("path");
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

// https://stackoverflow.com/a/13396327
app.use(express.static('public'));

http.listen(80, "0.0.0.0", function() {
  console.log('listening on *:80');
});
