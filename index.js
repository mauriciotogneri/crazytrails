var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

var app = express()
app.use(express.static(__dirname + "/public"))

var server = http.createServer(app)
server.listen(port)

// -------------------------------------------------

const wss = new WebSocketServer({
	server: server
})

wss.on("connection", function(ws)
{
	ws.on("message", function(data)
	{
		ws.send(data)
	})

	ws.on("close", function()
	{
		console.log("Disconnected")
	})
})