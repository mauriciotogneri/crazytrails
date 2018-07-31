class Head
{
    constructor()
    {
        this.direction = ''
        this.SIZE = 10

        this.path = new paper.Path({
            strokeColor: '#00A1CA',
            strokeWidth: this.SIZE,
            strokeCap: 'round',
            fullySelected: true
        })
        
        this.head  = new paper.Point(400, 400)
        this.angle = 0

        this.path.add(this.head)
        this.path.add(this.head)

        this.pressed = false
    }

    processLocalInput(direction, pressed)
    {
        if (this.pressed != pressed)
        {
            this.pressed = pressed

            Network.send({
                direction: direction,
                pressed: pressed/*,
                angle: this.angle,
                position: 
                {
                    x: this.head.x,
                    y: this.head.y
                }*/
            })
        }

        /*if (pressed)
        {
            this.direction = direction
        }
        else if (direction == this.direction)
        {
            this.direction = ''
        }*/
    }

    processRemoteInput(direction, pressed)
    {
        if (pressed)
        {
            this.direction = direction
        }
        else if (direction == this.direction)
        {
            this.direction = ''
        }

        //this.angle = angle
        //this.head.x = position.x
        //this.head.y = position.y
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