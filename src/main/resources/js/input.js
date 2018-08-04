class Input
{
    static keyPress(code, pressed)
    {
        const direction = Direction.fromInput(code)

        if (direction != DIRECTION_OTHER)
        {
            Input.map[direction] = pressed

            const left  = Input.map[DIRECTION_LEFT]
            const right = Input.map[DIRECTION_RIGHT]

            if (!left && !right && (Input.lastDirection != DIRECTION_STRAIGHT))
            {
                Input.lastDirection = DIRECTION_STRAIGHT
                Engine.processInput(DIRECTION_STRAIGHT)
            }
            else if (left && !right && (Input.lastDirection != DIRECTION_LEFT))
            {
                Input.lastDirection = DIRECTION_LEFT
                Engine.processInput(DIRECTION_LEFT)
            }
            else if (!left && right && (Input.lastDirection != DIRECTION_RIGHT))
            {
                Input.lastDirection = DIRECTION_RIGHT
                Engine.processInput(DIRECTION_RIGHT)
            }
            else if (left && right)
            {
                if (Input.lastDirection == DIRECTION_LEFT)
                {
                    Input.lastDirection = DIRECTION_RIGHT
                    Engine.processInput(DIRECTION_RIGHT)
                }
                else if (Input.lastDirection == DIRECTION_RIGHT)
                {
                    Input.lastDirection = DIRECTION_LEFT
                    Engine.processInput(DIRECTION_LEFT)
                }
            }
        }
    }
}

Input.map = []
Input.lastDirection = DIRECTION_STRAIGHT

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