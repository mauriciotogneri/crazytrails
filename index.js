var http = require("http")
var express = require("express")
var app = express()

app.use(express.static(__dirname + "/public"))

var server = http.createServer(app)
server.listen(process.env.PORT)

// -------------------------------------------------

const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({
	port: process.env.PORT
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