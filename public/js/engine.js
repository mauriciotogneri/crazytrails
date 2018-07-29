var head

class Engine
{
    static init()
    {
        var canvas = document.getElementById("canvas")
        paper.setup(canvas)
        //background: "#222"
        
        head = new Head()
        
        Engine.startLoop()
        Network.init()
    }

    static processInput(direction)
    {
        head.updateDirection(direction)
    }

    static processMessage(data)
    {
        Input.direction = data
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