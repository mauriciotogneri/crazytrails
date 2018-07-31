var head

class Engine
{
    static init()
    {
        const canvas = document.getElementById("canvas")
        paper.setup(canvas)

        const background  = new paper.Path.Rectangle({
            point: [0, 0],
            size: [800,800],
            strokeColor: '#333',
            fillColor: '#111'
        })
        background.sendToBack()
        
        head = new Head()
        
        Engine.startLoop()
        Network.init()
    }

    static processInput(direction, pressed)
    {
        head.processLocalInput(direction, pressed)
    }

    static processMessage(data)
    {
        head.processRemoteInput(data.direction, data.pressed)
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
        head.move(delta)
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