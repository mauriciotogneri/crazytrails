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

	ws.on('message', function(data) {
		console.log(data)
		ws.send(data)
	})

	ws.on('close', function() {
		console.log("It's disconnected")
	    ws.send("It's disconnected")
	})
})

/*wss.on("connection", function(ws) {
	ws.send("It's connected")

	ws.on("close", function() {
		console.log("websocket connection close")
	})
})*/