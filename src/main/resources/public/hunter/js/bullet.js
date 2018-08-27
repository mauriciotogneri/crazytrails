class Bullet
{
    constructor(x, y, angle)
    {
        this.body = physics.circle(x, y, BULLET_SIZE)
        physics.addBody(this.body, this)

        //Matter.Body.setVelocity(this.body, this.velocity(angle))

        this.mesh = display.sphere(x, y, -25, BULLET_SIZE, TEXTURE.ball)
        display.addMesh(this.mesh)

        sound.pistol()
    }

    velocity(angle)
    {
        return Matter.Vector.create(BULLET_SPEED, BULLET_SPEED)
    }

    onCollision()
    {
        //Matter.World.remove(physics.engine.world, this.body)
        //this.graphics.remove()
    }

    render()
    {
        //this.mesh.position.set(this.body.position.x, this.body.position.y, -25)
    }
}