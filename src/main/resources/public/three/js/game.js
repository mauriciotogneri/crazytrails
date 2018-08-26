function init()
{
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 3000)
    camera.position.z = 1000

    const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("canvas"), antialias: true})
    renderer.setClearColor(0x222222)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const geometry = new THREE.BoxGeometry(100, 100, 100)
    const material = new THREE.MeshLambertMaterial({
        color: 0xf3fff2,
        map: new THREE.TextureLoader().load('resources/brick.png'),
        wireframe: false
    })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0, 0, -1000)

    const light = new THREE.PointLight(0xffffff, 0.5)
    //const light = new THREE.SpotLight(0xffffff, 1, 3000)
    //light.target = cube

    const scene = new THREE.Scene()
    scene.add(light)
    scene.add(cube)

    const animate = function ()
    {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        renderer.render(scene, camera)
    }

    animate()
}