//https://threejs.org/examples/?q=controls#misc_controls_pointerlock

function init()
{
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 3000)
    camera.position.set(0, 0, -2000)
    camera.up.set(0,-1,0)
    camera.lookAt(new THREE.Vector3(0,0,0))

    const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("canvas"), antialias: true})
    renderer.setClearColor(0x222222)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const geometry = new THREE.BoxGeometry(100, 100, 100)
    // use MeshFaceMaterial and pass an array with 6 MeshBasicMaterial to paint each face differently
    const material = new THREE.MeshLambertMaterial({
        color: 0xf3fff2,
        map: new THREE.TextureLoader().load('resources/brick.png'),
        wireframe: false
    })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0, 0, 0)

    const light = new THREE.PointLight(0xffffff, 0.5)
    light.position.set(0, 0, -500)

    const scene = new THREE.Scene()
    scene.add(light)
    scene.add(cube)

    var axesHelper = new THREE.AxesHelper(1000)
    scene.add(axesHelper)

    const animate = function()
    {
        requestAnimationFrame(animate)

        //cube.position.y += 1
        //cube.position.x += 1
        //light.position.set(cube.position.x - 500, cube.position.y - 500, -500)

        renderer.render(scene, camera)
    }

    animate()
}