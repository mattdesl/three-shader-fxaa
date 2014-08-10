var glslify = require('glslify')
var createShader = require('three-glslify')

var source = glslify({
    vertex: './vert.glsl',
    fragment: './frag.glsl',
    sourceOnly: true
})

module.exports = function() {
    return createShader(source)
}