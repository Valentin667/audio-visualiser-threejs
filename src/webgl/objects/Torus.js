import * as THREE from "three";
import AudioController from "../../utils/AudioController";

export default class Torus {
    constructor() {
        const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshNormalMaterial({});
    this.mesh = new THREE.Mesh(geometry, material);
    }

    tick() {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.z += 0.01;

        const remapped = AudioController.fdata[0] / 255;

        this.mesh.scale.set(1 + remapped, 1 + remapped, 1 + remapped);
    }
}