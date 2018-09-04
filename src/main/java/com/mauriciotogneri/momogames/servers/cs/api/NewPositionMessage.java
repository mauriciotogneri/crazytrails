package com.mauriciotogneri.momogames.servers.cs.api;

import com.mauriciotogneri.momogames.servers.cs.Message;
import com.mauriciotogneri.momogames.servers.cs.binary.BinaryPayload;

public class NewPositionMessage extends Message
{
    public float x;
    public float y;
    public float angle;
    public boolean left;
    public boolean right;
    public boolean up;
    public boolean down;

    public NewPositionMessage(Operation operation, BinaryPayload binaryPayload)
    {
        super(operation, binaryPayload);
    }
}