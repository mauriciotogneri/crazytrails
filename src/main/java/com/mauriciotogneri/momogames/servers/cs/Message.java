package com.mauriciotogneri.momogames.servers.cs;

import com.mauriciotogneri.momogames.servers.cs.api.NewBulletMessage;
import com.mauriciotogneri.momogames.servers.cs.api.NewPositionMessage;
import com.mauriciotogneri.momogames.servers.cs.api.Operation;
import com.mauriciotogneri.momogames.servers.cs.binary.Binary;
import com.mauriciotogneri.momogames.servers.cs.binary.BinaryType;

import java.lang.reflect.Field;

public class Message
{
    protected final Operation operation;

    protected Message(Operation operation, Binary binary)
    {
        this.operation = operation;

        processBinary(binary);
    }

    private void processBinary(Binary binary)
    {
        for (Field field : getClass().getDeclaredFields())
        {
            try
            {
                field.set(this, value(field, binary));
            }
            catch (Exception e)
            {
                throw new RuntimeException(e);
            }
        }
    }

    private Object value(Field field, Binary binary)
    {
        return binary.get(BinaryType.fromField(field));
    }

    public static Message from(byte[] payload)
    {
        Binary binary = new Binary(payload);
        Operation operation = Operation.fromCode(binary.getUbyte());

        switch (operation)
        {
            case NEW_POSITION:
                return new NewPositionMessage(operation, binary);

            case NEW_BULLET:
                return new NewBulletMessage(operation, binary);

            default:
                throw new RuntimeException();
        }
    }

    @Override
    public String toString()
    {
        StringBuilder builder = new StringBuilder();

        for (Field field : getClass().getDeclaredFields())
        {
            try
            {
                if (builder.length() != 0)
                {
                    builder.append(", ");
                }

                builder.append(field.getName());
                builder.append(": ");
                builder.append(field.get(this));
            }
            catch (Exception e)
            {
                throw new RuntimeException(e);
            }
        }

        return String.format("{operation: %s, %s}", operation.toString(), builder.toString());
    }
}