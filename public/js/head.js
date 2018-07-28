class Head
{
    constructor(scene, direction)
    {
        this.direction = ''

        this.shape = Engine.canvas.display.rectangle({
            x: 0,
            y: 0,
            width: 20,
            height: 20,
            fill: "#0aa"
        })

        scene.add(this.shape)
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
        const distance = (300 * delta)

        if (this.direction == Direction.UP)
        {
            this.shape.y -= distance
        }
        else if (this.direction == Direction.DOWN)
        {
            this.shape.y += distance
        }
        else if (this.direction == Direction.LEFT)
        {
            this.shape.x -= distance
        }
        else if (this.direction == Direction.RIGHT)
        {
            this.shape.x += distance
        }

        if (this.shape.x < 0)
        {
            this.shape.x = 0
        }
    
        if (this.shape.x > 1580)
        {
            this.shape.x = 1580
        }
    
        if (this.shape.y < 0)
        {
            this.shape.y = 0
        }
    
        if (this.shape.y > 780)
        {
            this.shape.y = 780
        }
    }
}