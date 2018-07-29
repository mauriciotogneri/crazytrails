class Head
{
    constructor(scene, direction)
    {
        this.direction = ''
        this.SIZE = 10

        this.path = new paper.Path({
            strokeColor: '#00A1CA',
            strokeWidth: this.SIZE,
            strokeCap: 'round',
            fullySelected: true
        })
        this.path.add(new paper.Point(800, 400))
    }

    updateDirection(value)
    {
        if ((value == Direction.UP) && (this.direction != Direction.DOWN))
        {
            this.direction = Direction.UP
        }
        else if ((value == Direction.DOWN) && (this.direction != Direction.UP))
        {
            this.direction = Direction.DOWN
        }
        else if ((value == Direction.LEFT) && (this.direction != Direction.RIGHT))
        {
            this.direction = Direction.LEFT
        }
        else if ((value == Direction.RIGHT) && (this.direction != Direction.LEFT))
        {
            this.direction = Direction.RIGHT
        }
    }

    move(delta)
    {
        if (this.direction != '')
        {
            const distance = (300 * delta)
            const segments = this.path.segments
            var lastPoint = segments[segments.length - 1].lastPoint

            if (!lastPoint)
            {
                lastPoint = segments[segments.length - 1].point
            }

            var x = lastPoint.x
            var y = lastPoint.y
            
            if (this.direction == Direction.UP)
            {
                y -= distance
            }
            else if (this.direction == Direction.DOWN)
            {
                y += distance
            }
            else if (this.direction == Direction.LEFT)
            {
                x -= distance
            }
            else if (this.direction == Direction.RIGHT)
            {
                x += distance
            }

            this.path.add(new paper.Point(x, y))

            if (x < 0)
            {
                //this.shape.x = 0
                this.direction = ''
            }
        
            if (x > (1600 - this.SIZE))
            {
                //this.shape.x = (1600 - this.SIZE)
                this.direction = ''
            }
        
            if (y < 0)
            {
                //this.shape.y = 0
                this.direction = ''
            }
        
            if (y > (800 - this.SIZE))
            {
                //this.shape.y = (800 - this.SIZE)
                this.direction = ''
            }
        }
    }
}