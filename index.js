var glslify = require('glslify')

var vert = glslify('./vert.glsl')
var frag = glslify('./frag.glsl')

module.exports = function(THREE) {
  return function() {
    return {
      uniforms: { 
        tDiffuse: { type: 't', value: new THREE.Texture() },
        resolution: { type: 'v2', value: new THREE.Vector2() }
      },
      vertexShader: vert,
      fragmentShader: frag
    }
  }
}