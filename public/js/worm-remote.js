class WormRemote extends Worm
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)
    }

    processInput(data)
    {
        const array = new Float32Array(data)
        const direction = array[0]
        const pressed = array[1] == 1
        const angle = array[2]
        const x = array[3]
        const y = array[4]
        const drawing = array[5] == 1

        this.updateDirection(direction, pressed)

        this.angle  = angle
        this.head.x = x
        this.head.y = y

        if (drawing != this.drawing)
        {
            this.startDrawing()
        }

        //this.drawing = drawing

        if (this.drawing)
        {
            this.removeLastPoint()
            this.path.add(this.head)
        }
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