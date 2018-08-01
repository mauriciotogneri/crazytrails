class WormRemote extends Worm
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)

        this.received = []
    }

    processInput(data)
    {
        const array    = new Float32Array(data)
        const drawing  = array[4] == 1

        this.direction = array[0]
        this.angle     = array[1]
        this.head.x    = array[2]
        this.head.y    = array[3]

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
                console.log('FEW: ' + (this.path.segments.length - closest))
                this.path.removeSegments(closest)
            }
            else
            {
                this.removeLastSegment()
                console.log('ONE')
            }

            this.path.add(this.head)
        }
    }

    closestSegment(x, y)
    {
        var index = -1
        var min   = 1

        const point = new paper.Point([x, y])
        const segments = this.path.segments

        for (var i = segments.length - 10; (i >= 0) && (i < segments.length); i++)
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

    debug()
    {
        var text1 = ''
        var text2 = ''

        this.path.segments.forEach(element =>
        {
            if (text1 != '')
            {
                text1 += ","
            }

            text1 += element.point
        })

        this.received.forEach(element =>
        {
            if (text2 != '')
            {
                text2 += ","
            }

            text2 += "{ x: " + element.x + ", y: " + element.y + " }"
        })

        console.log("[" + text1 + "]")
        console.log("[" + text2 + "]")
    }
}