package com.mauriciotogneri.momogames.servers.cs;

import com.mauriciotogneri.momogames.servers.cs.api.NewBulletMessage;
import com.mauriciotogneri.momogames.servers.cs.api.NewPositionMessage;
import com.mauriciotogneri.momogames.servers.cs.api.Operation;
import com.mauriciotogneri.momogames.servers.cs.binary.BinaryPayload;
import com.mauriciotogneri.momogames.servers.cs.binary.BinaryType;

import java.lang.reflect.Field;

public class Message
{
    protected final Operation operation;

    protected Message(Operation operation, BinaryPayload binaryPayload)
    {
        this.operation = operation;

        processBinary(binaryPayload);
    }

    private void processBinary(BinaryPayload binaryPayload)
    {
        for (Field field : getClass().getDeclaredFields())
        {
            try
            {
                field.set(this, value(field, binaryPayload));
            }
            catch (Exception e)
            {
                throw new RuntimeException(e);
            }
        }
    }

    private Object value(Field field, BinaryPayload binaryPayload)
    {
        return binaryPayload.get(BinaryType.fromField(field));
    }

    public static Message from(byte[] payload)
    {
        BinaryPayload binaryPayload = new BinaryPayload(payload);
        Operation operation = Operation.fromCode(binaryPayload.getUbyte());

        switch (operation)
        {
            case NEW_POSITION:
                return new NewPositionMessage(operation, binaryPayload);

            case NEW_BULLET:
                return new NewBulletMessage(operation, binaryPayload);

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