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
        const buffer = new ArrayBuffer(1 + 1 + 1 + 1 + 4 + 4 + 4)
        
        const view = new DataView(buffer)
        view.setUint8(0, this.drawing ? 1 : 0)
        view.setUint8(1, this.direction)
        view.setFloat32(4, this.angle)
        view.setFloat32(8, this.head.x)
        view.setFloat32(12, this.head.y)

        Network.send(buffer)
    }
}