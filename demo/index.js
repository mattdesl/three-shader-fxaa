var THREE = require('three')
var domready = require('domready')
var addEvent = require('add-event-listener')
var raf = require('raf')

var fxaa = require('../')

domready(function() {
    var width = 512,
        height = 512

    document.body.style.margin = "0"
    document.body.style.overflow = "hidden"

    var renderer = new THREE.WebGLRenderer({
    	antialias: false
    })
    
    renderer.setClearColor(0x000000)
    renderer.setSize(width, height)

    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000)
    camera.position.z = 5

    scene.add(new THREE.AmbientLight(0x222222))

    var light = new THREE.PointLight(0xff0000, 1, 0)
    light.position.set(-10, 20, 20)
    scene.add(light)

    var sphere = new THREE.Mesh(new THREE.SphereGeometry(1.5, 20, 20), 
                            new THREE.MeshPhongMaterial({ 
                                color: 0xff0000,
                                shading: THREE.FlatShading,
                            }))
    scene.add(sphere)
    sphere.rotation.x = 0.6
    sphere.rotation.y = 0.8
    sphere.rotation.z = -0.4

    var target = new THREE.WebGLRenderTarget(width, height)

    //this is a standard pass
    var stdMaterial = new THREE.MeshBasicMaterial({ map:target })

    //this is our FXAA pass
    var fxaaMaterial = new THREE.ShaderMaterial(fxaa)
    fxaaMaterial.uniforms.tDiffuse.value = target
    fxaaMaterial.uniforms.resolution.value.set(width, height)

    var quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fxaaMaterial)
    var ortho = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
    
    var postScene = new THREE.Scene()
    postScene.add(quad)
    
    var useAA = true

    function render() {
        renderer.render(scene, camera, target)

        quad.material = useAA ? fxaaMaterial : stdMaterial
        renderer.render(postScene, ortho)
    }
    
    addEvent(window, 'click', function(ev) {
        useAA = !useAA
        raf(render)
    })

    raf(render)

    document.body.appendChild(renderer.domElement)
})