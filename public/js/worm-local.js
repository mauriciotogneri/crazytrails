class WormLocal extends Worm
{
    constructor(x, y, angle, color)
    {
        super(x, y, angle, color)

        var that = this
        setTimeout(function()
        {
            that.startDrawing()
            that.sendPositionUpdate(that.direction)
        }, RESPAWN_TIME)
    }

    processInput(direction, pressed)
    {
        if (this.pressed != pressed)
        {
            this.pressed = pressed

            if ((!pressed) || (pressed && direction))
            {
                this.sendPositionUpdate(direction)
            }
        }

        this.updateDirection(direction, pressed)
    }

    sendPositionUpdate(direction)
    {
        const array = new Float32Array(6)
        array[0] = direction
        array[1] = this.pressed ? 1 : 0
        array[2] = this.angle
        array[3] = this.head.x
        array[4] = this.head.y
        array[5] = this.drawing ? 1 : 0

        Network.send(array)
    }
}