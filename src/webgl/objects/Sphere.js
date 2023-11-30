import * as THREE from "three";
import AudioController from "../../utils/AudioController";
// eslint-disable-next-line import/no-webpack-loader-syntax
import fragmentShader from "!!raw-loader!!glslify-loader!../../webgl/shaders/sphere/fragment.glsl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import vertexShader from "!!raw-loader!!glslify-loader!../../webgl/shaders/sphere/vertex.glsl";

export default class Sphere {
  constructor() {
    const uniforms = {
      u_resolution: {
        type: "v2",
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      u_time: { type: "f", value: 0.0 },
    };

    // Créer la géométrie de la sphère
    const geometry = new THREE.IcosahedronGeometry(4, 10);

    // Créer le matériau de la sphère
    const material = new THREE.ShaderMaterial({
      wireframe: true,
      uniforms: {
        uBassFrequency: { value: 0 },
        uTime: { value: 0 },
      },
      // vertexShader: vertexShader,
      // fragmentShader: fragmentShader,
    });

    // Créer le mesh de la sphère
    this.mesh = new THREE.Mesh(geometry, material);

    // Créer un groupe pour regrouper la sphère
    this.group = new THREE.Group();
    this.group.add(this.mesh);
  }

  tick(deltaTime) {
    this.mesh.rotation.x += 0.01 * deltaTime * 0.01;
    this.mesh.rotation.z += 0.01 * deltaTime * 0.01;

    const remapped = AudioController.fdata[0] / 255;
    this.mesh.scale.set(1 + remapped, 1 + remapped, 1 + remapped);

    // uniforms.u_time.value += 0.01 * deltaTime * 0.01;

    // this.mesh.material.uniforms.uTime.value += deltaTime * 0.001;
    // this.mesh.material.uniforms.uBassFrequency.value = AudioController.fdata[0];
  }
}
