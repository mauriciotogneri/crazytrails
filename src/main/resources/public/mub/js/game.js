class Game
{
    init()
    {
        //const canvas  = $("#canvas")
        //canvas.width  = 10
        //canvas.height = 10
        //paper.setup(canvas)
        
        this.engine = Matter.Engine.create()
        //this.engine.world.gravity = 0

        this.render = Matter.Render.create({
            canvas: $("#canvas"),
            engine: this.engine,
            options: {
                width: document.body.clientWidth,
                height: document.body.clientHeight,
                wireframeBackground: '#222',
                background: 'red',
                wireframes: true,
                showVelocity: true,
                showCollisions: true,
                showAngleIndicator: true
            }
        })

        Matter.Render.run(this.render)

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

        this.setupPlayers()
        this.start()
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

    start()
    {
        const runner = Matter.Runner.create({
            delta: 1000 / FPS,
            isFixed: false,
            enabled: true
        })

        Matter.Runner.run(runner, this.engine)
        Matter.Events.on(runner, "afterUpdate", function(event)
        {
            //console.log(event.timestamp, event.source)  
        })
    }

    processMouseInput(point)
    {
        if (this.playerLocal)
        {
            this.playerLocal.processMouseInput(point)
        }
    }

    processKeyboardInput(input)
    {
        if (this.playerLocal)
        {
            this.playerLocal.processKeyboardInput(input)
        }
    }

    processStringMessage(data)
    {
        console.log(data)
    }

    processBinaryMessage(data)
    {
        if (this.playerRemote)
        {
            this.playerRemote.processMessage(data)
        }
    }
}