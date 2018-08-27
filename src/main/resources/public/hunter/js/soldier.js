class Soldier
{
    constructor(x, y, texture)
    {
        this.angle = 0
        this.inputKeyboard = new InputKeyboard(false, false, false, false)

        this.body = physics.circle(x, y, CHARACTER_SIZE)
        physics.addBody(this.body, this)

        this.mesh = display.sphere(x, y, -25, CHARACTER_SIZE, texture)
        display.addMesh(this.mesh)
    }

    update(delta)
    {
        const distance = (delta * DISTANCE_RATE)
        var xDistance  = 0
        var yDistance  = 0
        
        if (this.inputKeyboard.left)
        {
            xDistance = -distance
        }
        else if (this.inputKeyboard.right)
        {
            xDistance = distance
        }
        
        if (this.inputKeyboard.up)
        {
            yDistance = -distance
        }
        else if (this.inputKeyboard.down)
        {
            yDistance = distance
        }

        Matter.Body.setVelocity(this.body, Matter.Vector.create(xDistance, yDistance))

        if (this.angle != this.body.angle)
        {
            Matter.Body.setAngle(this.body, this.angle)
        }
    }

    render()
    {
        this.mesh.position.set(this.body.position.x, this.body.position.y, -25)
        this.mesh.rotation.z = this.body.angle
    }
}