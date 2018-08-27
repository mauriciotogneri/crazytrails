class Display
{
    constructor()
    {
        this.camera = new THREE.PerspectiveCamera(20, window.innerWidth/window.innerHeight, 1, 3000)
        this.camera.position.set(0, 0, -2000)
        this.camera.up.set(0,-1,0)
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))

        // first person view
        //this.camera.up.set(0, 1, 0)

        this.renderer = new THREE.WebGLRenderer({canvas: $("#canvas"), antialias: true})
        this.renderer.setClearColor(0x111111)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.scene = new THREE.Scene()

        const light = new THREE.AmbientLight(0xffffff, 1)
        this.scene.add(light)

        // orbit controls
        //this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
    }

    addMesh(mesh)
    {
        this.scene.add(mesh)
    }

    removeMesh(mesh)
    {
        this.scene.remove(mesh)
        mesh.geometry.dispose()
        mesh.material.dispose()
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

        // orbit controls
        //this.controls.update()

        this.renderer.render(this.scene, this.camera)
    }

    centerAt(x, y)
    {
        // comment to use orbit
        this.camera.position.set(x, y, -2000)

        // first person view
        //this.camera.position.set(x, y, -50)
        //this.camera.lookAt(new THREE.Vector3(x, y - 50, -50))
    }

    cube(x, y, z, a, b, c, textureName)
    {
        const geometry = new THREE.BoxGeometry(a, b, c)

        const texture1 = new THREE.ImageUtils.loadTexture(textureName)
        texture1.wrapS = THREE.RepeatWrapping
        texture1.wrapT = THREE.RepeatWrapping
        texture1.repeat.set(1, 10)

        const texture2 = new THREE.ImageUtils.loadTexture(textureName)
        texture2.wrapS = THREE.RepeatWrapping
        texture2.wrapT = THREE.RepeatWrapping
        texture2.repeat.set(1, 1)
        
        const faces = [
            new THREE.MeshBasicMaterial({map: texture1, side: THREE.DoubleSide}), // right
            new THREE.MeshBasicMaterial({map: texture1, side: THREE.DoubleSide}), // left
            new THREE.MeshBasicMaterial({map: texture2, side: THREE.DoubleSide}), // front
            new THREE.MeshBasicMaterial({map: texture1, side: THREE.DoubleSide}), // back
            new THREE.MeshBasicMaterial({map: texture1, side: THREE.DoubleSide}), // down
            new THREE.MeshBasicMaterial({map: texture1, side: THREE.DoubleSide})  // top
        ]

        const mesh = new THREE.Mesh(geometry, faces)
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