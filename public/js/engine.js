var canvas
var rectangle

function init()
{
    canvas = oCanvas.create({
        canvas: "#canvas"
    })

    canvas.background.set("#222")

    rectangle = canvas.display.rectangle({
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        fill: "#0aa"
    })

    canvas.addChild(rectangle)   
    
    startLoop()
    Network.init()
}

function run()
{
    var startTime = new Date().getTime()
    var that = this
    
    return function()
    {
        var currentTime = new Date().getTime()
        var delta = (currentTime - startTime) / 1000
        startTime = currentTime
        update(delta)
    }
}

function update(delta)
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

    canvas.redraw()
}

function startLoop()
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
    window.onEachFrame(run())
}