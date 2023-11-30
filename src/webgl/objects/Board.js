import * as THREE from "three";
import AudioController from "../../utils/AudioController";

export default class Board {
  constructor() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.group = new THREE.Group();
    this.group.position.set(-8, -8, 0);
    this.whiteMaterial = new THREE.MeshBasicMaterial({
      color: 0xe8db33,
    });

    this.purpleMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b2aa8,
    });

    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        let mesh;

        if (x % 2 === y % 2) {
          mesh = new THREE.Mesh(this.geometry, this.whiteMaterial);
        } else {
          mesh = new THREE.Mesh(this.geometry, this.purpleMaterial);
        }

        mesh.position.set(x, y, 0);
        this.group.rotation.y = 2;
        this.group.add(mesh);
      }
    }
    const tempScene = new THREE.Scene();
    tempScene.add(this.group);

    const box = new THREE.Box3().setFromObject(this.group);
    const center = new THREE.Vector3();
    box.getCenter(center);

    this.group.position.sub(center);

    tempScene.remove(this.group);
  }
  tick(deltaTime) {
    for (let i = 0; i < this.group.children.length; i++) {
      this.group.children[i].scale.z = AudioController.fdata[i] * 0.05;
    }
  }
}
