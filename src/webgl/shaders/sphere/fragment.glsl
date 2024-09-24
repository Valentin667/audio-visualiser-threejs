uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    float distort = 1.5 * vDisplacement * u_intensity;

    vec3 color = vec3(
        abs(vUv.x - 0.5) * 2.0 * (0.5 - distort),
        abs(vUv.y - 0.5) * 2.0 * (0.5 - distort),
        1.0 - abs(distort)
    );
  
    gl_FragColor = vec4(color, 1.0);
}