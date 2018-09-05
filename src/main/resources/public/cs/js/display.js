class Display
{
    constructor()
    {
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 2000)
        this.camera.position.set(0, 0, -1000)
        this.camera.up.set(0,-1,0)
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))

        this.topDownView = true

        // first person view
        if (!this.topDownView)
        {
            this.camera.up.set(0, 1, 0)
        }

        this.renderer = new THREE.WebGLRenderer({canvas: $("#canvas"), antialias: false})
        this.renderer.setClearColor(0x111111)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.gammaInput = true
        this.renderer.gammaOutput = true
        this.renderer.physicallyCorrectLights = true
        this.renderer.toneMapping = THREE.ReinhardToneMapping
		this.renderer.setPixelRatio( window.devicePixelRatio )

        this.scene = new THREE.Scene()

        this.pointLight = new THREE.PointLight(0xffffff, 0.2)
        this.pointLight.position.set(200, 500, -25)
        this.pointLight.castShadow = true
        //this.pointLight.shadow.camera.near = 0.5
        this.pointLight.shadow.camera.far = 1000
        
        this.scene.add(this.pointLight)

        const lightHelper = new THREE.PointLightHelper(this.pointLight)
        this.scene.add(lightHelper)

        const that = this
        window.onresize = function()
        {
            that.renderer.setSize(window.innerWidth, window.innerHeight)
            that.camera.aspect = window.innerWidth / window.innerHeight
            that.camera.updateProjectionMatrix()
        }

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
        this.camera.position.set(x, y, -1000)

        // first person view
        if (!this.topDownView)
        {
            this.camera.position.set(x, y, -50)
            this.camera.lookAt(new THREE.Vector3(x, y - 50, -50))
        }
    }

    cube(x, y, z, a, b, c, textureName1, textureName2, factor)
    {
        const geometry = new THREE.BoxGeometry(a, b, c)

        const textureLR = new THREE.TextureLoader().load(textureName2)
        textureLR.wrapS = THREE.RepeatWrapping
        textureLR.wrapT = THREE.RepeatWrapping
        textureLR.repeat.set(c/factor, b/factor)

        const textureFB = new THREE.TextureLoader().load(textureName1)
        textureFB.wrapS = THREE.RepeatWrapping
        textureFB.wrapT = THREE.RepeatWrapping
        textureFB.repeat.set(a/factor, c/factor)

        const textureUD = new THREE.TextureLoader().load((a > b) ?  textureName1 : textureName2)
        textureUD.wrapS = THREE.RepeatWrapping
        textureUD.wrapT = THREE.RepeatWrapping
        textureUD.repeat.set(a/factor, b/factor)

        const faces = [
            new THREE.MeshLambertMaterial({map: textureLR, side: THREE.DoubleSide}), // right
            new THREE.MeshLambertMaterial({map: textureLR, side: THREE.DoubleSide}), // left
            new THREE.MeshLambertMaterial({map: textureFB, side: THREE.DoubleSide}), // front
            new THREE.MeshLambertMaterial({map: textureFB, side: THREE.DoubleSide}), // back
            new THREE.MeshLambertMaterial({map: textureUD, side: THREE.DoubleSide}), // down
            new THREE.MeshLambertMaterial({map: textureUD, side: THREE.DoubleSide})  // top
        ]

        const mesh = new THREE.Mesh(geometry, faces)
        mesh.position.set(x, y, z)
        mesh.castShadow = true
        mesh.receiveShadow = true

        return mesh
    }

    sphere(x, y, z, r, texture)
    {
        const geometry = new THREE.SphereGeometry(r, 16, 16)
        const material = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(texture)})
        
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)
        mesh.castShadow = true
        mesh.receiveShadow = true

        return mesh
    }
}