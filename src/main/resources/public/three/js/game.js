function init()
{
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 1, 1000)

    const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("canvas"), antialias: true})
    renderer.setClearColor(0x222222)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xfffffff, wireframe: true })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5

    const animate = function ()
    {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        renderer.render(scene, camera)
    }

    animate()
}