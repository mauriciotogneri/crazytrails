class InputMouse
{
    constructor(x, y)
    {
        this.x = x
        this.y = y
        const canvas = $("#canvas")
        this.center = new THREE.Vector3(canvas.width / 2, canvas.height / 2, 0)
        document.body.style.cursor = "crosshair"
    }

    move(xDistance, yDistance)
    {
        this.x += xDistance
        this.y += yDistance
    }

    orientation()
    {
        const angle = parseInt(Math.atan2(this.center.y - this.y, this.center.x - this.x) * 180 / Math.PI)

        return angle * Math.PI / 180
    }
}