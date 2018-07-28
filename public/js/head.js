class Head
{
    constructor()
    {
        this.shape = Engine.canvas.display.rectangle({
            x: 0,
            y: 0,
            width: 20,
            height: 20,
            fill: "#0aa"
        })

        Engine.canvas.addChild(this.shape)
    }
}