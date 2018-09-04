package com.mauriciotogneri.momogames.servers.cs.api;

import com.mauriciotogneri.momogames.servers.cs.Message;
import com.mauriciotogneri.momogames.servers.cs.binary.Binary;

public class NewBulletMessage extends Message
{
    public float x;
    public float y;
    public float angle;

    public NewBulletMessage(Operation operation, Binary binary)
    {
        super(operation, binary);
    }
}