class Input
{
    static keyPress(code, pressed)
    {
        Engine.processInput(Direction.fromInput(code), pressed)
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