class Network
{
    constructor()
    {
        this.ws = new WebSocket(this.remoteAddress())
        this.ws.binaryType = 'arraybuffer'

        this.ws.onopen = function()
        {
        }

        this.ws.onmessage = function(event)
        {
            if (typeof event.data == "string")
            {
                game.processStringMessage(event.data)
            }
            else
            {
                game.processBinaryMessage(Api.operation(event.data), event.data)
            }
        }

        this.ws.onclose = function(event)
        {
            console.log("Connection closed!")
        }
    }

    remoteAddress()
    {
        if (window.location.hostname == "localhost")
        {
            return "ws://" + window.location.hostname + ":5000/ws/hunter"
        }
        else
        {
            return "wss://" + window.location.hostname + "/ws/hunter"
        }
    }

    sendJson(data)
    {
        if (this.ws.readyState == this.ws.OPEN)
        {
            this.ws.send(JSON.stringify(data))
        }
    }

    sendBinary(data)
    {
        if (this.ws.readyState == this.ws.OPEN)
        {
            this.ws.send(data)
        }
    }
}