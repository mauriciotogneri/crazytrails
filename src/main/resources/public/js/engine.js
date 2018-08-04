var playerLocal
var playerRemote

var frames   = 0
var lastTime = new Date().getTime()

class Engine
{
    static init()
    {
        const playerType = prompt()

        const canvas  = document.getElementById("canvas")
        canvas.width  = MAP_SIZE
        canvas.height = MAP_SIZE
        paper.setup(canvas)

        paper.view.onFrame = function(event)
        {
            if (event.count % (60/FPS) === 0)
            {
                Engine.update(event.delta)
            }
        }

        const background = new paper.Path.Rectangle({
            point: [0, 0],
            size: [MAP_SIZE, MAP_SIZE],
            strokeColor: '#777',
            fillColor: '#111'
        })
        background.sendToBack()
        
        if (playerType == "1")
        {
            playerLocal  = new WormLocal(400, 400, 0, COLOR.blue)
            playerRemote = new WormRemote(400, 400, 180, COLOR.red)
        }
        else
        {
            playerRemote = new WormRemote(400, 400, 0, COLOR.blue)
            playerLocal  = new WormLocal(400, 400, 180, COLOR.red)
        }

        Network.init()
    }

    static debug()
    {
        playerRemote.debug()
    }

    static processInput(direction)
    {
        if (playerLocal)
        {
            playerLocal.processInput(direction)
        }
    }

    static processMessage(data)
    {
        if (playerRemote)
        {
            playerRemote.processInput(data)
        }
    }

    static update(delta)
    {
        playerLocal.update(delta)
        playerRemote.update(delta)

        Engine.checkCollisions()
        Engine.updateFPS()
    }

    static updateFPS()
    {
        frames++

        const now  = new Date().getTime()
        const diff = now - lastTime

        if (diff > 1000)
        {
            document.querySelector('#fps').innerHTML = 'FPS: ' + frames

            lastTime = now
            frames   = 0
        }
    }

    static checkCollisions()
    {
        if (Engine.checkCollisionWithRemote() || Engine.checkCollisionWithLocal())
        {
            document.querySelector('body').style.backgroundColor = '#ff0'
        }
        else
        {
            document.querySelector('body').style.backgroundColor = '#000'
        }
    }

    static checkCollisionWithRemote()
    {
        return playerRemote.path.hitTest(playerLocal.head, { 
            segments: true,
            stroke: true,
            fill: true,
            tolerance: HEAD_SIZE/2 })
    }

    static checkCollisionWithLocal()
    {
        const newPath = playerLocal.path.clone()

        if (newPath.segments.length > 5)
        {
            newPath.removeSegments(newPath.segments.length - 5)
            
            const result =  newPath.hitTest(playerLocal.head, { 
                segments: true,
                stroke: true,
                fill: true,
                tolerance: HEAD_SIZE/2 })

            newPath.remove()

            return result
        }
        else
        {
            return false;
        }
    }
}