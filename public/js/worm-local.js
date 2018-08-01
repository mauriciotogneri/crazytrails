class WormLocal extends Worm
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)

        var that = this
        setTimeout(function()
        {
            that.startDrawing()

            const array = new Float32Array(6)
            array[0] = that.direction
            array[1] = that.pressed ? 1 : 0
            array[2] = that.angle
            array[3] = that.head.x
            array[4] = that.head.y
            array[5] = that.drawing ? 1 : 0

            Network.send(array)
        }, RESPAWN_TIME)
    }

    processInput(direction, pressed)
    {
        if (this.pressed != pressed)
        {
            this.pressed = pressed

            if ((!pressed) || (pressed && direction))
            {
                const array = new Float32Array(6)
                array[0] = direction
                array[1] = pressed ? 1 : 0
                array[2] = this.angle
                array[3] = this.head.x
                array[4] = this.head.y
                array[5] = this.drawing ? 1 : 0

                Network.send(array)
            }
        }

        this.updateDirection(direction, pressed)
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
                this.removeLastPoint()
            }

            this.path.add(this.head)
        }
    }
}