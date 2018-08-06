class Direction
{
    static fromInput(code)
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
}