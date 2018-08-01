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
            this.removeLastPoint()
            this.path.add(this.head)
        }
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