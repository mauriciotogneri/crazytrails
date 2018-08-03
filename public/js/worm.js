class Worm
{
    constructor(x, y, angle, color)
    {
        this.direction = DIRECTION_STRAIGHT
        this.drawing   = false

        this.path = new paper.Path({
            strokeColor: color,
            strokeWidth: HEAD_SIZE,
            strokeCap: 'round',
            fullySelected: DEBUG_ENABLED
        })
        
        this.head  = new paper.Point(x, y)
        this.angle = angle

        this.circle = new paper.Path.Circle({
            center: [x, y],
            radius: HEAD_SIZE/2,
            fillColor: color
        })
    }

    startDrawing()
    {
        this.drawing = true
        this.path.add(this.head)
        this.path.add(this.head)
    }

    removeLastSegment()
    {
        this.path.removeSegment(this.path.segments.length - 1)
    }

    checkBoundaries()
    {
        if (this.head.x < 0)
        {
            this.head.x = 0
        }
        
        if (this.head.x > (MAP_SIZE - HEAD_SIZE))
        {
            this.head.x = (MAP_SIZE - HEAD_SIZE)
        }
    
        if (this.head.y < 0)
        {
            this.head.y = 0
        }
        
        if (this.head.y > (MAP_SIZE - HEAD_SIZE))
        {
            this.head.y = (MAP_SIZE - HEAD_SIZE)
        }
    }

    update(delta)
    {
        const distance = (delta * DISTANCE_RATE)
        const rotation = (delta * ROTATION_RATE)
        
        if (this.direction == DIRECTION_LEFT)
        {
            this.angle -= rotation
        }
        else if (this.direction == DIRECTION_RIGHT)
        {
            this.angle += rotation
        }

        this.angle = this.angle % 360

        const vector = new paper.Point({
            length: distance,
            angle: this.angle
        })

        this.head = this.head.add(vector)

        this.checkBoundaries()

        if (!this.drawing)
        {
            this.circle.remove()
            this.circle = new paper.Path.Circle({
                center: [this.head.x, this.head.y],
                radius: HEAD_SIZE / 2,
                fillColor: this.circle.fillColor
            })
        }
        else
        {
            this.circle.remove()

            if (this.direction == DIRECTION_STRAIGHT)
            {
                this.removeLastSegment()
            }

            this.path.add(this.head)
        }
    }
}