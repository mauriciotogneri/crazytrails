class Level
{
    constructor()
    {
        this.createFloor()
        this.createWalls()
    }

    createFloor()
    {
        const geometry = new THREE.PlaneBufferGeometry(1000, 1000)

        const texture = new THREE.TextureLoader().load(TEXTURE.concrete)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(5, 5)
        
        const material = new THREE.MeshLambertMaterial({ map: texture, side: THREE.BackSide })
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(500, 500, 25)

        display.addMesh(plane)
    }

    createWalls()
    {
        new Wall(0, 0, 25, 500, 50)

        for (var i = 0; i < 14; i++)
        {
            new Wall(150, (i * 25) + 150, 25, 25, 50)
        }

        for (var i = 0; i < 20; i++)
        {
            new Wall(300, i * 25, 25, 25, 50)
        }

        for (var i = 1; i < 12; i++)
        {
            new Wall(i * 25, 0, 25, 25, 50)
        }
    }
}