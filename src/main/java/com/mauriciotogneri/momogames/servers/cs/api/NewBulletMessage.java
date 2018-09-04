package com.mauriciotogneri.momogames.servers.cs.api;

import com.mauriciotogneri.momogames.servers.cs.Message;
import com.mauriciotogneri.momogames.servers.cs.binary.BinaryPayload;

public class NewBulletMessage extends Message
{
    public float x;
    public float y;
    public float angle;

    public NewBulletMessage(Operation operation, BinaryPayload binaryPayload)
    {
        super(operation, binaryPayload);
    }
}