class Wall
{
    constructor(x, y, w, h)
    {
        this.body = Matter.Bodies.rectangle(x + (w/2), y + (h/2), w, h, {isStatic: true})

        physics.addBody(this.body, this)

        this.graphics = display.rectangle(x + (w/2), y + (h/2), w, h, '#555')
    }
}