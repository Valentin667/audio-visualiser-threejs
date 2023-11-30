import * as THREE from "three";
import AudioController from "../../utils/AudioController";
import Scene from "../Scene";

export default class LogoIut {
  constructor() {
    this.group = null;
    this.icosphere = null;
    this.material = new THREE.MeshNormalMaterial();

    this.circles = [];

    this.clock = new THREE.Clock();

    Scene.gltfLoader.load("/logo-iut.glb", (gltf) => {
      this.group = gltf.scene;

      this.group.traverse((object) => {
        if (object.type === "Mesh") {
          object.material = this.material;

          if (object.name.startsWith("BezierCircle")) {
            this.circles.push(object);
          }
        }
      });

      this.icosphere = this.group.getObjectByName("Icosphere");

      this.group.rotation.x = Math.PI / 2;
    });
  }

  tick(deltaTime) {
    const remapped = AudioController.fdata[0] / 255;
    this.icosphere.scale.set(1 + remapped, 1 + remapped, 1 + remapped);

    const elapsedTime = this.clock.getElapsedTime();

    const icosphereAngle = elapsedTime * 0.5;
    this.group.position.x = Math.cos(icosphereAngle) * 4;
    this.group.position.y = Math.sin(elapsedTime * 3);
    this.group.position.z = Math.sin(icosphereAngle) * 4;

    this.circles[0].position.x = -1 + remapped;
    this.circles[1].position.z = 1 - remapped;
    this.circles[2].position.x = 1 - remapped;
    this.circles[3].position.z = -1 + remapped;
  }
}
