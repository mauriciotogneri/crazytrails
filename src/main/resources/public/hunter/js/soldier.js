class Soldier
{
    constructor(x, y, color)
    {
        this.angle = 0
        this.inputKeyboard = new InputKeyboard(false, false, false, false)

        this.body = Matter.Bodies.rectangle(x, y, SOLDIER_SIZE, SOLDIER_SIZE, {
            density: 1,
            friction: 1,
            frictionAir: 0,
            restitution: 0
        })

        physics.addBody(this.body, this)

        const square = new Path.Rectangle({
            center: [0, 0],
            size: [SOLDIER_SIZE, SOLDIER_SIZE],
            fillColor: color
        })

        const pointer = new Path.Circle({
            center: [(SOLDIER_SIZE/2)-5, 0],
            radius: 2,
            fillColor: '#000'
        })
        
        this.graphics = new Group({
            transformContent: false,
            children: [square, pointer],
            position: [x, y]
        })
    }

    update(delta)
    {
        const distance = (delta * DISTANCE_RATE)
        var xDistance  = 0
        var yDistance  = 0
        
        if (this.inputKeyboard.left)
        {
            xDistance = -distance
        }
        else if (this.inputKeyboard.right)
        {
            xDistance = distance
        }
        
        if (this.inputKeyboard.up)
        {
            yDistance = -distance
        }
        else if (this.inputKeyboard.down)
        {
            yDistance = distance
        }

        if ((xDistance != 0) || (yDistance != 0))
        {
            Matter.Body.setPosition(this.body, Matter.Vector.create(this.body.position.x + xDistance, this.body.position.y + yDistance))
        }

        Matter.Body.setVelocity(this.body, Matter.Vector.create(0, 0))

        if (this.angle != this.body.angle)
        {
            Matter.Body.setAngle(this.body, this.angle)
        }

        if ((xDistance != 0) || (yDistance != 0))
        {
            this.onSoldierMove()
        }
    }

    onSoldierMove()
    {
    }

    render()
    {
        this.graphics.position.x = this.body.position.x
        this.graphics.position.y = this.body.position.y
        this.graphics.rotation = (this.body.angle * 180 / Math.PI) + 180
    }
}