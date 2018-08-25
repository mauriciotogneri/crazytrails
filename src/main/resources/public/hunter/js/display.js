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
            fillColor: '#111'
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
}