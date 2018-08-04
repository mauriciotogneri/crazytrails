class Network
{
    static init()
    {
        Network.ws = new WebSocket(Network.remoteAddress())
        Network.ws.binaryType = 'arraybuffer'

        Network.ws.onmessage = function(event)
        {
            Engine.processMessage(event.data)
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
            return "ws://" + window.location.hostname + ":5000/server"
        }
        else
        {
            return "wss://" + window.location.hostname + "/server"
        }
    }

    static send(data)
    {
        Network.ws.send(data)
    }
}