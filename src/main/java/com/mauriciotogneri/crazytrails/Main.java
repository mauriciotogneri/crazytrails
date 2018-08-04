package com.mauriciotogneri.crazytrails;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class Main
{
    public static void main(String[] args) throws Exception
    {
        Server server = new Server(Integer.valueOf(System.getenv("PORT")));

        ServletContextHandler servletContext = new ServletContextHandler();
        servletContext.setContextPath("/");

        ServletHolder servletHolder = new ServletHolder(new EchoSocketServlet());
        servletContext.addServlet(servletHolder, "/server");

        String publicDir = Main.class.getClassLoader().getResource("public").toExternalForm();
        ResourceHandler resourceHandler = new ResourceHandler();
        resourceHandler.setDirectoriesListed(false);
        resourceHandler.setResourceBase(publicDir);

        server.setHandler(new HandlerList(resourceHandler, servletContext));

        server.start();
        server.join();
    }
}