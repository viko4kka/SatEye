import * as THREE from "three";

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export function Orbit(positions: Position3D[]) {
  if (!positions || positions.length === 0) {
    console.warn("No positions provided to Orbit");
    return new THREE.Object3D(); // pusty obiekt 3D, żeby uniknąć crasha
  }

  const closedPositions = [...positions, positions[0]];
  const points = closedPositions.map(
    (pos) => new THREE.Vector3(pos.x, pos.y, pos.z)
  );
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const orbitLine = new THREE.LineLoop(geometry, material);

  console.log("Orbit object created with points:", points);

  return orbitLine;
}
