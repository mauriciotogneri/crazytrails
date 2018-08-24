package com.mauriciotogneri.momogames.servers;

import org.eclipse.jetty.websocket.api.RemoteEndpoint;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;

public class HunterServer extends WebSocketAdapter
{
    private static List<RemoteEndpoint> remotes = new ArrayList<>();

    public void onWebSocketConnect(Session session)
    {
        super.onWebSocketConnect(session);

        remotes.add(getRemote());
    }

    public void onWebSocketClose(int statusCode, String reason)
    {
        remotes.remove(getRemote());

        super.onWebSocketClose(statusCode, reason);
    }

    public void onWebSocketError(Throwable cause)
    {
        cause.printStackTrace();
    }

    @Override
    public void onWebSocketText(String message)
    {
        RemoteEndpoint own = getRemote();

        for (RemoteEndpoint remote : remotes)
        {
            if (remote != own)
            {
                try
                {
                    remote.sendString(message);
                }
                catch (IOException e)
                {
                    onWebSocketError(e);
                }
            }
        }
    }

    @Override
    public void onWebSocketBinary(byte[] payload, int offset, int length)
    {
        /*System.out.println(ByteBuffer.wrap(payload, 0, 4).getFloat());
        System.out.println(ByteBuffer.wrap(payload, 4, 4).getFloat());

        System.out.println(ByteBuffer.wrap(payload, 8, 4).getFloat());

        System.out.println(ByteBuffer.wrap(payload, 12, 1).get());
        System.out.println(ByteBuffer.wrap(payload, 13, 1).get());
        System.out.println(ByteBuffer.wrap(payload, 14, 1).get());
        System.out.println(ByteBuffer.wrap(payload, 15, 1).get());

        System.out.println("===================================");*/

        RemoteEndpoint own = getRemote();

        for (RemoteEndpoint remote : remotes)
        {
            if (remote != own)
            {
                try
                {
                    remote.sendBytes(ByteBuffer.wrap(payload, offset, length));
                }
                catch (IOException e)
                {
                    onWebSocketError(e);
                }
            }
        }
    }
}