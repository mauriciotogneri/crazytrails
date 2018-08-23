class Soldier
{
    constructor(x, y, color)
    {
        this.inputMouse    = new InputMouse(0, 0)
        this.inputKeyboard = new InputKeyboard(false, false, false, false)

        /*const circle = new Path.Circle({
            center: [0, 0],
            radius: CIRCLE_RADIUS,
            fillColor: color
        })

        const pointer = new Path.Circle({
            center: [10, 0],
            radius: CIRCLE_RADIUS/5,
            fillColor: '#FFFFFF'
        })
        
        this.character = new Group({ transformContent: false, children: [circle, pointer] })
        this.character.position = new Point(x, y)*/

        this.body = Matter.Bodies.rectangle(x, y, SQUARE_SIZE, SQUARE_SIZE, {
            density: 1,
            friction: 0,
            frictionAir: 0.5,
            restitution: 0,
            render: {
                fillStyle: '#00FF00',
                strokeStyle: '#0000FF',
                lineWidth: 3
            }
        })

        physics.addBody(this.body)
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

        //this.inputMouse.move(xDistance, yDistance)

        if ((xDistance != 0) || (yDistance != 0))
        {
            //Matter.Body.setVelocity(this.body, Matter.Vector.create(xDistance, yDistance))
            Matter.Body.setPosition(this.body, Matter.Vector.create(this.body.position.x + xDistance, this.body.position.y + yDistance))
        }

        var angle = this.inputMouse.angleTo(new Point(this.body.position.x, this.body.position.y))
        angle = (angle + 360) % 360
        
        if ((angle >= 45) && (angle <= 135)) // up
        {
            Matter.Body.setAngle(this.body, 90 * (Math.PI / 180))
        }
        else if ((angle >= 135) && (angle <= 225)) // right
        {
            Matter.Body.setAngle(this.body, 180 * (Math.PI / 180))
        }
        else if ((angle >= 225) && (angle <= 315)) // down
        {
            Matter.Body.setAngle(this.body, -90 * (Math.PI / 180))
        }
        else if ((angle >= 315) || (angle <= 45)) // left
        {
            Matter.Body.setAngle(this.body, 0 * (Math.PI / 180))
        }

        if ((xDistance != 0) || (yDistance != 0))
        {
            this.onSoldierMove(xDistance, yDistance)
        }
    }

    onSoldierMove(xDistance, yDistance)
    {
    }
}