class WormRemote extends Worm
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)
    }

    processInput(data)
    {
        const binary    = new Binary(data)
        const drawing   = binary.bool()
        const direction = binary.ubyte()
        const from      = binary.uint()
        const points    = binary.uint()
        const angle     = binary.float()

        var x = binary.float()
        var y = binary.float()

        this.direction = direction
        this.angle     = angle

        this.path.removeSegments(from)

        for (var i = 0; i < points; i++)
        {
            x = binary.float()
            y = binary.float()

            this.path.add(new paper.Point([x, y]))
        }

        this.head.x = x
        this.head.y = y

        if (this.drawing != drawing)
        {
            this.startDrawing()
        }
    }
}