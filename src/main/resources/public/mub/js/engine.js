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
        
        if (playerType == "1")
        {
            playerLocal  = new SoldierLocal(600, 400, COLOR.blue)
            playerRemote = new SoldierRemote(200, 400, COLOR.red)
        }
        else
        {
            playerLocal  = new SoldierLocal(200, 400, COLOR.red)
            playerRemote = new SoldierRemote(600, 400, COLOR.blue)
        }

        const background = new Path.Rectangle({
            center: [0, 0],
            size: [MAP_SIZE * 3, MAP_SIZE * 3],
            fillColor: '#111'
        })
        background.sendToBack()

        const tree = new Path.Circle({
            center: [0, 0],
            radius: CIRCLE_RADIUS,
            fillColor: '#00FF00'
        })

        paper.view.setCenter((playerType == "1") ? [600, 400] : [200, 400])

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