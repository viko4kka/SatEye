import { useOrbit } from "@/hooks/useOrbit";
import { GLView } from "expo-gl";
import { Renderer, loadTextureAsync } from "expo-three";
import { useRef } from "react";
import { PanResponder, View } from "react-native";
import * as THREE from "three";
import { Orbit } from "./Orbit";
import { Satellite } from "./Satellite";

export function Earth() {
  const earthGroup = useRef<THREE.Group | null>(null);
  const rotationX = useRef(0);
  const rotationY = useRef(0);

  const { data: orbitPositions } = useOrbit(25544);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dx, dy } = gestureState;
        const sensitivity = 0.002;
        const maxDelta = 0.05;

        const deltaX = Math.max(
          -maxDelta,
          Math.min(maxDelta, dx * sensitivity)
        );
        const deltaY = Math.max(
          -maxDelta,
          Math.min(maxDelta, dy * sensitivity)
        );

        rotationY.current += deltaX;
        rotationX.current += deltaY;

        if (earthGroup.current) {
          earthGroup.current.rotation.y = rotationY.current;
          earthGroup.current.rotation.x = rotationX.current;
        }
      },
    })
  ).current;

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <GLView
        style={{ flex: 1 }}
        onContextCreate={async (gl) => {
          const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
          );
          camera.position.z = 15;

          const renderer = new Renderer({ gl });
          renderer.setSize(width, height);

          const ambientLight = new THREE.AmbientLight(0xffffff, 1);
          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
          directionalLight.position.set(10, 10, 10);

          scene.add(ambientLight);
          scene.add(directionalLight);

          const texture = await loadTextureAsync({
            asset: require("../assets/models/earth/textures/earth_baseColor.png"),
          });
          texture.flipY = true;

          const geometry = new THREE.SphereGeometry(5, 64, 64);
          const material = new THREE.MeshStandardMaterial({ map: texture });
          const earthMesh = new THREE.Mesh(geometry, material);
          earthMesh.position.set(0, 0, 0); // ustawienie Ziemi w centrum

          const group = new THREE.Group();
          group.add(earthMesh);
          earthGroup.current = group;
          scene.add(group);

          // Dodaj orbitę i satelitę
          if (orbitPositions && orbitPositions.length > 0) {
            const satPos = orbitPositions[orbitPositions.length - 1];

            const orbit = Orbit(orbitPositions); // zmodyfikowane
            const satellite = Satellite({ position: satPos }); // zmodyfikowane

            group.add(orbit);
            group.add(satellite);
          }

          const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            gl.endFrameEXP();
          };

          animate();
        }}
      />
    </View>
  );
}
