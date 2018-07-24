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

/*const WebSocket = require('ws')

const ws = new WebSocket('ws://immense-fortress-84995.herokuapp.com/ws')
const ws = new WebSocket('ws://localhost/ws')

const ws = new WebSocket.Server({
  port: process.env.PORT
})

ws.on('open', function open() {
  ws.send('something')
})

ws.on('message', function incoming(data) {
  console.log(data)
})*/

//-------------

var WebSocketServer = require('ws').Server
var http = require('http')
var express = require('express')
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

var wss = new WebSocketServer({server: server})

wss.on('open', function(ws) {
	console.log("It's connected")
	ws.send("It's connected")

	ws.on('message', function incoming(data) {
		console.log(data)
		ws.send(data)
	})

	ws.on('close', function() {
		console.log("It's disconnected")
	    ws.send("It's disconnected")
	})
})