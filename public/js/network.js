Network = {}

Network.init = function()
{
    Network.ws = new WebSocket(Network.remoteAddress())

    Network.ws.onmessage = function(event)
    {
        Engine.processMessage(event.data)
    }
}

Network.remoteAddress = function()
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

Network.send = function(data)
{
    Network.ws.send(data)
}