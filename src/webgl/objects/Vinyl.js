import * as THREE from "three";
// import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
// import { FontLoader } from "three/addons/loaders/FontLoader.js";

import AudioController from "../../utils/AudioController";

const renderer = new THREE.WebGLRenderer();

export default class Vinyl {
  constructor(renderer) {
    this.active = true;
    this.renderer = renderer;
    this.group = new THREE.Group();

    // Créer le disque vinyl
    const vinylGeometry = new THREE.CylinderGeometry(4, 4, 0.1, 32);
    const vinylMaterial = new THREE.MeshStandardMaterial({
      color: 0xffa500,
      side: THREE.DoubleSide,
    });
    this.vinylMesh = new THREE.Mesh(vinylGeometry, vinylMaterial);

    // Créer l'étiquette du vinyl
    const labelGeometry = new THREE.CircleGeometry(9, 32);
    const labelMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      side: THREE.DoubleSide,
    });
    this.labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    this.labelMesh.rotation.x = -Math.PI / 2; // Placer l'étiquette sur le dessus du vinyl

    // Créer la géométrie du texte
    // const loader = new FontLoader();

    // let textGeometry;

    // loader.load(
    //   "../../assets/fonts/helvetiker_regular.typeface.json",
    //   function (font) {
    //     textGeometry = new TextGeometry("Hello three.js!", {
    //       font: font,
    //       size: 80,
    //       height: 5,
    //       curveSegments: 12,
    //       bevelEnabled: true,
    //       bevelThickness: 10,
    //       bevelSize: 8,
    //       bevelOffset: 0,
    //       bevelSegments: 5,
    //     });

    //     // Créer le matériau du texte
    //     const textMaterial = new THREE.MeshStandardMaterial({
    //       color: 0xffffff,
    //     });

    //     // Créer le mesh du texte
    //     this.textMesh = new THREE.Mesh(textGeometry, textMaterial);
    //     this.textMesh.rotation.x = -Math.PI / 2;
    //     this.textMesh.position.y = 0.11;

    //     // Ajouter le mesh de texte au groupe
    //     this.group.add(this.textMesh);
    //   }
    // );

    // ... Autres initialisations ...

    // Créer le trou central du vinyl
    const holeGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32);
    const holeMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
    });
    this.holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);

    // Add light
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(0, 1, 0); // ajustez la position de la lumière

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

    // Groupe pour regrouper les éléments du vinyl
    this.group.position.set(0, 0, 0);
    this.group.rotation.x = Math.PI * -0.5;
    this.group.add(this.vinylMesh);
    this.group.add(this.labelMesh);
    this.group.add(this.holeMesh);
    this.group.add(this.light);
    this.group.add(this.ambientLight);
  }

  setActive(active) {
    this.active = active;

    // Utiliser this.renderer au lieu de renderer
    if (this.active) {
      this.renderer.setClearColor(0x000000); // Remplacez par la couleur souhaitée
    } else {
      this.renderer.setClearColor(0xffffff); // Remplacez par la couleur souhaitée
    }
  }

  tick(deltaTime) {
    // Rotation du vinyl
    this.vinylMesh.rotation.y += 0.01 * deltaTime * 0.01;

    // Mise à l'échelle du vinyl en fonction des données audio
    const remapped = AudioController.fdata[0] / 255;
    this.vinylMesh.scale.set(1 + remapped, 1 + remapped, 1 + remapped);

    this.holeMesh.scale.set(1 + remapped, 1 + remapped, 1 + remapped);
    this.labelMesh.scale.set(1 + remapped, 1 + remapped, 1 + remapped);
    // this.textMesh.scale.set(1 + remapped, 1 + remapped, 1 + remapped);
  }
}
