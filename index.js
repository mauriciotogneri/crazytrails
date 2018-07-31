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
	console.log('New connection')

	ws.on("message", function(data)
	{
		console.log(data)
		
		var clientsCount = 0

		wss.clients.forEach(function(client)
		{
			clientsCount++

			/*console.log(client !== ws)
			console.log(client.readyState)
			console.log(WebSocketServer.OPEN)*/

			if ((client !== ws) && (client.readyState === 1))
			{
				client.send(data)
			}
		})

		console.log("CLIENT COUNT: " + clientsCount)
	})

	ws.on("close", function()
	{
		console.log("Disconnected")
	})
})

/*

CLIENT => SERVER

{
	command: "create_room"
	roomName: string
	playerName: string
}

{
	command: "join_room"
	roomName: string
	playerName: string
}

{
	command: "player_update"
	key: string
	vector: Vector
}

{
	command: "player_dead"
	key: string
}

// ----------------------------------

SERVER => CLIENT

RESPONSE:
{
	command: "create_room"
	roomName: string
	playerName: string
	error: string
}

RESPONSE:
{
	command: "join_room"
	roomName: string
	playerName: string
	error: string
}

BROADCAST:
{
	command: "room_closed"
	players:
	[
		{
			id: int
			name: string
			color: string
			points: int
			you: bool
		}
	]
	key: string
}

BROADCAST:
{
	command: "prepare_round"
	players: [
		{
			id: int
			vector: Vector
		}
	]
}

BROADCAST:
{
	command: "round_countdown"
	value: int
}

BROADCAST:
{
	command: "player_update"
	id: int
	vector: Vector
}

BROADCAST:
{
	command: "player_dead"
	id: int
}

BROADCAST:
{
	command: "round_finished"
	winnerId: int
	players:
	[
		{
			id: int
			points: int
		}
	]
}

---------------

Vector: {
	position: {
		x: int
		y: int
	}
	direction: UP|DOWN|LEFT|RIGHT
}

*/