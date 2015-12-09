# three-shader-fxaa

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

[Demo](http://mattdesl.github.io/three-shader-fxaa/)

Optimized FXAA shader for ThreeJS, passing some texture coordinates from the vertex shader to avoid 5 dependent texture reads. This is well suited for PowerVR GPUs (iOS).

[![screen](http://i.imgur.com/Qsjt7z5.png)](http://mattdesl.github.io/three-shader-fxaa/)

This module is intended to be consumed with browserify, as it relies on [glslify](https://github.com/stackgl/glslify) to bring in shader components from npm. At a later point, it may be transpiled with a babel plugin, for use in Webpack/JSPM/etc.

Tested on Three r69-73, works with the [three](http://npmjs.com/package/three) module.

## Install

```sh
npm install three-shader-fxaa --save
```

## Usage

This is typically used with EffectComposer, like so:

```js
// Make sure THREE is in global if not already
window.THREE = require('three')

// Grab EffectComposer from npm or ThreeJS examples
var EffectComposer = require('three-effectcomposer')(THREE)

// Grab this module!
var fxaa = require('three-shader-fxaa')

// Setup bare-bones composer
var effectComposer = new EffectComposer(renderer)
composer.addPass(new EffectComposer.RenderPass(scene, camera))

// Add FXAA pass
var shaderPass = new EffectComposer.ShaderPass(fxaa())
shaderPass.renderToScreen = true
composer.addPass(shaderPass)

// Make sure screen resolution is set!
shaderPass.uniforms.resolution.set(width, height)

// Render scene
composer.render()
```

You don't need to set up `glslify` since that will be done by browserify under the hood.

## Usage

[![NPM](https://nodei.co/npm/three-shader-fxaa.png)](https://nodei.co/npm/three-shader-fxaa/)

### ```shader = fxaa([opt])```

Calling the function returns a new object with the following properties. This can be piped into `THREE.ShaderMaterial` or `THREE.EffectComposer`.

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

You can specify the following option:

- `opt.resolution` which is a default `THREE.Vector2` to use

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/three-shader-fxaa/blob/master/LICENSE.md) for details.
