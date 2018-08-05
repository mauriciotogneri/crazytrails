class Network
{
    static init()
    {
        Network.ws = new WebSocket(Network.remoteAddress())

        Network.ws.onmessage = function(event)
        {
            Engine.processMessage(JSON.parse(event.data))
        }

        Network.ws.onclose = function(event)
        {
            console.log("Connection closed!")
        }
    }

    static remoteAddress()
    {
        if (window.location.hostname == "localhost")
        {
            return "ws://" + window.location.hostname + ":5000/ws/mub"
        }
        else
        {
            return "wss://" + window.location.hostname + "/ws/mub"
        }
    }

    static send(data)
    {
        Network.ws.send(JSON.stringify(data))
    }
}