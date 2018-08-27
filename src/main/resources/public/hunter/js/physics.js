class Physics
{
    constructor()
    {
        this.engine = Matter.Engine.create()
        this.engine.world.gravity.y = 0

        /*this.render = Matter.Render.create({
            canvas: $("#canvas"),
            engine: this.engine,
            options: {
                width: document.body.clientWidth,
                height: document.body.clientHeight,
                wireframeBackground: '#222',
                background: 'red',
                wireframes: true,
                showVelocity: false,
                showCollisions: true,
                showAngleIndicator: true
            }
        })

        Matter.Render.run(this.render)*/
    }

    start()
    {
        const runner = Matter.Runner.create({
            delta: 1000 / FPS,
            isFixed: false,
            enabled: true
        })

        Matter.Runner.run(runner, this.engine)

        Matter.Events.on(runner, "afterUpdate", function(event)
        {
            game.update(event.source.delta)
        })
        
        Matter.Events.on(this.engine, "collisionStart", function(event)
        {
            const pairs   = event.pairs[0]
            const objectA = pairs.bodyA.object
            const objectB = pairs.bodyB.object

            if (objectA && objectA.onCollision)
            {
                objectA.onCollision(objectB)
            }

            if (objectB && objectB.onCollision)
            {
                objectB.onCollision(objectA)
            }
        })
    }

    addBody(body, object)
    {
        if (object)
        {
            body.object = object
        }

        Matter.World.add(this.engine.world, body)
    }

    rectangle(x, y, w, h)
    {
        return Matter.Bodies.rectangle(x, y, w, h, {
            isStatic: true
        })
    }

    circle(x, y, r)
    {
        return Matter.Bodies.circle(x, y, r, {
            density: 1,
            friction: 1,
            frictionAir: 0,
            restitution: 0
        })
    }
}