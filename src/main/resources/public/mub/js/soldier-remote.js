class SoldierRemote extends Soldier
{
    constructor(x, y, color)
    {
        super(x, y, color)
    }

    processMessage(data)
    {
        const binary     = new Binary(data)
        
        this.position.x  = binary.float()
        this.position.y  = binary.float()

        this.pointer.x   = binary.float()
        this.pointer.y   = binary.float()

        this.input.left  = binary.bool()
        this.input.right = binary.bool()
        this.input.up    = binary.bool()
        this.input.down  = binary.bool()
    }
}