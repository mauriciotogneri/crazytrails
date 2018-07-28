class Head
{
    constructor(scene, direction)
    {
        this.direction = ''
        this.accumulation = 0
        this.sections = []
        this.scene = scene
        this.SIZE = 10

        this.shape = Engine.canvas.display.rectangle({
            x: 0,
            y: 0,
            width: this.SIZE,
            height: this.SIZE,
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
        if (this.direction != '')
        {
            const distance = (300 * delta)
            this.accumulation += distance

            const h = parseInt(this.shape.x / this.SIZE)
            const v = parseInt(this.shape.y / this.SIZE)

            if (this.accumulation >= this.SIZE)
            {
                this.accumulation -= this.SIZE

                const section = Engine.canvas.display.rectangle({
                    x: h * this.SIZE,
                    y: v * this.SIZE,
                    width: this.SIZE,
                    height: this.SIZE,
                    fill: "#0aa"
                })
        
                this.scene.add(section)

                this.sections.push(section)
            }
            
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
                this.direction = ''
            }
        
            if (this.shape.x > (1600 - this.SIZE))
            {
                this.shape.x = (1600 - this.SIZE)
                this.direction = ''
            }
        
            if (this.shape.y < 0)
            {
                this.shape.y = 0
                this.direction = ''
            }
        
            if (this.shape.y > (800 - this.SIZE))
            {
                this.shape.y = (800 - this.SIZE)
                this.direction = ''
            }
        }
    }
}