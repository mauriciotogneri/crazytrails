class Keyboard
{
    constructor()
    {
        this.keysPressed = []
        this.keysPressed[DIRECTION_LEFT]  = false
        this.keysPressed[DIRECTION_RIGHT] = false
        this.keysPressed[DIRECTION_UP]    = false
        this.keysPressed[DIRECTION_DOWN]  = false
    }

    keyPress(code, pressed)
    {
        const direction = this.fromInput(code)

        if (direction != DIRECTION_OTHER)
        {
            this.keysPressed[direction] = pressed

            game.processKeyboardInput(new Input(
                this.keysPressed[DIRECTION_LEFT],
                this.keysPressed[DIRECTION_RIGHT],
                this.keysPressed[DIRECTION_UP],
                this.keysPressed[DIRECTION_DOWN]
            ))
        }
    }

    fromInput(code)
    {
        if (code == 65)
        {
            return DIRECTION_LEFT
        }
        else if (code == 68)
        {
            return DIRECTION_RIGHT
        }
        else if (code == 87)
        {
            return DIRECTION_UP
        }
        else if (code == 83)
        {
            return DIRECTION_DOWN
        }
        else
        {
            return DIRECTION_OTHER
        }
    }

    /*init()
    {
        new Tool().onMouseMove = function(event)
        {
            game.processMouseInput(event.point)
        }
    }*/
}

document.onkeydown = function(event)
{
    if (!event.repeat)
    {
        input.keyPress(event.keyCode, true)
    }
}

document.onkeyup = function(event)
{
    if (!event.repeat)
    {
        input.keyPress(event.keyCode, false)
    }
}