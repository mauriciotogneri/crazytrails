package com.mauriciotogneri.momogames.servers.cs.binary;

public class BinaryPayload
{
    private int index = 0;
    private final BinaryArray array;

    public BinaryPayload(byte[] payload)
    {
        this.array = new BinaryArray(payload);
    }

    public boolean getBool()
    {
        return (Boolean) get(BinaryType.BOOL);
    }

    public byte getByte()
    {
        return (Byte) get(BinaryType.BYTE);
    }

    public char getUbyte()
    {
        return (Character) get(BinaryType.UBYTE);
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

    public String getString()
    {
        return (String) get(BinaryType.STRING);
    }

    public Object get(BinaryType type)
    {
        int position = this.index + (this.index % type.size());
        this.index = position + type.size();

        if (type == BinaryType.BOOL)
        {
            return array.getBoolean(position);
        }
        else if (type == BinaryType.BYTE)
        {
            return array.getByte(position);
        }
        else if (type == BinaryType.UBYTE)
        {
            return array.getUbyte(position);
        }
        else if (type == BinaryType.SHORT)
        {
            return array.getShort(position);
        }
        else if (type == BinaryType.USHORT)
        {
            return array.getUshort(position);
        }
        else if (type == BinaryType.INT)
        {
            return array.getInt(position);
        }
        else if (type == BinaryType.UINT)
        {
            return array.getUint(position);
        }
        else if (type == BinaryType.FLOAT)
        {
            return array.getFloat(position);
        }
        else if (type == BinaryType.DOUBLE)
        {
            return array.getDouble(position);
        }
        else if (type == BinaryType.STRING)
        {
            String result = array.getString(position);
            this.index += result.length();

            return result;
        }
        else
        {
            throw new RuntimeException();
        }
    }
}