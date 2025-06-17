import * as THREE from "three";
import { Position3D } from "./orbit";

interface SatelliteOptions {
  position: Position3D;
  size?: number;
  color?: number;
}

export function createSatellite({
  position,
  size = 0.15, // mniejsze
  color = 0xffffff, // biały
}: SatelliteOptions): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(size, 16, 16);
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.6,
  });

  const satelliteMesh = new THREE.Mesh(geometry, material);

  satelliteMesh.position.set(position.x, position.y, position.z);

  // Dodajemy funkcję animacji "pulsowania"
  satelliteMesh.userData.update = (time: number) => {
    const scaleFactor = 1 + 0.25 * Math.sin(time * 3); // częstotliwość i siła pulsowania
    satelliteMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
  };

  return satelliteMesh;
}
