class SoldierRemote extends Soldier
{
    constructor(x, y, color)
    {
        super(x, y, color)
    }

    processMessage(data)
    {
        const binary     = new Binary(data)
        
        var x = binary.float()
        var y = binary.float()

        Matter.Body.setPosition(this.body, Matter.Vector.create(x, y))

        this.inputMouse.x = binary.float()
        this.inputMouse.y = binary.float()

        this.inputKeyboard.left  = binary.bool()
        this.inputKeyboard.right = binary.bool()
        this.inputKeyboard.up    = binary.bool()
        this.inputKeyboard.down  = binary.bool()
    }
}