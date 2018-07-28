var rectangle

class Engine
{
    static init()
    {
        Engine.canvas = oCanvas.create({
            canvas: "#canvas",
            fps: 0
        })
    
        Engine.canvas.timeline.stop()
        Engine.canvas.background.set("#222")
    
        rectangle = Engine.canvas.display.rectangle({
            x: 0,
            y: 0,
            width: 20,
            height: 20,
            fill: "#0aa"
        })
    
        Engine.canvas.addChild(rectangle)   
        
        Engine.startLoop()
        Network.init()
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
        const speed = (300 * delta)

        if (Input.direction == Direction.UP)
        {
            rectangle.y -= speed
        }
        else if (Input.direction == Direction.DOWN)
        {
            rectangle.y += speed
        }
        else if (Input.direction == Direction.LEFT)
        {
            rectangle.x -= speed
        }
        else if (Input.direction == Direction.RIGHT)
        {
            rectangle.x += speed
        }
    
        if (rectangle.x < 0)
        {
            rectangle.x = 0
        }
    
        if (rectangle.x > 1580)
        {
            rectangle.x = 1580
        }
    
        if (rectangle.y < 0)
        {
            rectangle.y = 0
        }
    
        if (rectangle.y > 780)
        {
            rectangle.y = 780
        }
    
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