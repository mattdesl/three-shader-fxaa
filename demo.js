global.THREE = require('three')
var EffectComposer = require('three-effectcomposer')(THREE)
var fxaa = require('./')

var dpr = window.devicePixelRatio
var width = 512
var height = 512
var canvas = document.createElement('canvas')
canvas.width = width * dpr
canvas.height = height * dpr
canvas.style.width = width + 'px'
canvas.style.height = height + 'px'
document.body.appendChild(canvas)

var renderer = new THREE.WebGLRenderer({
  antialias: false,
  canvas: canvas
})

renderer.setClearColor(0x000000, 1)

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 1000)

camera.position.copy(new THREE.Vector3(3, 2, -2))
camera.lookAt(new THREE.Vector3())

var geo = new THREE.BoxGeometry(1, 1, 1)
var mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
var box = new THREE.Mesh(geo, mat)
scene.add(box)

var target = new THREE.WebGLRenderTarget(width * dpr, height * dpr)
target.format = THREE.RGBFormat
target.minFilter = THREE.LinearFilter
target.generateMipmaps = false

var composer = new EffectComposer(renderer, target)

composer.addPass(new EffectComposer.RenderPass(scene, camera))

var shaderPass = new EffectComposer.ShaderPass(fxaa())
shaderPass.renderToScreen = true
composer.addPass(shaderPass)

var tick = 0

render()
setInterval(render, 1000)

function render () {
  if (tick++ % 2 === 0) {
    renderer.render(scene, camera)
  } else {
    // ensure FXAA has correct target resolution
    shaderPass.uniforms.resolution.value.set(width, height)
    composer.render()
  }
}
