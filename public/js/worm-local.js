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

        const buffer = new ArrayBuffer(1 + 1 + 1 + 1 + 4 + (last.length * 4 * 2))
        
        const view = new DataView(buffer)
        view.setUint8(0, this.drawing ? 1 : 0)
        view.setUint8(1, this.direction)
        view.setUint8(2, last.length)
        view.setUint8(3, 0) // unused

        view.setFloat32(4, this.angle)
        
        var index = 8

        last.forEach(point =>
        {
            view.setFloat32(index,     point.x)
            view.setFloat32(index + 4, point.y)

            index += 8
        })

        Network.send(buffer)
    }

    lastPositions()
    {
        var result = []

        if (this.path.segments.length < 10)
        {
            result = this.path.segments
        }
        else
        {
            result = this.path.segments.slice(this.path.segments.length - 10, this.path.segments.length)
        }

        return result.map(s => s.point)
    }
}