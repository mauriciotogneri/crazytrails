class SoldierRemote extends Soldier
{
    constructor(x, y, color)
    {
        super(x, y, color)
    }

    processNewPosition(binary)
    {
        const data = Api.newPosition.receive(binary)

        Matter.Body.setPosition(this.body, Matter.Vector.create(data.x, data.y))

        this.angle = data.angle

        Matter.Body.setAngle(this.body, this.angle)

        this.inputKeyboard.left  = data.left
        this.inputKeyboard.right = data.right
        this.inputKeyboard.up    = data.up
        this.inputKeyboard.down  = data.down
    }
}