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

        this.head = new paper.Point({
            x: 800,
            y: 400
        })

        this.path.add(this.head)
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
            
            if (this.direction == Direction.UP)
            {
                this.head.y -= distance
            }
            else if (this.direction == Direction.DOWN)
            {
                this.head.y += distance
            }
            else if (this.direction == Direction.LEFT)
            {
                this.head.x -= distance
            }
            else if (this.direction == Direction.RIGHT)
            {
                this.head.x += distance
            }

            if (this.head.x < 0)
            {
                this.head.x = 0
                this.direction = ''
            }
            
            if (this.head.x > (1600 - this.SIZE))
            {
                this.head.x = (1600 - this.SIZE)
                this.direction = ''
            }
        
            if (this.head.y < 0)
            {
                this.head.y = 0
                this.direction = ''
            }
        
            if (this.head.y > (800 - this.SIZE))
            {
                this.head.y = (800 - this.SIZE)
                this.direction = ''
            }

            this.path.add(this.head)
        }
    }
}