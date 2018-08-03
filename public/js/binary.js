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
        return this.process(TYPE.bool, value)
    }

    byte(value)
    {
        return this.process(TYPE.byte, value)
    }

    ubyte(value)
    {
        return this.process(TYPE.ubyte, value)
    }

    short(value)
    {
        return this.process(TYPE.short, value)
    }

    ushort(value)
    {
        return this.process(TYPE.ushort, value)
    }

    int(value)
    {
        return this.process(TYPE.int, value)
    }

    uint(value)
    {
        return this.process(TYPE.uint, value)
    }

    float(value)
    {
        return this.process(TYPE.float, value)
    }

    double(value)
    {
        return this.process(TYPE.double, value)
    }

    process(type, value)
    {
        if (typeof value != 'undefined')
        {
            return this.put(value, type)
        }
        else
        {
            return this.get(type)
        }
    }

    put(value, type)
    {
        this.size += this.size % type

        this.values.push(value)
        this.types.push(type)
        this.positions.push(this.size)

        this.size += type

        return this.size
    }

    get(type)
    {
        this.size += this.size % type

        if (type == TYPE.byte)
        {
            return view.getUint8(this.size)
        }
        else if (type == TYPE.ubyte)
        {
            return view.getUint8(this.size)
        }
        else if (type == TYPE.short)
        {
            return view.getInt16(this.size)
        }
        else if (type == TYPE.ushort)
        {
            return view.getUint16(this.size)
        }
        else if (type == TYPE.int)
        {
            return view.getInt32(this.size)
        }
        else if (type == TYPE.uint)
        {
            return view.getUint32(this.size)
        }
        else if (type == TYPE.float)
        {
            return view.getFloat32(this.size)
        }
        else if (type == TYPE.double)
        {
            return view.getFloat64(this.size)
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

            if (type == TYPE.byte)
            {
                view.setInt8(position, value)
            }
            else if (type == TYPE.ubyte)
            {
                view.setUint8(position, value)
            }
            else if (type == TYPE.short)
            {
                view.setInt16(position, value)
            }
            else if (type == TYPE.ushort)
            {
                view.setUint16(position, value)
            }
            else if (type == TYPE.int)
            {
                view.setInt32(position, value)
            }
            else if (type == TYPE.uint)
            {
                view.setUint32(position, value)
            }
            else if (type == TYPE.float)
            {
                view.setFloat32(position, value)
            }
            else if (type == TYPE.double)
            {
                view.setFloat64(position, value)
            }
        }

        return buffer
    }
}