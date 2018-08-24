package com.mauriciotogneri.momogames;

import com.mauriciotogneri.momogames.servers.HunterServer;
import com.mauriciotogneri.momogames.servers.PingServer;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.websocket.servlet.WebSocketServlet;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

import java.io.File;

import javax.servlet.Servlet;

public class Main
{
    public static void main(String[] args) throws Exception
    {
        Boolean isLocal = Boolean.parseBoolean(System.getenv("IS_LOCAL"));

        ServletContextHandler servletContext = new ServletContextHandler(null, "/");
        servletContext.addServlet(new ServletHolder(servletFor(HunterServer.class)), "/ws/hunter");
        servletContext.addServlet(new ServletHolder(servletFor(PingServer.class)), "/ws/ping");

        ResourceHandler resourceHandler = new ResourceHandler();
        resourceHandler.setDirectoriesListed(false);
        resourceHandler.setResourceBase(publicDir(isLocal));
        resourceHandler.setCacheControl("max-age=0,public");

        Server server = new Server(Integer.valueOf(System.getenv("PORT")));
        server.setHandler(new HandlerList(resourceHandler, servletContext));
        server.start();
        server.join();
    }

    private static String publicDir(boolean isLocal)
    {
        if (isLocal)
        {
            return String.format("%s/src/main/resources/public", new File(".").getAbsolutePath());
        }
        else
        {
            return Main.class.getClassLoader().getResource("public").toExternalForm();
        }
    }

    private static Servlet servletFor(Class<?> clazz)
    {
        return new WebSocketServlet()
        {
            @Override
            public void configure(WebSocketServletFactory factory)
            {
                factory.register(clazz);
            }
        };
    }
}