class WormLocal extends Worm
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)

        var that = this
        setTimeout(function()
        {
            that.startDrawing()
            that.sendPositionUpdate()
        }, RESPAWN_TIME)
    }

    processInput(direction)
    {
        this.direction = direction

        this.sendPositionUpdate()
    }

    sendPositionUpdate()
    {
        const last = this.lastPositions()

        const binary = new Binary()
        binary.bool(this.drawing ? 1 : 0)
        binary.ubyte(this.direction)
        binary.uint(last.from)
        binary.uint(last.points.length)
        binary.float(this.angle)

        last.points.forEach(point =>
        {
            binary.float(point.x)
            binary.float(point.y)
        })

        //---------------

        const binary2    = new Binary(binary.build())
        const drawing   = binary2.bool()
        const direction = binary2.ubyte()
        const from      = binary2.uint()
        const points    = binary2.uint()
        const angle     = binary2.float()
        console.log()

        for (var i = 0; i < points; i++)
        {
            var x = binary2.float()
            var y = binary2.float()
            console.log()
        }

        //---------------

        Network.send(binary.build())
    }

    lastPositions()
    {
        var from   = 0
        var segments = []

        //if (this.path.segments.length < 10)
        //{
            segments = this.path.segments
        /*}
        else
        {
            from = this.path.segments.length - 10
            segments = this.path.segments.slice(from, this.path.segments.length)
        }*/

        return {
            from: from,
            points: segments.map(s => s.point)
        }
    }
}