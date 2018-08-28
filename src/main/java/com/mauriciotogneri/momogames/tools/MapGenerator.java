package com.mauriciotogneri.momogames.tools;

public class MapGenerator
{
    public static void main(String[] args) throws Exception
    {
        MapGenerator mapGenerator = new MapGenerator();
        mapGenerator.generate(args[0], args[1]);
    }

    private void generate(String inputPath, String outputPath) throws Exception
    {
        SvgMap svgMap = new SvgMap(inputPath);
        JsMap jsMap = new JsMap(outputPath);

        jsMap.generate(svgMap.shapes());
    }
}