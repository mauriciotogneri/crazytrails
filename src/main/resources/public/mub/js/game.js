class Game
{
    constructor()
    {
        //const canvas  = $("#canvas")
        //canvas.width  = 10
        //canvas.height = 10
        //paper.setup(canvas)
        
        this.engine = Matter.Engine.create()

        this.render = Matter.Render.create({
            canvas: $("#canvas"),
            engine: this.engine,
            options: {
              width: document.body.clientWidth,
              height: document.body.clientHeight,
              background: 'red',
              wireframes: true,
              showAngleIndicator: false
            }
        })

        var boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
        var boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
        var ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        var ball = Matter.Bodies.circle(100, 100, 20, {
            density: 0.04,
            friction: 0.01,
            frictionAir: 0,
            restitution: 0.5,
            render: {
                fillStyle: '#00FF00',
                strokeStyle: '#0000FF',
                lineWidth: 3
            }
        });

        Matter.World.add(this.engine.world, [boxA, boxB, ground, ball]);

        // run the engine
        Matter.Engine.run(this.engine);

        // run the renderer
        Matter.Render.run(this.render);

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

        //Input.init()
        //Network.init(Engine.start)
    }

    setupPlayers()
    {
        const playerType = "1" //prompt()

        if (playerType == "1")
        {
            this.playerLocal  = new SoldierLocal(600, 400, COLOR.blue)
            this.playerRemote = new SoldierRemote(200, 400, COLOR.red)
        }
        else
        {
            this.playerLocal  = new SoldierLocal(200, 400, COLOR.red)
            this.playerRemote = new SoldierRemote(600, 400, COLOR.blue)
        }

        //paper.view.setCenter((playerType == "1") ? [600, 400] : [200, 400])
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
        if (this.playerLocal)
        {
            this.playerLocal.processMouseInput(point)
        }
    }

    static processKeyboardInput(input)
    {
        if (this.playerLocal)
        {
            this.playerLocal.processKeyboardInput(input)
        }
    }

    static processMessage(data)
    {
        if (this.playerRemote)
        {
            this.playerRemote.processMessage(data)
        }
    }

    static update(delta)
    {
        this.playerLocal.update(delta)
        this.playerRemote.update(delta)

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