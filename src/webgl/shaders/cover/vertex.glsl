#pragma glslify: snoise4 = require(glsl-noise/simplex/4d) 

uniform float uBassFrequency;
uniform float uTime;
varying vec2 vUv;

void main(){
    vUv = uv;

    float remappedBassFrequency = uBassFrequency / 255.0;

    float distortion = snoise4(vec4(position.xyz, uTime)) * remappedBassFrequency + 1.0;

    // vec3 updatedPosition = vec3(position.x, position.y, position.z);

    vec4 modelPosition = modelMatrix * vec4(position + distortion, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_PointSize = 1.0;

    gl_Position = projectedPosition;
}