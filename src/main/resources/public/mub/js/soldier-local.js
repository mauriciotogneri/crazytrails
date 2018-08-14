class SoldierLocal extends Soldier
{
    constructor(x, y, color)
    {
        super(x, y, color)
    }

    processKeyboardInput(input)
    {
        this.inputKeyboard = input

        this.sendPositionUpdate()
    }

    processMouseInput(input)
    {
        this.inputMouse = input

        this.sendPositionUpdate()
    }

    onSoldierMove(xDistance, yDistance)
    {
        //paper.view.scrollBy(new Point(xDistance, yDistance))
    }

    sendPositionUpdate()
    {
        const binary = new Binary()

        binary.float(this.body.position.x)
        binary.float(this.body.position.y)

        binary.float(this.inputMouse.x)
        binary.float(this.inputMouse.y)

        binary.bool(this.inputKeyboard.left)
        binary.bool(this.inputKeyboard.right)
        binary.bool(this.inputKeyboard.up)
        binary.bool(this.inputKeyboard.down)

        network.sendBinary(binary.build())
    }
}