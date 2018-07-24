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