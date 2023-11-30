uniform vec2 u_resolution;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    gl_FragColor = vec4(vec3(st.x, st.y, 1.0), 1.0);
}