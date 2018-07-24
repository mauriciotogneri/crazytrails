/*var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello, world!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})*/

//-------------

const WebSocket = require('ws');

const ws = new WebSocket('ws://immense-fortress-84995.herokuapp.com/ws');
//const ws = new WebSocket('ws://localhost/ws');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log(data);
});