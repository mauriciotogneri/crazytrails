class Game
{
    init()
    {
        //const canvas  = $("#canvas")
        //canvas.width  = 10
        //canvas.height = 10
        //paper.setup(canvas)

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

        this.addWall(0, 0, 30, 900)
        this.addWall(0, 870, 1800, 30)
        this.addWall(0, 0, 1800, 30)
        this.addWall(1770, 0, 30, 900)
        this.addWall(1680, 720, 30, 180)
        this.addWall(1590, 630, 210, 30)
        this.addWall(1590, 630, 30, 180)

        this.setupPlayers()
        physics.start()
    }

    addWall(x, y, w, h)
    {
        physics.addBody(Matter.Bodies.rectangle(x + (w/2), y + (h/2), w, h, {isStatic: true}))
    }

    setupPlayers()
    {
        const playerType = 1 //prompt()

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

    processMouseInput(input)
    {
        if (this.playerLocal)
        {
            this.playerLocal.processMouseInput(input)
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

    update(delta)
    {
        this.playerLocal.update(delta)
        this.playerRemote.update(delta)
    }
}