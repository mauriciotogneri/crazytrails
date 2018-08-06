package com.mauriciotogneri.crazytrails.servers;

import org.eclipse.jetty.websocket.api.WebSocketAdapter;

import java.io.IOException;
import java.nio.ByteBuffer;

public class PingServer extends WebSocketAdapter
{
    @Override
    public void onWebSocketBinary(byte[] payload, int offset, int length)
    {
        try
        {
            getRemote().sendBytes(ByteBuffer.wrap(payload, offset, length));
        }
        catch (IOException e)
        {
            onWebSocketError(e);
        }
    }
}