class Soldier
{
    constructor(x, y, color)
    {
        this.position = new Point(x, y)
        this.pointer  = new Point(0, 0)
        this.input    = new Input(false, false, false, false)

        const circle = new Path.Circle({
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
        this.character.position = new Point(x, y)
    }

    update(delta)
    {
        const distance = (delta * DISTANCE_RATE)
        var xDistance  = 0
        var yDistance  = 0
        
        if (this.input.left)
        {
            xDistance = -distance
        }
        
        if (this.input.right)
        {
            xDistance = distance
        }
        
        if (this.input.up)
        {
            yDistance = -distance
        }
        
        if (this.input.down)
        {
            yDistance = distance
        }

        this.position.x += xDistance
        this.position.y += yDistance

        this.pointer.x  += xDistance
        this.pointer.y  += yDistance

        this.character.position.x = this.position.x
        this.character.position.y = this.position.y

        this.character.rotation = this.pointer.subtract(this.position).angle

        if ((xDistance != 0) || (yDistance != 0))
        {
            this.onSoldierMove(xDistance, yDistance)
        }
    }

    onSoldierMove(xDistance, yDistance)
    {
    }
}