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
        
        if (this.drawing)
        {
            this.removeLastPoint()
            this.path.add(this.head)
        }
    }
}