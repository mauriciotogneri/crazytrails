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
        
        if (this.input.left)
        {
            this.position.x -= distance
        }
        
        if (this.input.right)
        {
            this.position.x += distance
        }
        
        if (this.input.up)
        {
            this.position.y -= distance
        }
        
        if (this.input.down)
        {
            this.position.y += distance
        }

        this.character.position = new Point(this.position.x, this.position.y)
        this.character.rotation = this.pointer.subtract(this.position).angle
    }
}