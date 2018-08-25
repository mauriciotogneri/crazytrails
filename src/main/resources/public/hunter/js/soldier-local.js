class SoldierLocal extends Soldier
{
    constructor(x, y, color)
    {
        super(x, y, color)

        this.mousePressed = false
    }

    processKeyboardInput(input)
    {
        this.inputKeyboard = input

        this.sendPositionUpdate()
    }

    processMouseInput(input)
    {
        const newAngle = this.effectiveAngle(input)

        if (newAngle != this.angle)
        {
            this.angle = newAngle
            this.sendPositionUpdate()
        }
    }

    effectiveAngle(input)
    {
        const angle = (input.angleTo(new Point(this.body.position.x, this.body.position.y)) + 360) % 360
        
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

    processMouseClick(pressed)
    {
        this.mousePressed = pressed
        this.onFireTimeout()
    }

    startFiringTimeout()
    {
        const that = this

        setTimeout(function()
        {
            that.onFireTimeout()
        }, 100);
    }

    onFireTimeout()
    {
        if (this.mousePressed)
        {
            const position = this.body.position
            new Bullet(position.x, position.y, parseInt(this.angle))
            Api.newBullet.send(position.x, position.y, parseInt(this.angle))
            this.startFiringTimeout()
        }
    }

    onCollision(object)
    {
        if (object instanceof Bullet)
        {
            console.log("ouch!")
        }
    }

    onSoldierMove()
    {
        paper.view.setCenter([this.body.position.x, this.body.position.y])
    }

    sendPositionUpdate()
    {
        Api.newPosition.send(
            this.body.position.x,
            this.body.position.y,
            this.angle,
            this.inputKeyboard.left,
            this.inputKeyboard.right,
            this.inputKeyboard.up,
            this.inputKeyboard.down
        )
    }
}