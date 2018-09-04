class Game
{
    constructor()
    {
        new Level()

        this.setupPlayers()

        physics.start()
        requestAnimationFrame(this.render)
    }

    setupPlayers()
    {
        const playerType = prompt()

        if (playerType == "1")
        {
            this.playerLocal  = new SoldierLocal(100, 500, TEXTURE.ball)
            this.playerRemote = new SoldierRemote(1900, 500, TEXTURE.ball)
        }
        else
        {
            this.playerLocal  = new SoldierLocal(1900, 500, TEXTURE.ball)
            this.playerRemote = new SoldierRemote(100, 500, TEXTURE.ball)
        }
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

    render()
    {
        display.update(physics.engine.world.bodies)
        requestAnimationFrame(game.render)
    }

    update(delta)
    {
        this.playerLocal.update(delta)
        this.playerRemote.update(delta)
    }
}