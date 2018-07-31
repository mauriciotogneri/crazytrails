var player1
var player2

class Engine
{
    static init()
    {
        const playerType = prompt()

        const canvas = document.getElementById("canvas")
        paper.setup(canvas)

        const background  = new paper.Path.Rectangle({
            point: [0, 0],
            size: [800,800],
            strokeColor: '#333',
            fillColor: '#111'
        })
        background.sendToBack()
        
        if (playerType == "1")
        {
            player1 = new Head(400, 400, 0, '#00A1CA')
            player2 = new Head(400, 400, 180, '#E93844')
        }
        else
        {
            player2 = new Head(400, 400, 0, '#00A1CA')
            player1 = new Head(400, 400, 180, '#E93844')
        }
   
        //Engine.startLoop()
        Network.init()

        paper.view.onFrame = function(event)
        {
            if (event.count % (60/FPS) === 0)
            {
                Engine.update(event.delta)
            }
        } 
    }

    static processInput(direction, pressed)
    {
        player1.processLocalInput(direction, pressed)
    }

    static processMessage(data)
    {
        player2.processRemoteInput(data)
    }

    static run()
    {
        var startTime = new Date().getTime()
    
        return function()
        {
            var currentTime = new Date().getTime()
            var delta = (currentTime - startTime) / 1000
            startTime = currentTime
            Engine.update(delta)
        }
    }

    static update(delta)
    {
        player1.move(delta)
        player2.move(delta)
    }

    static startLoop()
    {
        var onEachFrame
    
        if (window.webkitRequestAnimationFrame)
        {
            onEachFrame = function(cb)
            {
                var _cb = function()
                {
                    cb()
                    webkitRequestAnimationFrame(_cb)
                }
                
                _cb()
            }
        }
        else if (window.mozRequestAnimationFrame)
        {
            onEachFrame = function(cb)
            {
                var _cb = function()
                {
                    cb()
                    mozRequestAnimationFrame(_cb)
                }
                
                _cb()
            }
        }
        else
        {
            onEachFrame = function(cb)
            {
                setInterval(cb, parseInt(1000 / 60))
            }
        }
    
        window.onEachFrame = onEachFrame
        window.onEachFrame(Engine.run())
    }
}