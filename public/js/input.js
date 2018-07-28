class Input
{
    static keyDown(code)
    {
        if (code == 38)
        {
            Engine.processInput(Direction.UP)
        }
        else if (code == 40)
        {
            Engine.processInput(Direction.DOWN)
        }
        else if (code == 37)
        {
            Engine.processInput(Direction.LEFT)
        }
        else if (code == 39)
        {
            Engine.processInput(Direction.RIGHT)
        }
    }
}

document.onkeydown = function(event)
{
    if (!event.repeat)
    {
        Input.keyDown(event.keyCode)
    }
}