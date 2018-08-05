package com.mauriciotogneri.crazytrails;

import com.mauriciotogneri.crazytrails.servers.CrazyTrailsServer;
import com.mauriciotogneri.crazytrails.servers.MubServer;
import com.mauriciotogneri.crazytrails.servers.PingServer;

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
        Server server = new Server(Integer.valueOf(System.getenv("PORT")));

        ServletContextHandler servletContext = new ServletContextHandler();
        servletContext.setContextPath("/");

        ServletHolder servletCrazyTrails = new ServletHolder(servletFor(CrazyTrailsServer.class));
        servletContext.addServlet(servletCrazyTrails, "/ws/crazytrails");

        ServletHolder servletMub = new ServletHolder(servletFor(MubServer.class));
        servletContext.addServlet(servletMub, "/ws/mub");

        ServletHolder servletPing = new ServletHolder(servletFor(PingServer.class));
        servletContext.addServlet(servletPing, "/ws/ping");

        ResourceHandler resourceHandler = new ResourceHandler();
        resourceHandler.setDirectoriesListed(false);
        resourceHandler.setResourceBase(publicDir(isLocal));
        resourceHandler.setCacheControl("max-age=0,public");

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