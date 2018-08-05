var playerLocal
var playerRemote

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

        new paper.Tool().onMouseMove = function(event)
        {
            Engine.processMouseInput(event.point)
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
            playerLocal  = new SoldierLocal(400, 400, 0, COLOR.blue)
            playerRemote = new SoldierRemote(400, 400, 180, COLOR.red)
        }
        else
        {
            playerRemote = new SoldierRemote(400, 400, 0, COLOR.blue)
            playerLocal  = new SoldierLocal(400, 400, 180, COLOR.red)
        }

        Network.init()
    }

    static processMouseInput(point)
    {
        if (playerLocal)
        {
            playerLocal.processMouseInput(point)
        }
    }

    static processKeyboardInput(input)
    {
        if (playerLocal)
        {
            playerLocal.processKeyboardInput(input)
        }
    }

    static processMessage(data)
    {
        if (playerRemote)
        {
            playerRemote.processMessage(data)
        }
    }

    static update(delta)
    {
        playerLocal.update(delta)
        playerRemote.update(delta)
    }
}