class Display
{
    constructor()
    {
        this.camera = new THREE.PerspectiveCamera(20, window.innerWidth/window.innerHeight, 1, 3000)
        this.camera.position.set(0, 0, -2000)
        this.camera.up.set(0,-1,0)
        this.camera.lookAt(new THREE.Vector3(0,0,0))

        // first person view
        //this.camera.up.set(0, 1, 0)

        this.renderer = new THREE.WebGLRenderer({canvas: $("#canvas"), antialias: true})
        this.renderer.setClearColor(0x222222)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.scene = new THREE.Scene()

        const light = new THREE.AmbientLight(0xffffff, 1)
        this.scene.add(light)

        const axesHelper = new THREE.AxesHelper(1000)
        this.scene.add(axesHelper)

        const geometry = new THREE.PlaneBufferGeometry(1000, 1000, 8, 8)
        const material = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load(TEXTURE.concrete), side: THREE.BackSide })
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(500, 500, 25)

        this.scene.add(plane);
    }

    addMesh(mesh)
    {
        this.scene.add(mesh)
    }

    update(bodies)
    {
        bodies.forEach(body =>
        {
            if (body.object && body.object.render)
            {
                body.object.render()
            }
        })

        this.renderer.render(this.scene, this.camera)
    }

    centerAt(x, y)
    {
        this.camera.position.x = x
        this.camera.position.y = y

        // first person view
        //this.camera.position.set(x, y, 0)
        //this.camera.lookAt(new THREE.Vector3(x, y - 50, 0))
    }

    cube(x, y, z, a, b, c, texture)
    {
        const geometry = new THREE.BoxGeometry(a, b, c)
        // use MeshFaceMaterial and pass an array with 6 MeshBasicMaterial to paint each face differently
        const material = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(texture)})
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)

        return mesh
    }

    sphere(x, y, z, r, texture)
    {
        const geometry = new THREE.SphereGeometry(r, 32, 16)
        const material = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(texture)})
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)

        return mesh
    }
}