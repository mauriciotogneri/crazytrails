class Display
{
    constructor()
    {
        paper.install(window)

        const canvas  = $("#canvas")
        canvas.width  = document.body.clientWidth
        canvas.height = document.body.clientHeight
        paper.setup(canvas)

        const background = new Path.Rectangle({
            center: [900, 450],
            size: [1800, 900],
            fillColor: '#fafafa'
        })
        background.sendToBack()
    }

    start()
    {
        paper.view.onFrame = function(event)
        {
            game.update(event.delta)
            game.render(physics.engine.world.bodies)
        }
    }

    centerAt(x, y)
    {
        paper.view.setCenter([x, y])
    }

    circle(x, y, radius, color)
    {
        return new Path.Circle({
            center: [x, y],
            radius: radius,
            fillColor: color
        })
    }

    rectangle(x, y, w, h, color)
    {
        return new Path.Rectangle({
            center: [x, y],
            size: [w, h],
            fillColor: color
        })
    }

    group(x, y, children)
    {
        return new Group({
            transformContent: false,
            children: children,
            position: [x, y]
        })
    }
}