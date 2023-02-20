var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static("mymodules"));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

matrix = []
matrix = [1,1,1]

io.on('connection', function(socket){
    socket.emit("send matrix", matrix);
});