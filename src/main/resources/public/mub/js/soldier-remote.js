class SoldierRemote extends Soldier
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)
    }

    processMessage(data)
    {
        this.position.x = data.position.x
        this.position.y = data.position.y
        this.angle = data.angle
        this.input = data.input
    }
}