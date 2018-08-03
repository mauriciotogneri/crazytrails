class WormRemote extends Worm
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)

        this.received = []
    }

    processInput(data)
    {
        const view = new DataView(data)
        const drawing  = view.getUint8(0) == 1

        this.direction = view.getUint8(1)
        this.angle     = view.getFloat32(4)
        this.head.x    = view.getFloat32(8)
        this.head.y    = view.getFloat32(12)

        this.received.push({
            x: this.head.x,
            y: this.head.y
        })

        if (this.drawing != drawing)
        {
            this.startDrawing()
        }
        
        if (this.drawing)
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
        }
    }

    closestSegment(x, y)
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
    }
}