import * as THREE from "three";

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export function createOrbit({
  positions,
  color = 0x00ff00,
}: {
  positions: Position3D[];
  color?: number;
}): THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial> {
  if (positions?.length === 0) {
    console.warn("No positions provided to createOrbit");
    return new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color })
    );
  }

  const points = positions.map((pos) => new THREE.Vector3(pos.x, pos.y, pos.z));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color });

  return new THREE.Line(geometry, material);
}
