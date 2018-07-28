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
        Network.send(Direction.UP)
        //Input.direction = Direction.UP
    }
    else if ((code == 40) && (Input.direction != Direction.UP))
    {
        Network.send(Direction.DOWN)
        //Input.direction = Direction.DOWN
    }
    else if ((code == 37) && (Input.direction != Direction.RIGHT))
    {
        Network.send(Direction.LEFT)
        //Input.direction = Direction.LEFT
    }
    else if ((code == 39) && (Input.direction != Direction.LEFT))
    {
        Network.send(Direction.RIGHT)
        //Input.direction = Direction.RIGHT
    }
}

document.onkeydown = function(event)
{
    if (event.repeat) { return }
    Input.keyDown(event.keyCode)
}