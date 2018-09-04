package com.mauriciotogneri.momogames.servers.cs.api;

public enum Operation
{
    NEW_POSITION(1),
    NEW_BULLET(2);

    private final int code;

    Operation(int code)
    {
        this.code = code;
    }

    public static Operation fromCode(int code)
    {
        for (Operation operation : values())
        {
            if (operation.code == code)
            {
                return operation;
            }
        }

        throw new RuntimeException();
    }
}