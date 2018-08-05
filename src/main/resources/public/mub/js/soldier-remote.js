class SoldierRemote extends Soldier
{
    constructor(x, y, color)
    {
        super(x, y, color)
    }

    processMessage(data)
    {
        this.position.x = data.position.x
        this.position.y = data.position.y
        this.pointer.x  = data.pointer.x
        this.pointer.y  = data.pointer.y
        this.input      = data.input
    }
}