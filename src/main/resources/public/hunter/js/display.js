class Display
{
    constructor()
    {
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 3000)
        this.camera.position.set(0, 0, -2000)
        this.camera.up.set(0,-1,0)
        this.camera.lookAt(new THREE.Vector3(0,0,0))

        this.renderer = new THREE.WebGLRenderer({canvas: $("#canvas"), antialias: true})
        this.renderer.setClearColor(0x222222)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        const light = new THREE.PointLight(0xffffff, 0.5)
        light.position.set(0, 0, -500)

        this.scene = new THREE.Scene()
        this.scene.add(light)

        var axesHelper = new THREE.AxesHelper(1000)
        this.scene.add(axesHelper)
    }

    add(mesh)
    {
        this.scene.add(mesh)
    }

    update(bodies)
    {
        this.renderer.render(this.scene, this.camera)

        bodies.forEach(body =>
        {
            if (body.object && body.object.render)
            {
                body.object.render()
            }
        })
    }

    centerAt(x, y)
    {
        this.camera.position.x = x
        this.camera.position.y = y
    }

    /*circle(x, y, radius, color)
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
    }*/
}