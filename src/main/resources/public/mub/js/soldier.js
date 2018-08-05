class Soldier
{
    constructor(x, y, angle, color)
    {
        this.x = x
        this.y = y
        this.angle = angle
        this.input = new Input(false, false, false, false)

        this.circle = new paper.Path.Circle({
            center: [x, y],
            radius: CIRCLE_RADIUS,
            fillColor: color
        })
    }

    update(delta)
    {
        const distance = (delta * DISTANCE_RATE)
        
        if (this.input.left)
        {
            this.x -= distance
        }
        
        if (this.input.right)
        {
            this.x += distance
        }
        
        if (this.input.up)
        {
            this.y -= distance
        }
        
        if (this.input.down)
        {
            this.y += distance
        }

        this.circle.remove()
        this.circle = new paper.Path.Circle({
            center: [this.x, this.y],
            radius: CIRCLE_RADIUS,
            fillColor: this.circle.fillColor
        })
    }
}