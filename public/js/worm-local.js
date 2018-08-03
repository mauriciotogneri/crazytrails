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

        Network.send(binary.build())
    }

    lastPositions()
    {
        var from   = 0
        var segments = []

        const TEST_SIZE = 10

        if (this.path.segments.length < TEST_SIZE)
        {
            segments = this.path.segments
        }
        else
        {
            from = this.path.segments.length - TEST_SIZE
            segments = this.path.segments.slice(from, this.path.segments.length)
        }

        return {
            from: from,
            points: segments.map(s => s.point)
        }
    }
}