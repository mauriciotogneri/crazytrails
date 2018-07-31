class Head
{
    constructor(x, y, angle, color)
    {
        this.direction = 0

        this.path = new paper.Path({
            strokeColor: color,
            strokeWidth: HEAD_SIZE,
            strokeCap: 'round'/*,
            fullySelected: true*/
        })
        
        this.head  = new paper.Point(x, y)
        this.angle = angle

        this.path.add(this.head)
        this.path.add(this.head)

        this.pressed = false
    }

    processLocalInput(direction, pressed)
    {
        if (this.pressed != pressed)
        {
            if ((!pressed) || (pressed && direction))
            {
                this.pressed = pressed

                const data = {
                    d: direction,
                    p: pressed,
                    a: this.angle,
                    x: this.head.x,
                    y: this.head.y
                }

                Network.send(data)
            }
        }

        this.updatePosition(direction, pressed)
    }

    processRemoteInput(data)
    {
        this.updatePosition(data.d, data.p)

        if (data.a && data.x && data.y)
        {
            this.angle  = data.a
            this.head.x = data.x
            this.head.y = data.y
        }
    }

    updatePosition(direction, pressed)
    {
        if (pressed)
        {
            this.direction = direction
        }
        else if (direction == this.direction)
        {
            this.direction = 0
        }  
    }

    move(delta)
    {
        const distance = (delta * DISTANCE_RATE)
        const angle = (delta * ANGLE_RATE)
        var turned = true
        
        if (this.direction == DIRECTION_LEFT)
        {
            this.angle -= angle
        }
        else if (this.direction == DIRECTION_RIGHT)
        {
            this.angle += angle
        }
        else
        {
            turned = false
        }

        if (!turned)
        {
            const segments = this.path.segments
            this.path.removeSegment(segments.length - 1)
        }

        var vector = new paper.Point({
            length: distance,
            angle: this.angle
        })
        this.head = this.head.add(vector)

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

        this.path.add(this.head)
    }
}