class Soldier
{
    constructor(x, y, color)
    {
        this.angle = 0
        this.inputKeyboard = new InputKeyboard(false, false, false, false)

        this.body = Matter.Bodies.rectangle(x, y, CHARACTER_SIZE, CHARACTER_SIZE, {
            density: 1,
            friction: 1,
            frictionAir: 0,
            restitution: 0
        })

        physics.addBody(this.body, this)

        const square = new Path.Rectangle({
            center: [0, 0],
            size: [CHARACTER_SIZE, CHARACTER_SIZE],
            fillColor: color
        })

        const pointer = new Path.Circle({
            center: [(CHARACTER_SIZE/2)-5, 0],
            radius: 2,
            fillColor: '#000'
        })
        
        this.graphics = new Group({
            transformContent: false,
            children: [square, pointer],
            position: [x, y]
        })

        /*const layer = new Layer()
        layer.activate()

        this.light = new Path.Rectangle({
            center: [x, y],
            size: [CHARACTER_SIZE, CHARACTER_SIZE],
            fillColor: 'white'
        })

        this.light.fillColor.alpha = 0.3*/
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
            this.onMove()
        }
    }

    onMove()
    {
    }

    render()
    {
        this.graphics.position.x = this.body.position.x
        this.graphics.position.y = this.body.position.y
        this.graphics.rotation = (this.body.angle * 180 / Math.PI) + 180

        this.light.position.x = this.body.position.x
        this.light.position.y = this.body.position.y
    }
}