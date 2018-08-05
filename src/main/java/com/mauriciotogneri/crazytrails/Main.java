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

import javax.servlet.Servlet;

public class Main
{
    public static void main(String[] args) throws Exception
    {
        Server server = new Server(Integer.valueOf(System.getenv("PORT")));

        ServletContextHandler servletContext = new ServletContextHandler();
        servletContext.setContextPath("/");

        ServletHolder servletCrazyTrails = new ServletHolder(servletFor(CrazyTrailsServer.class));
        servletContext.addServlet(servletCrazyTrails, "/ws/crazytrails");

        ServletHolder servletMub = new ServletHolder(servletFor(MubServer.class));
        servletContext.addServlet(servletMub, "/ws/mub");

        ServletHolder servletPing = new ServletHolder(servletFor(PingServer.class));
        servletContext.addServlet(servletPing, "/ws/ping");

        String publicDir = Main.class.getClassLoader().getResource("public").toExternalForm();
        ResourceHandler resourceHandler = new ResourceHandler();
        resourceHandler.setDirectoriesListed(false);
        resourceHandler.setResourceBase(publicDir);

        server.setHandler(new HandlerList(resourceHandler, servletContext));

        server.start();
        server.join();
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