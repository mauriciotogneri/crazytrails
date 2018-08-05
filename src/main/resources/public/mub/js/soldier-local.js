class SoldierLocal extends Soldier
{
    constructor(x, y, color)
    {
        super(x, y, color)
    }

    processKeyboardInput(input)
    {
        this.input = input
    }

    processMouseInput(point)
    {
        this.pointer = point
    }

    update(delta)
    {
        super.update(delta)

        this.sendPositionUpdate()
    }

    sendPositionUpdate()
    {
        const data = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            pointer: {
                x: this.pointer.x,
                y: this.pointer.y
            },
            input: this.input
        }

        Network.send(data)
    }
}