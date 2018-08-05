class Direction
{
    static fromInput(code)
    {
        if (code == 37)
        {
            return DIRECTION_LEFT
        }
        else if (code == 39)
        {
            return DIRECTION_RIGHT
        }
        else if (code == 38)
        {
            return DIRECTION_UP
        }
        else if (code == 40)
        {
            return DIRECTION_DOWN
        }
        else
        {
            return DIRECTION_OTHER
        }
    }
}