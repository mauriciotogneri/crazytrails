package com.mauriciotogneri.crazytrails;

import org.eclipse.jetty.websocket.api.RemoteEndpoint;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;

public class EchoSocket extends WebSocketAdapter
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

    public void onWebSocketText(String message)
    {
        try
        {
            getRemote().sendString(message);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }

    @Override
    public void onWebSocketBinary(byte[] payload, int offset, int length)
    {
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
                    e.printStackTrace();
                }
            }
        }
    }
}