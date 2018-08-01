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
        const array = new Float32Array(6)
        array[0] = this.direction
        array[1] = this.angle
        array[2] = this.head.x
        array[3] = this.head.y
        array[4] = this.drawing ? 1 : 0

        Network.send(array)
    }
}