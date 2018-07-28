/*var ws = new WebSocket("wss://websocketsserver.herokuapp.com")

ws.onmessage = function(event)
{
    var li = document.createElement('li')
    li.innerHTML = new String(new Date().getTime() - parseInt(event.data))
    document.querySelector('#pings').appendChild(li)
}

ws.onopen = function()
{
    setInterval(function()
    {
        ws.send(new Date().getTime())
    }, 1000)
}*/