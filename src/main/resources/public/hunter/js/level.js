class Level
{
    constructor()
    {
        this.createFloor()
        this.createWalls()
    }

    createFloor()
    {
        const geometry = new THREE.PlaneBufferGeometry(1000, 1000, 8, 8)
        const material = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load(TEXTURE.concrete), side: THREE.BackSide })
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(500, 500, 25)

        display.addMesh(plane)
    }

    createWalls()
    {
        for (var i = 0; i < 10; i++)
        {
            new Wall(0, i * 50, 50, 50)
        }

        for (var i = 0; i < 7; i++)
        {
            new Wall(150, (i * 50) + 150, 50, 50)
        }

        for (var i = 0; i < 10; i++)
        {
            new Wall(300, i * 50, 50, 50)
        }

        for (var i = 0; i < 6; i++)
        {
            new Wall(i * 50, 0, 50, 50)
        }
    }
}