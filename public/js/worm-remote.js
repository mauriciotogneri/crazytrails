class WormRemote extends Worm
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)
    }

    processInput(data)
    {
        const view = new DataView(data)
        const drawing   = view.getUint8(0) == 1
        const direction = view.getUint8(1)
        const from      = view.getUint16(4)
        const points    = view.getUint16(6)
        const angle     = view.getFloat32(8)

        this.path.removeSegments(from)

        this.direction = direction
        this.angle     = angle

        var index = 12
        var x = 0
        var y = 0

        for (var i = 0; i < points; i++)
        {
            x = view.getFloat32(index)
            y = view.getFloat32(index + 4)

            index += 8

            this.path.add(new paper.Point([x, y]))
        }

        this.head.x = x
        this.head.y = y

        console.log(data.byteLength)

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