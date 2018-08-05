class SoldierLocal extends Soldier
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)
    }

    processKeyboardInput(input)
    {
        this.input = input

        this.sendPositionUpdate()
    }

    processMouseInput(point)
    {
        this.angle = point.subtract(this.position).angle
    }

    sendPositionUpdate()
    {
        const data = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            angle: this.angle,
            input: this.input
        }

        Network.send(data)
    }
}