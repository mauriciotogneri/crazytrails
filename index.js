var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({
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
		console.log("It's disconnected!")
	})
})