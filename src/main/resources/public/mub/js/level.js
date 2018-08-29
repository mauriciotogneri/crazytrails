class Level
{
    constructor()
    {
        this.createFloor()
        this.createWalls()
    }

    createFloor()
    {
        const geometry = new THREE.PlaneBufferGeometry(MAP_SIZE.width, MAP_SIZE.height)

        const texture = new THREE.TextureLoader().load(TEXTURE.concrete)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(15, 8)
        
        const material = new THREE.MeshLambertMaterial({ map: texture, side: THREE.BackSide })
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(1000, 500, 25)

        display.addMesh(plane)
    }

    createWalls()
    {
        MAP.forEach(shape =>
        {
            new Wall(shape.x, shape.y, shape.w, shape.h, 50)
        })
    }
}