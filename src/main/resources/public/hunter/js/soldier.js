class Soldier
{
    constructor(x, y, color)
    {
        this.angle = 0
        this.inputKeyboard = new InputKeyboard(false, false, false, false)

        this.body = Matter.Bodies.rectangle(x, y, CHARACTER_SIZE, CHARACTER_SIZE, {
            density: 1,
            friction: 1,
            frictionAir: 0,
            restitution: 0
        })
        physics.addBody(this.body, this)

        //this.mesh = display.rectangle(x, y, -50, CHARACTER_SIZE, CHARACTER_SIZE, CHARACTER_SIZE, TEXTURE.brick)
        //display.addMesh(this.mesh)

        this.light = new THREE.PointLight(0xffffff, 0.3)
        //display.addMesh(this.light)

        //this.light = new THREE.SpotLight(0xffffff, 0.5)
        display.addMesh(this.light)

        //const pointLightHelper = new THREE.PointLightHelper(this.light, 1)
        //display.addMesh(pointLightHelper)
    }

    update(delta)
    {
        const distance = (delta * DISTANCE_RATE)
        var xDistance  = 0
        var yDistance  = 0
        
        if (this.inputKeyboard.left)
        {
            xDistance = -distance
        }
        else if (this.inputKeyboard.right)
        {
            xDistance = distance
        }
        
        if (this.inputKeyboard.up)
        {
            yDistance = -distance
        }
        else if (this.inputKeyboard.down)
        {
            yDistance = distance
        }

        if ((xDistance != 0) || (yDistance != 0))
        {
            Matter.Body.setPosition(this.body, Matter.Vector.create(this.body.position.x + xDistance, this.body.position.y + yDistance))
        }

        Matter.Body.setVelocity(this.body, Matter.Vector.create(0, 0))

        if (this.angle != this.body.angle)
        {
            Matter.Body.setAngle(this.body, this.angle)
        }

        if ((xDistance != 0) || (yDistance != 0))
        {
            this.onMove()
        }
    }

    onMove()
    {
    }

    render()
    {
        //this.mesh.position.set(this.body.position.x, this.body.position.y, 0)
        //this.graphics.rotation = (this.body.angle * 180 / Math.PI) + 180

        this.light.position.set(this.body.position.x, this.body.position.y , -25)
        //this.light.lookAt(this.body.position.x, this.body.position.y - 10, -25)
    }
}