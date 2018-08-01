var playerLocal
var playerRemote

class Engine
{
    static init()
    {
        const playerType = prompt()

        const canvas = document.getElementById("canvas")
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
            size: [800,800],
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

        const array = []
        
        array.forEach(element =>
        {
            new paper.Path.Circle({
                center: [element.x, element.y],
                radius: 3,
                fillColor: '#f00'
            })
        })
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
    }
}