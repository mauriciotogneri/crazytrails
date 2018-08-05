class Soldier
{
    constructor(x, y, angle, color)
    {
        this.position = new paper.Point(x, y)
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

        this.circle.remove()
        this.circle = new paper.Path.Circle({
            center: [this.position.x, this.position.y],
            radius: CIRCLE_RADIUS,
            fillColor: this.circle.fillColor
        })
    }
}