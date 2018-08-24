class Api
{
    static operation(binary)
    {
        return new Binary(binary).ubyte()
    }

    static sendPosition(x, y, angle, left, right, up, down)
    {
        const binary = new Binary()

        binary.ubyte(API_OPERATION.sendPosition)

        binary.float(x)
        binary.float(y)

        binary.float(angle)

        binary.bool(left)
        binary.bool(right)
        binary.bool(up)
        binary.bool(down)

        network.sendBinary(binary.build())
    }

    static sendPositionResponse(data)
    {
        const binary = new Binary(data)
        binary.ubyte()

        return {
            x:     binary.float(),
            y:     binary.float(),
            angle: binary.float(),
            left:  binary.bool(),
            right: binary.bool(),
            up:    binary.bool(),
            down:  binary.bool(),
        }
    }

    static shootBullet(x, y, angle)
    {
        const binary = new Binary()

        binary.ubyte(API_OPERATION.shootBullet)

        binary.float(x)
        binary.float(y)

        binary.byte(angle)

        network.sendBinary(binary.build())
    }

    static shootBulletResponse(data)
    {
        const binary = new Binary(data)
        binary.ubyte()

        return {
            x:     binary.float(),
            y:     binary.float(),
            angle: binary.byte()
        }
    }
}