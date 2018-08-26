class Wall
{
    constructor(x, y, w, h)
    {
        this.body = Matter.Bodies.rectangle(x + (w/2), y + (h/2), w, h, {isStatic: true})
        physics.addBody(this.body, this)

        this.mesh = display.rectangle(x + (w/2), y + (h/2), w, h, 500, TEXTURE.brick)
        display.addMesh(this.mesh)
    }
}