class SoldierLocal extends Soldier
{
    constructor(x, y, color)
    {
        super(x, y, color)
    }

    processKeyboardInput(input)
    {
        this.input = input

        this.sendPositionUpdate()
    }

    processMouseInput(point)
    {
        this.pointer = point

        this.sendPositionUpdate()
    }

    onSoldierMove(xDistance, yDistance)
    {
        if (xDistance != 0)
        {
            paper.view.scrollBy(new Point(xDistance, yDistance))
        }
        else
        {
            paper.view.setCenter(new Point(0,0))
        }
    }

    sendPositionUpdate()
    {
        const binary = new Binary()

        binary.float(this.position.x)
        binary.float(this.position.y)

        binary.float(this.pointer.x)
        binary.float(this.pointer.y)

        binary.bool(this.input.left)
        binary.bool(this.input.right)
        binary.bool(this.input.up)
        binary.bool(this.input.down)

        Network.send(binary.build())
    }
}