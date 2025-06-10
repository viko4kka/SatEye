import * as THREE from "three";

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

interface SatelliteProps {
  position: Position3D;
  size?: number;
  color?: number;
}

export function Satellite({
  position,
  size = 0.1,
  color = 0xffff00,
}: SatelliteProps) {
  const geometry = new THREE.SphereGeometry(size, 16, 16);
  const material = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(position.x, position.y, position.z);
  return mesh;
}
