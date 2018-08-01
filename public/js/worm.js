class Worm
{
    constructor(x, y, angle, color, isLocal)
    {
        this.direction = 0
        this.drawing   = false
        this.pressed   = false

        this.path = new paper.Path({
            strokeColor: color,
            strokeWidth: HEAD_SIZE,
            strokeCap: 'round'/*,
            fullySelected: true*/
        })
        
        this.head  = new paper.Point(x, y)
        this.angle = angle

        this.circle = new paper.Path.Circle({
            center: [x, y],
            radius: HEAD_SIZE/2,
            fillColor: color
        })

        if (isLocal)
        {
            var that = this
            setTimeout(function()
            {
                that.startDrawing()
            }, 3000)
        }
    }

    startDrawing()
    {
        this.drawing = true
        this.path.add(this.head)
        this.path.add(this.head)
    }

    processLocalInput(direction, pressed)
    {
        if (this.pressed != pressed)
        {
            if ((!pressed) || (pressed && direction))
            {
                this.pressed = pressed

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

        this.updatePosition(direction, pressed)
    }

    processRemoteInput(data)
    {
        const array = new Float32Array(data)
        const direction = array[0]
        const pressed = array[1] == 1
        const angle = array[2]
        const x = array[3]
        const y = array[4]
        const drawing = array[5] == 1

        if (drawing != this.drawing)
        {
            this.startDrawing()
        }

        this.drawing = drawing

        this.updatePosition(direction, pressed)

        this.angle  = angle
        this.head.x = x
        this.head.y = y

        if (this.drawing)
        {
            this.removeLastPoint()
            this.path.add(this.head)
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

    removeLastPoint()
    {
        this.path.removeSegment(this.path.segments.length - 1)
    }

    move(delta)
    {
        const distance = (delta * DISTANCE_RATE)
        const rotation = (delta * ROTATION_RATE)
        var turned     = true
        
        if (this.direction == DIRECTION_LEFT)
        {
            this.angle -= rotation
        }
        else if (this.direction == DIRECTION_RIGHT)
        {
            this.angle += rotation
        }
        else
        {
            turned = false
        }

        const vector = new paper.Point({
            length: distance,
            angle: this.angle
        })

        this.head = this.head.add(vector)

        if (!this.drawing)
        {
            this.circle.remove()
            this.circle = new paper.Path.Circle({
                center: [this.head.x, this.head.y],
                radius: HEAD_SIZE / 2,
                fillColor: this.circle.fillColor
            })
        }

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

        if (this.drawing)
        {
            if (!turned)
            {
                this.removeLastPoint()
            }

            this.path.add(this.head)
        }
    }
}