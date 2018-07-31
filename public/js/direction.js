Direction = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
}

Direction.fromInput = function(code)
{
    if (code == 37)
    {
        return Direction.LEFT
    }
    else if (code == 39)
    {
        return Direction.RIGHT
    }
}