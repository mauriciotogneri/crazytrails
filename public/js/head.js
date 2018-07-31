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

        this.head  = new paper.Point(800, 400)
        this.angle = 0

        this.path.add(this.head)
        this.path.add(this.head)
    }

    updateDirection(value, pressed)
    {
        if (pressed)
        {
            this.direction = value
        }
        else if (value == this.direction)
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
        
        if (this.head.x > (1600 - this.SIZE))
        {
            this.head.x = (1600 - this.SIZE)
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