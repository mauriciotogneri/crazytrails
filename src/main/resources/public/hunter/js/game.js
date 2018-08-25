class Game
{
    constructor()
    {
        new Wall(0, 0, 30, 900)
        new Wall(0, 870, 1800, 30)
        new Wall(0, 0, 1800, 30)
        new Wall(1770, 0, 30, 900)
        new Wall(1680, 720, 30, 180)
        new Wall(1590, 630, 210, 30)
        new Wall(1590, 630, 30, 180)

        this.setupPlayers()

        physics.start()
        display.start()
    }

    setupPlayers()
    {
        const playerType = prompt()

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

    processMouseClick(pressed)
    {
        if (this.playerLocal)
        {
            this.playerLocal.processMouseClick(pressed)
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

    processBinaryMessage(operation, binary)
    {
        if (this.playerRemote)
        {
            if (operation == API_OPERATION.newPosition)
            {
                this.playerRemote.processNewPosition(binary)
            }
            else if (operation == API_OPERATION.newBullet)
            {
                const data = Api.newBullet.receive(binary)

                new Bullet(data.x, data.y, data.angle)
            }
        }
    }

    update(delta)
    {
        this.playerLocal.update(delta)
        this.playerRemote.update(delta)

        Matter.Engine.update(physics.engine, delta)
    }

    render(bodies)
    {
        bodies.forEach(body =>
        {
            if (body.object && body.object.render)
            {
                body.object.render()
            }
        })
    }
}