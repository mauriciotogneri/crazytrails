class Input
{
    static keyPress(code, pressed)
    {
        const direction = Direction.fromInput(code)

        if (direction != DIRECTION_OTHER)
        {
            Input.map[direction] = pressed

            if (Input.map[DIRECTION_LEFT])
            {
                Engine.processInput(DIRECTION_LEFT)
            }
            else if (Input.map[DIRECTION_RIGHT])
            {
                Engine.processInput(DIRECTION_RIGHT)
            }
            else if (Input.map[DIRECTION_UP])
            {
                Engine.processInput(DIRECTION_UP)
            }
            else if (Input.map[DIRECTION_DOWN])
            {
                Engine.processInput(DIRECTION_DOWN)
            }
            else
            {
                Engine.processInput(DIRECTION_NONE)
            }
        }
    }
}

Input.map = []

document.onkeydown = function(event)
{
    if (!event.repeat)
    {
        Input.keyPress(event.keyCode, true)
    }
}

document.onkeyup = function(event)
{
    if (!event.repeat)
    {
        Input.keyPress(event.keyCode, false)
    }
}