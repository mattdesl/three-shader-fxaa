varying vec2 vUv;

//texcoords computed in vertex step
//to avoid dependent texture reads
varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

//make sure to have a resolution uniform set to the screen size
uniform vec2 resolution;
uniform sampler2D tDiffuse;

#pragma glslify: fxaa = require('glsl-fxaa/fxaa.glsl')

void main() {
  vec2 fragCoord = vUv * resolution;   
  gl_FragColor = fxaa(tDiffuse, fragCoord, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);
}
