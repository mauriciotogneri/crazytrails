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
        var newAngle = this.effectiveAngle(input)

        if (newAngle != this.angle)
        {
            this.angle = newAngle
            this.sendPositionUpdate()
        }
    }

    effectiveAngle(input)
    {
        var angle = input.angleTo(new Point(this.body.position.x, this.body.position.y))
        angle = (angle + 360) % 360
        
        if ((angle >= 45) && (angle <= 135)) // up
        {
            return Math.PI / 2
        }
        else if ((angle >= 135) && (angle <= 225)) // right
        {
            return Math.PI
        }
        else if ((angle >= 225) && (angle <= 315)) // down
        {
            return -Math.PI / 2
        }
        else if ((angle >= 315) || (angle <= 45)) // left
        {
            return 0
        }
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

        binary.float(this.angle)

        binary.bool(this.inputKeyboard.left)
        binary.bool(this.inputKeyboard.right)
        binary.bool(this.inputKeyboard.up)
        binary.bool(this.inputKeyboard.down)

        network.sendBinary(binary.build())
    }
}