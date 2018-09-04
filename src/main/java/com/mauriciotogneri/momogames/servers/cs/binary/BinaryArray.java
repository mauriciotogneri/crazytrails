package com.mauriciotogneri.momogames.servers.cs.binary;

import java.nio.ByteBuffer;

public class BinaryArray
{
    private final byte[] array;

    public BinaryArray(byte[] array)
    {
        this.array = array;
    }

    public boolean getBoolean(int position)
    {
        return (char) (buffer(position, BinaryType.BOOL.size()).get() & 0xff) != 0;
    }

    public byte getByte(int position)
    {
        return buffer(position, BinaryType.BYTE.size()).get();
    }

    public char getUbyte(int position)
    {
        return (char) (buffer(position, BinaryType.UBYTE.size()).get() & 0xff);
    }

    public short getShort(int position)
    {
        return buffer(position, BinaryType.SHORT.size()).getShort();
    }

    public int getUshort(int position)
    {
        return (buffer(position, BinaryType.USHORT.size()).get() & 0xffff);
    }

    public int getInt(int position)
    {
        return buffer(position, BinaryType.INT.size()).getInt();
    }

    public long getUint(int position)
    {
        return (buffer(position, BinaryType.UINT.size()).get() & 0xffffffffL);
    }

    public float getFloat(int position)
    {
        return buffer(position, BinaryType.FLOAT.size()).getFloat();
    }

    public double getDouble(int position)
    {
        return buffer(position, BinaryType.DOUBLE.size()).getDouble();
    }

    public String getString(int position)
    {
        int length = getUbyte(position);
        StringBuilder builder = new StringBuilder();

        for (int i = 0; i < length; i++)
        {
            builder.append(getUbyte(position + i + 1));
        }

        return builder.toString();
    }

    private ByteBuffer buffer(int offset, int length)
    {
        return ByteBuffer.wrap(array, offset, length);
    }
}