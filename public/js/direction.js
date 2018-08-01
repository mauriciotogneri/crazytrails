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
        else
        {
            return DIRECTION_OTHER
        }
    }
}