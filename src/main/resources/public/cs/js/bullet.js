class Bullet
{
    constructor(x, y, angle)
    {
        const finalx = x - (Math.cos(angle) * (CHARACTER_SIZE + (BULLET_SIZE * 2)))
        const finaly = y - (Math.sin(angle) * (CHARACTER_SIZE + (BULLET_SIZE * 2)))

        this.body = physics.circle(finalx, finaly, BULLET_SIZE)
        physics.addBody(this.body, this)

        Matter.Body.setVelocity(this.body, this.velocity(angle))

        this.mesh = display.sphere(finalx, finaly, 0, BULLET_SIZE, TEXTURE.ball)
        display.addMesh(this.mesh)

        sound.pistol()
    }

    velocity(angle)
    {
        return Matter.Vector.create(-Math.cos(angle) * BULLET_SPEED, -Math.sin(angle) * BULLET_SPEED)
    }

    onCollision()
    {
        Matter.World.remove(physics.engine.world, this.body)
        
        display.removeMesh(this.mesh)
        this.mesh = undefined
    }

    render()
    {
        this.mesh.position.set(this.body.position.x, this.body.position.y, 0)
    }
}