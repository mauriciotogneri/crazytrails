class Bullet
{
    constructor(x, y, angle)
    {
        this.body = physics.circle(x, y, BULLET_SIZE)
        Matter.Body.setVelocity(this.body, this.velocity(angle))

        physics.addBody(this.body, this)

        //this.graphics = display.circle(x, y, 2, '#ffa500')

        sound.pistol()
    }

    velocity(angle)
    {
        return Matter.Vector.create(BULLET_SPEED, BULLET_SPEED)
    }

    onCollision()
    {
        Matter.World.remove(physics.engine.world, this.body)
        //this.graphics.remove()
    }

    render()
    {
        //this.graphics.position.x = this.body.position.x
        //this.graphics.position.y = this.body.position.y
    }
}