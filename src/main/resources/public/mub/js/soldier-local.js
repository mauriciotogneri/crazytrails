class SoldierLocal extends Soldier
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)

        this.lastMousePosition = new Point(0, 0)
    }

    processKeyboardInput(input)
    {
        this.input = input

        this.sendPositionUpdate()
    }

    processMouseInput(point)
    {
        this.lastMousePosition = point
        this.angle = point.subtract(this.position).angle
    }

    update(delta)
    {
        super.update(delta)

        this.processMouseInput(this.lastMousePosition)
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