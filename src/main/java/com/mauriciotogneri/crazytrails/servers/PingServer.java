package com.mauriciotogneri.crazytrails.servers;

import org.eclipse.jetty.websocket.api.WebSocketAdapter;

import java.io.IOException;

public class PingServer extends WebSocketAdapter
{
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
}