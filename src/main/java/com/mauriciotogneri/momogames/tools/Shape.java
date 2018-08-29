package com.mauriciotogneri.momogames.tools;

import org.jdom2.Element;

public class Shape
{
    protected final Style style;

    public Shape(Style style)
    {
        this.style = style;
    }

    private static Style style(String input)
    {
        Style style = new Style();

        for (String pair : input.split(";"))
        {
            String[] parts = pair.split(":");
            style.put(parts[0].trim(), parts[1].trim());
        }

        return style;
    }

    public static Shape fromElement(Element element)
    {
        try
        {
            Style style = style(element.getAttribute("style").getValue());
            float x = element.getAttribute("x").getFloatValue();
            float y = element.getAttribute("y").getFloatValue();
            float width = element.getAttribute("width").getFloatValue();
            float height = element.getAttribute("height").getFloatValue();

            return new Rectangle(style, x, y, width, height);
        }
        catch (Exception e)
        {
            throw new RuntimeException(e);
        }
    }
}