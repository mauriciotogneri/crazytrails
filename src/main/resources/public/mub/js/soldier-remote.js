class SoldierRemote extends Soldier
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)
    }

    processInput(data)
    {
        this.x     = data.x
        this.y     = data.y
        this.angle = data.angle
        this.input = data.input
    }
}