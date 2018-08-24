class Api
{
    static operation(binary)
    {
        return new Binary(binary).ubyte()
    }
}

Api.newPosition = {

    send: function(x, y, angle, left, right, up, down)
    {
        const binary = new Binary()

        binary.ubyte(API_OPERATION.newPosition)

        binary.float(x)
        binary.float(y)
        binary.float(angle)
        binary.bool(left)
        binary.bool(right)
        binary.bool(up)
        binary.bool(down)

        network.sendBinary(binary.build())
    },
    
    receive: function(data)
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
}

Api.newBullet = {

    send: function(x, y, angle)
    {
        const binary = new Binary()

        binary.ubyte(API_OPERATION.newBullet)

        binary.float(x)
        binary.float(y)
        binary.byte(angle)

        network.sendBinary(binary.build())
    },

    receive: function(data)
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