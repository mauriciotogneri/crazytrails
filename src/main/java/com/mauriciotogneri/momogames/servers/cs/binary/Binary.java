package com.mauriciotogneri.momogames.servers.cs.binary;

import java.nio.ByteBuffer;

public class Binary
{
    private int size = 0;
    private final byte[] payload;

    public Binary(byte[] payload)
    {
        this.payload = payload;
    }

    public boolean getBool()
    {
        return (Boolean) get(BinaryType.BOOL);
    }

    public byte getByte()
    {
        return (Byte) get(BinaryType.BYTE);
    }

    public short getUbyte()
    {
        return (Short) get(BinaryType.UBYTE);
    }

    public short getShort()
    {
        return (Short) get(BinaryType.SHORT);
    }

    public int getUshort()
    {
        return (Integer) get(BinaryType.USHORT);
    }

    public int getInt()
    {
        return (Integer) get(BinaryType.INT);
    }

    public long getUint()
    {
        return (Long) get(BinaryType.UINT);
    }

    public float getFloat()
    {
        return (Float) get(BinaryType.FLOAT);
    }

    public double getDouble()
    {
        return (Double) get(BinaryType.DOUBLE);
    }

    public Object get(BinaryType type)
    {
        int position = this.size + (this.size % type.size());
        this.size = position + type.size();

        if (type == BinaryType.BOOL)
        {
            return (buffer(position, type.size()).get() & 0xff) != 0;
        }
        else if (type == BinaryType.BYTE)
        {
            return buffer(position, type.size()).get();
        }
        else if (type == BinaryType.UBYTE)
        {
            return (short) (buffer(position, type.size()).get() & 0xff);
        }
        else if (type == BinaryType.SHORT)
        {
            return buffer(position, type.size()).getShort();
        }
        else if (type == BinaryType.USHORT)
        {
            return (buffer(position, type.size()).get() & 0xffff);
        }
        else if (type == BinaryType.INT)
        {
            return buffer(position, type.size()).getInt();
        }
        else if (type == BinaryType.UINT)
        {
            return (buffer(position, type.size()).get() & 0xffffffffL);
        }
        else if (type == BinaryType.FLOAT)
        {
            return buffer(position, type.size()).getFloat();
        }
        else if (type == BinaryType.DOUBLE)
        {
            return buffer(position, type.size()).getDouble();
        }
        else
        {
            throw new RuntimeException();
        }
    }

    private ByteBuffer buffer(int offset, int length)
    {
        return ByteBuffer.wrap(payload, offset, length);
    }
}