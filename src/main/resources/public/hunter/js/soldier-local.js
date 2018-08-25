class SoldierLocal extends Soldier
{
    constructor(x, y, color)
    {
        super(x, y, color)

        this.mousePressed = false
        this.onMove()
    }

    processKeyboardInput(input)
    {
        this.inputKeyboard = input

        this.sendPositionUpdate()
    }

    processMouseInput(input)
    {
        const newAngle = input.orientation()

        if (newAngle != this.angle)
        {
            this.angle = newAngle
            this.sendPositionUpdate()
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

    onMove()
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