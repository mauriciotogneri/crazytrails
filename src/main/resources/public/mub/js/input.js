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
            Input.keysPressed[direction] = pressed

            Engine.processKeyboardInput(new Input(
                Input.keysPressed[DIRECTION_LEFT],
                Input.keysPressed[DIRECTION_RIGHT],
                Input.keysPressed[DIRECTION_UP],
                Input.keysPressed[DIRECTION_DOWN]
            ))
        }
    }

    static init()
    {
        new Tool().onMouseMove = function(event)
        {
            Engine.processMouseInput(event.point)
        }
    }
}

Input.keysPressed = []

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