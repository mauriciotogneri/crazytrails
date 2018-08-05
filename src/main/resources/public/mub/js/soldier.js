class Soldier
{
    constructor(x, y, angle, color)
    {
        this.x = x
        this.y = y
        this.angle = angle
        this.direction = DIRECTION_NONE

        this.circle = new paper.Path.Circle({
            center: [x, y],
            radius: 30,
            fillColor: color
        })
    }

    update(delta)
    {
        const distance = (delta * DISTANCE_RATE)
        
        if (this.direction == DIRECTION_LEFT)
        {
            this.x -= distance
        }
        else if (this.direction == DIRECTION_RIGHT)
        {
            this.x += distance
        }
        else if (this.direction == DIRECTION_UP)
        {
            this.y -= distance
        }
        else if (this.direction == DIRECTION_DOWN)
        {
            this.y += distance
        }
        
        this.circle.remove()
        this.circle = new paper.Path.Circle({
            center: [this.x, this.y],
            radius: HEAD_SIZE / 2,
            fillColor: this.circle.fillColor
        })
    }
}