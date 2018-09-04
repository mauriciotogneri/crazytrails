package com.mauriciotogneri.momogames.servers.cs.binary;

import java.lang.reflect.Field;

public enum BinaryType
{
    BOOL(1),
    BYTE(1),
    UBYTE(1),
    SHORT(2),
    USHORT(2),
    INT(4),
    UINT(4),
    FLOAT(4),
    DOUBLE(4);

    private final int size;

    BinaryType(int size)
    {
        this.size = size;
    }

    public int size()
    {
        return size;
    }

    public static BinaryType fromField(Field field)
    {
        if (field.getType().equals(boolean.class))
        {
            return BinaryType.BOOL;
        }
        else if (field.getType().equals(byte.class))
        {
            return BinaryType.BYTE;
        }
        else if (field.getType().equals(short.class))
        {
            return BinaryType.SHORT;
        }
        else if (field.getType().equals(int.class))
        {
            return BinaryType.INT;
        }
        else if (field.getType().equals(long.class))
        {
            return BinaryType.UINT;
        }
        else if (field.getType().equals(float.class))
        {
            return BinaryType.FLOAT;
        }
        else if (field.getType().equals(double.class))
        {
            return BinaryType.DOUBLE;
        }
        else
        {
            throw new RuntimeException();
        }
    }
}