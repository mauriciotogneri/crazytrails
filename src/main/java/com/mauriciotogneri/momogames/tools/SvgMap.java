package com.mauriciotogneri.momogames.tools;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class SvgMap
{
    private final String path;

    public SvgMap(String path)
    {
        this.path = path;
    }

    public List<Shape> shapes() throws Exception
    {
        List<Element> result = new ArrayList<>();
        SAXBuilder builder = new SAXBuilder();
        Document document = builder.build(path);

        Element root = document.getRootElement();

        for (Element element : root.getChildren())
        {
            if (element.getName().equals("g"))
            {
                result.addAll(element.getChildren());
            }
        }

        return result.stream().map(Shape::fromElement).collect(Collectors.toList());
    }
}