class Physics
{
    constructor()
    {
        this.engine = Matter.Engine.create()
        this.engine.world.gravity.y = 0

        this.render = Matter.Render.create({
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

        Matter.Render.run(this.render)
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
            var pairs = event.pairs[0]

            console.log(pairs.bodyA.object)
            console.log(pairs.bodyA.class)

            console.log(pairs.bodyB.object)
            console.log(pairs.bodyB.class)

            if (pairs.bodyA.label == "Circle Body")
            {
                Matter.World.remove(physics.engine.world, pairs.bodyA)
            }

            if (pairs.bodyB.label == "Circle Body")
            {
                Matter.World.remove(physics.engine.world, pairs.bodyB)
            }
        })
    }

    addBody(body, object, clazz)
    {
        if (object)
        {
            body.object = object
            body.class  = clazz
        }

        Matter.World.add(this.engine.world, body)
    }
}