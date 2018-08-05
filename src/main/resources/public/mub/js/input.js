class Input
{
    constructor(left, right, up, down)
    {
        this.left  = left
        this.right = right
        this.up    = up
        this.down  = down
    }

    static keyPress(code, pressed)
    {
        const direction = Direction.fromInput(code)

        if (direction != DIRECTION_OTHER)
        {
            Input.map[direction] = pressed

            Engine.processKeyboardInput(new Input(
                Input.map[DIRECTION_LEFT],
                Input.map[DIRECTION_RIGHT],
                Input.map[DIRECTION_UP],
                Input.map[DIRECTION_DOWN]
            ))
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