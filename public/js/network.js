class Network
{
    static init()
    {
        Network.ws = new WebSocket(Network.remoteAddress())

        Network.ws.onmessage = function(event)
        {
            Engine.processMessage(JSON.parse(event.data))
        }
    }

    static remoteAddress()
    {
        if (window.location.hostname == "localhost")
        {
            return "ws://" + window.location.hostname + ":5000"
        }
        else
        {
            return "wss://" + window.location.hostname
        }
    }

    static send(data)
    {
        Network.ws.send(JSON.stringify(data))
    }
}