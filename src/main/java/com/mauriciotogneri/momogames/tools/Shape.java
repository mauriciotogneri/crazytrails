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
        Style style = style(element.getAttribute("style").getValue());
        float x = Float.parseFloat(element.getAttribute("x").getValue());
        float y = Float.parseFloat(element.getAttribute("y").getValue());
        float width = Float.parseFloat(element.getAttribute("width").getValue());
        float height = Float.parseFloat(element.getAttribute("height").getValue());

        return new Rectangle(style, x, y, width, height);
    }
}