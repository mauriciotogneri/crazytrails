class WormRemote extends Worm
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)
    }

    processInput(data)
    {
        const array    = new Float32Array(data)
        const drawing  = array[4] == 1

        this.direction = array[0]
        this.angle     = array[1]
        this.head.x    = array[2]
        this.head.y    = array[3]

        if (this.drawing != drawing)
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