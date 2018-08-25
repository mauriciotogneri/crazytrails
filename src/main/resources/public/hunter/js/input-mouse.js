class InputMouse
{
    constructor(x, y)
    {
        this.x = x
        this.y = y
        const canvas = $("#canvas")
        this.center = new Point(canvas.width/2, canvas.height/2)
    }

    move(xDistance, yDistance)
    {
        this.x += xDistance
        this.y += yDistance
    }

    orientation()
    {
        const angle = (this.center.subtract(new Point(this.x, this.y)).angle + 360) % 360
        
        if ((angle >= 45) && (angle <= 135)) // up
        {
            return Math.PI / 2
        }
        else if ((angle >= 135) && (angle <= 225)) // right
        {
            return Math.PI
        }
        else if ((angle >= 225) && (angle <= 315)) // down
        {
            return -Math.PI / 2
        }
        else if ((angle >= 315) || (angle <= 45)) // left
        {
            return 0
        }
    }
}