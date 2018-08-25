class Bullet
{
    constructor(x, y, angle)
    {
        this.body = Matter.Bodies.circle(this.x(x, angle), this.y(y, angle), BULLET_SIZE, {
            density: 1,
            friction: 0,
            frictionAir: 0,
            restitution: 0
        })

        Matter.Body.setVelocity(this.body, this.velocity(angle))

        physics.addBody(this.body, this, CLASS.bullet)

        this.graphics = new Path.Circle({
            center: [x, y],
            radius: 2,
            fillColor: '#0f0'
        })

        sound.pistol()
    }

    x(value, angle)
    {
        if (angle == 3)
        {
            return value + (SOLDIER_SIZE / 2)
        }
        else if (angle == 0)
        {
            return value - (SOLDIER_SIZE / 2)
        }
        else
        {
            return value
        } 
    }

    y(value, angle)
    {
        if (angle == 1)
        {
            return value - (SOLDIER_SIZE / 2)
        }
        else if (angle == -1)
        {
            return value + (SOLDIER_SIZE / 2)
        }
        else
        {
            return value
        } 
    }

    velocity(angle)
    {
        if (angle == 3)
        {
            return Matter.Vector.create(BULLET_SPEED, 0)
        }
        else if (angle == 1)
        {
            return Matter.Vector.create(0, -BULLET_SPEED)
        }
        else if (angle == -1)
        {
            return Matter.Vector.create(0, BULLET_SPEED)
        }
        else if (angle == 0)
        {
            return Matter.Vector.create(-BULLET_SPEED, 0)
        }
    }

    onCollision()
    {
        Matter.World.remove(physics.engine.world, this.body)
        this.graphics.remove()
    }

    render()
    {
        this.graphics.position.x = this.body.position.x
        this.graphics.position.y = this.body.position.y
    }
}