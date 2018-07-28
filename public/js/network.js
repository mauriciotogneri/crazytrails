Network = {}

Network.init = function()
{
    Network.ws = new WebSocket(Network.remoteAddress())

    Network.ws.onmessage = function(event)
    {
        console.log(Object.getOwnPropertyNames(event))
        Network.process(event.data)
    }
    
    Network.ws.onopen = function()
    {
    }
}

Network.send = function(data)
{
    Network.ws.send(data)
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

Network.process = function(data)
{
    Input.direction = data
}