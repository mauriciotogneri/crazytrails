class Binary
{
    constructor(data)
    {
        if (typeof data != 'undefined')
        {
            this.view = new DataView(data)
        }

        this.size      = 0
        this.values    = []
        this.types     = []
        this.positions = []
    }

    bool(value)
    {
        return this.process(BINARY_TYPE.bool, value)
    }

    byte(value)
    {
        return this.process(BINARY_TYPE.byte, value)
    }

    ubyte(value)
    {
        return this.process(BINARY_TYPE.ubyte, value)
    }

    short(value)
    {
        return this.process(BINARY_TYPE.short, value)
    }

    ushort(value)
    {
        return this.process(BINARY_TYPE.ushort, value)
    }

    int(value)
    {
        return this.process(BINARY_TYPE.int, value)
    }

    uint(value)
    {
        return this.process(BINARY_TYPE.uint, value)
    }

    float(value)
    {
        return this.process(BINARY_TYPE.float, value)
    }

    double(value)
    {
        return this.process(BINARY_TYPE.double, value)
    }

    process(type, value)
    {
        if (typeof value != 'undefined')
        {
            return this.put(type, value)
        }
        else
        {
            return this.get(type)
        }
    }

    put(type, value)
    {
        this.size += this.size % type.size

        this.values.push(value)
        this.types.push(type)
        this.positions.push(this.size)

        this.size += type.size

        return this.size
    }

    get(type)
    {
        const position = this.size + (this.size % type.size)
        this.size = position + type.size

        if (type == BINARY_TYPE.bool)
        {
            return this.view.getUint8(position)
        }
        else if (type == BINARY_TYPE.byte)
        {
            return this.view.getInt8(position)
        }
        else if (type == BINARY_TYPE.ubyte)
        {
            return this.view.getUint8(position)
        }
        else if (type == BINARY_TYPE.short)
        {
            return this.view.getInt16(position)
        }
        else if (type == BINARY_TYPE.ushort)
        {
            return this.view.getUint16(position)
        }
        else if (type == BINARY_TYPE.int)
        {
            return this.view.getInt32(position)
        }
        else if (type == BINARY_TYPE.uint)
        {
            return this.view.getUint32(position)
        }
        else if (type == BINARY_TYPE.float)
        {
            return this.view.getFloat32(position)
        }
        else if (type == BINARY_TYPE.double)
        {
            return this.view.getFloat64(position)
        }
    }

    build()
    {
        const buffer = new ArrayBuffer(this.size)
        const view = new DataView(buffer)

        for (var i = 0; i < this.values.length; i++)
        {
            var value    = this.values[i]
            var type     = this.types[i]
            var position = this.positions[i]

            if (type == BINARY_TYPE.bool)
            {
                view.setUint8(position, value)
            }
            else if (type == BINARY_TYPE.byte)
            {
                view.setInt8(position, value)
            }
            else if (type == BINARY_TYPE.ubyte)
            {
                view.setUint8(position, value)
            }
            else if (type == BINARY_TYPE.short)
            {
                view.setInt16(position, value)
            }
            else if (type == BINARY_TYPE.ushort)
            {
                view.setUint16(position, value)
            }
            else if (type == BINARY_TYPE.int)
            {
                view.setInt32(position, value)
            }
            else if (type == BINARY_TYPE.uint)
            {
                view.setUint32(position, value)
            }
            else if (type == BINARY_TYPE.float)
            {
                view.setFloat32(position, value)
            }
            else if (type == BINARY_TYPE.double)
            {
                view.setFloat64(position, value)
            }
        }

        return buffer
    }
}