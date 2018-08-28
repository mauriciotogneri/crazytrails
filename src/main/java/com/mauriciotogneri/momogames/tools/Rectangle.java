package com.mauriciotogneri.momogames.tools;

public class Rectangle extends Shape
{
    private final float x;
    private final float y;
    private final float width;
    private final float height;

    public Rectangle(Style style, float x, float y, float width, float height)
    {
        super(style);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    @Override
    public String toString()
    {
        return String.format("{x:%s, y:%s, w:%s, h:%s}", x, y, width, height);
    }
}