class Wall
{
    constructor(x, y, w, h)
    {
        this.body = physics.rectangle(x + (w/2), y + (h/2), w, h)
        physics.addBody(this.body, this)

        this.mesh = display.cube(x + (w/2), y + (h/2), 0, w, h, 50, TEXTURE.brick)
        display.addMesh(this.mesh)
    }
}