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

        this.direction = direction
        this.angle     = angle

        var x = this.head.x
        var y = this.head.y

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
        
        /*if (this.drawing)
        {
            const closest = this.closestSegment(this.head.x, this.head.y)

            if (closest != -1)
            {
                this.path.removeSegments(closest)
            }
            else
            {
                this.removeLastSegment()
            }

            this.path.add(this.head)
        }*/
    }

    /*closestSegment(x, y)
    {
        var index = -1
        var min   = 2

        const point = new paper.Point([x, y])
        const segments = this.path.segments

        for (var i = segments.length - 20; (i >= 0) && (i < segments.length); i++)
        {
            var distance = segments[i].point.getDistance(point)

            if (distance < min)
            {
                min = distance
                index = i
            }
        }

        return index
    }*/
}