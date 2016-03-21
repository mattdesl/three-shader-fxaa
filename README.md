# three-shader-fxaa

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[Demo](http://mattdesl.github.io/three-shader-fxaa/)

Optimized FXAA shader for ThreeJS, passing some texture coordinates from the vertex shader to avoid 5 dependent texture reads. This is well suited for PowerVR GPUs (iOS).

[![screen](http://i.imgur.com/Qsjt7z5.png)](http://mattdesl.github.io/three-shader-fxaa/)

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

## From Source

To build/run from source, first `git clone` this repo and then:

```sh
npm install
```

Once installed, you can test/build the demo like this:

```sh
# to run demo dev server/scripts
npm run start

# to run demo build scripts
npm run build
```

Or, you can test/build the source code. It needs to be transpiled with `glslify` so that the final npm distribution has its source inlined.

```sh
# watch index and shaders and transpile on change
npm run dev

# transpile index and shaders to build/ folder
npm run transpile
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/three-shader-fxaa/blob/master/LICENSE.md) for details.
