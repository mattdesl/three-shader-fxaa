varying vec2 vUv;

varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

uniform vec2 resolution;

#pragma glslify: texcoords = require(glsl-fxaa/texcoords.glsl)

void main() {
	vUv = uv;  
	vec2 fragCoord = uv * resolution;
	texcoords(fragCoord, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);

	gl_Position = projectionMatrix *
	            modelViewMatrix *
	            vec4(position,1.0);
}
