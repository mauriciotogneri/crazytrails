package com.mauriciotogneri.momogames.tools;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class JsMap
{
    private final String path;

    public JsMap(String path)
    {
        this.path = path;
    }

    public void generate(int width, int height, List<Shape> shapes) throws IOException
    {
        BufferedWriter writer = new BufferedWriter(new FileWriter(path));
        writer.append(content(width, height, shapes));
        writer.close();
    }

    private String content(int width, int height, List<Shape> shapes)
    {
        StringBuilder builder = new StringBuilder();

        for (Shape shape : shapes)
        {
            if (builder.length() != 0)
            {
                builder.append(", ");
            }

            builder.append(shape.toString());
        }

        String shapesLine = String.format("const MAP = [%s]", builder.toString());
        String sizeLine = String.format("const MAP_SIZE = {width: %s, height: %s}", width, height);

        return String.format("%s\n%s", shapesLine, sizeLine);
    }
}