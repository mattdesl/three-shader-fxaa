var FXAA = require('../')(THREE)

var shader = new THREE.ShaderMaterial( FXAA ) 

console.log(shader)

////e.g. with EffectComposer
//effectComposer.addPass( new THREE.ShaderPass(shader) )