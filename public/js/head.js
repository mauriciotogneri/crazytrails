class Head
{
    constructor(x, y, angle, color)
    {
        this.direction = ''
        this.SIZE = 10

        this.path = new paper.Path({
            strokeColor: color,
            strokeWidth: this.SIZE,
            strokeCap: 'round',
            fullySelected: true
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

                var data = {
                    direction: direction,
                    pressed: pressed
                }

                if (!pressed)
                {
                    data.angle = this.angle
                    data.position = {
                        x: this.head.x,
                        y: this.head.y
                    }
                }

                Network.send(data)
            }
        }

        this.updatePosition(direction, pressed)
    }

    processRemoteInput(data)
    {
        this.updatePosition(data.direction, data.pressed)

        if ((data.angle) && (data.position))
        {
            this.angle  = data.angle
            this.head.x = data.position.x
            this.head.y = data.position.y
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
            this.direction = ''
        }  
    }

    move(delta)
    {
        const distance = (delta * 150)
        const angle = (delta * 150)
        var turned = true
        
        if (this.direction == Direction.LEFT)
        {
            this.angle -= angle
        }
        else if (this.direction == Direction.RIGHT)
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
            //this.direction = ''
        }
        
        if (this.head.x > (800 - this.SIZE))
        {
            this.head.x = (800 - this.SIZE)
            //this.direction = ''
        }
    
        if (this.head.y < 0)
        {
            this.head.y = 0
            //this.direction = ''
        }
    
        if (this.head.y > (800 - this.SIZE))
        {
            this.head.y = (800 - this.SIZE)
            //this.direction = ''
        }

        this.path.add(this.head)
    }
}