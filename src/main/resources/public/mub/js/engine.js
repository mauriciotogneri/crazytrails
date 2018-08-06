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

        const background = new Path.Rectangle({
            center: [0, 0],
            size: [MAP_SIZE * 2, MAP_SIZE * 2],
            fillColor: '#111'
        })
        background.sendToBack()
        
        if (playerType == "1")
        {
            playerLocal  = new SoldierLocal(600, 400, COLOR.blue)
            playerRemote = new SoldierRemote(200, 400, COLOR.red)
        }
        else
        {
            playerRemote = new SoldierRemote(600, 400, COLOR.blue)
            playerLocal  = new SoldierLocal(200, 400, COLOR.red)
        }

        Input.init()
        Network.init(Engine.start)
    }

    static start()
    {
        paper.view.onFrame = function(event)
        {
            if (event.count % (60/FPS) === 0)
            {
                Engine.update(event.delta)
            }
        }
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