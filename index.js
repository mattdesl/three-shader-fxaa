var glslify = require('glslify')
var threeify = require('three-glslify')

var source = glslify({
    vertex: './vert.glsl',
    fragment: './frag.glsl',
    sourceOnly: true
})

module.exports = function(THREE) {
    var createShader = threeify(THREE)
    return function() {
        return createShader(source)
    }
}