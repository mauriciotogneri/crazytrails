class Worm
{
    constructor(x, y, angle, color)
    {
        this.direction = DIRECTION_STRAIGHT
        this.drawing   = false
        this.pressed   = false

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

    updateDirection(direction, pressed)
    {
        if (pressed)
        {
            this.direction = direction
        }
        else if (direction == this.direction)
        {
            this.direction = DIRECTION_STRAIGHT
        }  
    }

    removeLastPoint()
    {
        this.path.removeSegment(this.path.segments.length - 1)
    }

    checkBoundaries()
    {
        if (this.head.x < 0)
        {
            this.head.x = 0
        }
        
        if (this.head.x > (800 - HEAD_SIZE))
        {
            this.head.x = (800 - HEAD_SIZE)
        }
    
        if (this.head.y < 0)
        {
            this.head.y = 0
        }
        
        if (this.head.y > (800 - HEAD_SIZE))
        {
            this.head.y = (800 - HEAD_SIZE)
        }
    }
}