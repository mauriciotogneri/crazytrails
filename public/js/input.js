class Input
{
    static keyPress(code, pressed)
    {
        if (code == 37)
        {
            Engine.processInput(Direction.LEFT, pressed)
        }
        else if (code == 39)
        {
            Engine.processInput(Direction.RIGHT, pressed)
        }
    }
}

document.onkeydown = function(event)
{
    Input.keyPress(event.keyCode, true)
}

document.onkeyup = function(event)
{
    Input.keyPress(event.keyCode, false)
}