Input = {}
Direction = {}

Input.direction = ''

Direction.UP     = 'up'
Direction.DOWN   = 'down'
Direction.LEFT   = 'left'
Direction.RIGHT  = 'right'

Input.keyDown = function(code)
{
    if ((code == 38) && (Input.direction != Direction.DOWN))
    {
        Input.direction = Direction.UP
    }
    else if ((code == 40) && (Input.direction != Direction.UP))
    {
        Input.direction = Direction.DOWN
    }
    else if ((code == 37) && (Input.direction != Direction.RIGHT))
    {
        Input.direction = Direction.LEFT
    }
    else if ((code == 39) && (Input.direction != Direction.LEFT))
    {
        Input.direction = Direction.RIGHT
    }
}

document.onkeydown = function(event)
{
    if (event.repeat) { return }
    Input.keyDown(event.keyCode)
}