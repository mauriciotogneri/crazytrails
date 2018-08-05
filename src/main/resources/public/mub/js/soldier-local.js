class SoldierLocal extends Soldier
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)
    }

    processInput(direction)
    {
        this.direction = direction

        this.sendPositionUpdate()
    }

    sendPositionUpdate()
    {
        const data = {
            direction: this.direction,
            angle: this.angle,
            x: this.x,
            y: this.y
        }

        Network.send(data)
    }
}