var THREE = require('three')
var fxaaShader = require('../')

var shader = new THREE.ShaderMaterial( fxaaShader ) 

console.log(shader)

////e.g. with EffectComposer
//effectComposer.addPass( new THREE.ShaderPass(shader) )