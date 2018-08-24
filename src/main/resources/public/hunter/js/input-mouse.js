class InputMouse
{
    constructor(x, y)
    {
        this.x = x
        this.y = y
    }

    move(xDistance, yDistance)
    {
        this.x += xDistance
        this.y += yDistance
    }

    angleTo(point)
    {
        return point.subtract(new Point(this.x, this.y)).angle
    }
}