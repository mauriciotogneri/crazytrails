class SoldierLocal extends Soldier
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)
    }

    processInput(input)
    {
        this.input = input

        this.sendPositionUpdate()
    }

    sendPositionUpdate()
    {
        const data = {
            x: this.x,
            y: this.y,
            angle: this.angle,
            input: this.input
        }

        Network.send(data)
    }
}