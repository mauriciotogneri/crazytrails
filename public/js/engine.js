var head

class Engine
{
    static init()
    {
        Engine.canvas = oCanvas.create({
            canvas: "#canvas",
            fps: 0,
            background: "#222"
        })
    
        Engine.canvas.timeline.stop()

        const gameScene = Engine.canvas.scenes.create("game", function(){})
        
        head = new Head(gameScene)
        
        Engine.startLoop()
        Network.init()

        Engine.canvas.scenes.load("game")
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
    
        Engine.canvas.redraw()
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