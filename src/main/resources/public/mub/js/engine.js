var playerLocal
var playerRemote
var world

class Engine
{
    static init()
    {
        const playerType = "1" //prompt()

        //const canvas  = document.getElementById("canvas")
        //canvas.width  = 10
        //canvas.height = 10
        //paper.setup(canvas)
        
        Engine.world = new box2d.b2World(new box2d.b2Vec2(0, 0), true)

        const debugDraw = new box2d.b2DebugDraw()
        debugDraw.SetSprite(document.getElementById('debug').getContext('2d'))
        debugDraw.SetDrawScale(1)
        debugDraw.SetFillAlpha(0.5)
        debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit)
        Engine.world.SetDebugDraw(debugDraw)

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

        /*const background = new Path.Rectangle({
            center: [0, 0],
            size: [MAP_SIZE * 3, MAP_SIZE * 3],
            fillColor: '#111'
        })
        background.sendToBack()*/

        /*const tree = new Path.Circle({
            center: [0, 0],
            radius: CIRCLE_RADIUS,
            fillColor: '#00FF00'
        })*/

        //paper.view.setCenter((playerType == "1") ? [600, 400] : [200, 400])

        Input.init()
        Network.init(Engine.start)
    }

    static start()
    {
        requestAnimationFrame(mainLoop)
        /*paper.view.onFrame = function(event)
        {
            if (event.count % (60/FPS) === 0)
            {
                Engine.update(event.delta)
            }
        }*/
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

        Engine.world.DrawDebugData()
        Engine.world.Step(delta, 8, 3)
        Engine.world.ClearForces()
    }
}

var lastFrameTimeMs = 0
var maxFPS = 60
var delta = 0
var timestep = 1000 / 60

function mainLoop(timestamp)
{
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS))
    {
        requestAnimationFrame(mainLoop)
        return
    }

    delta = timestamp - lastFrameTimeMs
    lastFrameTimeMs = timestamp

    while (delta >= timestep)
    {
        Engine.update(timestep)
        delta -= timestep;
    }
    requestAnimationFrame(mainLoop)
}