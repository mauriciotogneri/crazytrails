class Wall
{
    constructor(x, y, w, h)
    {
        this.body = Matter.Bodies.rectangle(x + (w/2), y + (h/2), w, h, {isStatic: true})

        physics.addBody(this.body, this, CLASS.wall)

        this.graphics = new Path.Rectangle({
            center: [x + (w/2), y + (h/2)],
            size: [w, h],
            fillColor: '#f00'
        })
    }
}