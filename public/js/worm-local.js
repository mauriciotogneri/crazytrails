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

        const buffer = new ArrayBuffer(1 + 1 + 1 + 1 + 2 + 2 + 4 + (last.points.length * 4 * 2))
        
        const view = new DataView(buffer)
        view.setUint8(0, this.drawing ? 1 : 0)
        view.setUint8(1, this.direction)
        view.setUint8(2, 0) // unused
        view.setUint8(3, 0) // unused

        view.setUint16(4, last.from)
        view.setUint16(6, last.points.length)

        view.setFloat32(8, this.angle)
        
        var index = 12

        last.points.forEach(point =>
        {
            view.setFloat32(index,     point.x)
            view.setFloat32(index + 4, point.y)

            index += 8
        })

        Network.send(buffer)
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