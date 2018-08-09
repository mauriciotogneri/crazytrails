class Soldier
{
    constructor(x, y, color)
    {
        this.position = new Point(x, y)
        this.pointer  = new Point(0, 0)
        this.input    = new Input(false, false, false, false)

        /*const circle = new Path.Circle({
            center: [0, 0],
            radius: CIRCLE_RADIUS,
            fillColor: color
        })

        const pointer = new Path.Circle({
            center: [10, 0],
            radius: CIRCLE_RADIUS/5,
            fillColor: '#FFFFFF'
        })*/

        const fixDef = new box2d.b2FixtureDef()
        fixDef.density     = 0
        fixDef.friction    = 0
        fixDef.restitution = 0
        fixDef.shape = new box2d.b2CircleShape(CIRCLE_RADIUS)

        const bodyDef = new box2d.b2BodyDef()
        bodyDef.type = box2d.b2Body.b2_dynamicBody
        bodyDef.position.x = x
        bodyDef.position.y = y
        bodyDef.linearDamping = 0.01

        this.body = Engine.world.CreateBody(bodyDef)
        this.body.CreateFixture(fixDef)

        //this.character = new Group({ transformContent: false, children: [circle, pointer] })
        //this.character.position = new Point(x, y)
    }

    update(delta)
    {
        const distance = (delta * DISTANCE_RATE) * 1000
        var xDistance  = 0
        var yDistance  = 0
        
        if (this.input.left)
        {
            xDistance = -distance
        }
        else if (this.input.right)
        {
            xDistance = distance
        }
        
        if (this.input.up)
        {
            yDistance = -distance
        }
        else if (this.input.down)
        {
            yDistance = distance
        }

        this.position.x += xDistance
        this.position.y += yDistance

        if ((xDistance != 0) || (yDistance != 0))
        {
            this.body.ApplyForce(new box2d.b2Vec2(xDistance, yDistance), this.body.GetWorldCenter())
        }

        this.pointer.x += xDistance
        this.pointer.y += yDistance

        //this.character.position.x = this.position.x
        //this.character.position.y = this.position.y

        //this.character.rotation = this.pointer.subtract(this.position).angle

        if ((xDistance != 0) || (yDistance != 0))
        {
            this.onSoldierMove(xDistance, yDistance)
        }
    }

    onSoldierMove(xDistance, yDistance)
    {
    }
}