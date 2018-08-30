class Wall
{
    constructor(x, y, a, b, c)
    {
        this.body = physics.rectangle(x + (a/2), y + (b/2), a, b)
        physics.addBody(this.body, this)

        this.mesh = display.cube(x + (a/2), y + (b/2), 0, a, b, c, TEXTURE.walla, TEXTURE.wallb, 25)
        display.addMesh(this.mesh)
    }
}