# three-shader-fxaa

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Optimized FXAA shader for ThreeJS. This shader is compiled and versioned with [glslify](glslify), which means it can take advantage of some nice features like:

- versioning; if [glsl-fxaa](https://www.npmjs.org/package/glsl-fxaa) is patched, users of [three-shader-fxaa](https://www.npmjs.org/package/three-shader-fxaa) will get the patch too
- glslify transforms, like optimizing and minifying during your application bundle step
- robust shader code that is easy to re-use and share across projects
- [and more...](http://mattdesl.svbtle.com/glslify)


```js
var THREE = require('three')
var FXAA = require('three-shader-fxaa')()

var shader = new THREE.ShaderMaterial( FXAA ) 
shader.uniforms.tDiffuse.set = myTexture
shader.uniforms.resolution.set(width, height)


//... or with EffectComposer
var pass = new THREE.ShaderPass(FXAA) 
effectComposer.addPass( pass )
pass.uniforms.tDiffuse.set = myTexture
pass.uniforms.resolution.set(width, height)
```

Intended to be used with THREE on npm, tested with r68.

## Usage

[![NPM](https://nodei.co/npm/three-shader-fxaa.png)](https://nodei.co/npm/three-shader-fxaa/)

### ```fxaa()```

Calling the function returns a new object with the following properties. This can be piped into THREE.ShaderMaterial or THREE.EffectComposer.

```js
{
	vertexShader: '...shader source...',
	fragmentShader: '...shader source...',
	uniforms: { 
		tDiffuse: { type: 't', value: new THREE.Texture() },
		resolution: { type: 'v2', value: new THREE.Vector2() }
    }
}
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/three-shader-fxaa/blob/master/LICENSE.md) for details.
