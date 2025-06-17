import { useSatellite } from "@/context/SateliteContext";
import { useSateliteTle } from "@/hooks/useSateliteTle";
import { GLView } from "expo-gl";
import { loadTextureAsync, Renderer } from "expo-three";
import { useCallback, useEffect, useRef } from "react";
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  View,
} from "react-native";
import * as satellite from "satellite.js";
import * as THREE from "three";

import { createOrbit, Position3D } from "@/components/orbit";
import { createSatellite } from "./satellite";

export function Earth() {
  const { noradId } = useSatellite();

  const { data: tleString } = useSateliteTle(
    typeof noradId === "number" ? noradId : undefined
  );

  const earthGroup = useRef<THREE.Group | null>(null);
  const satelliteMesh = useRef<THREE.Mesh | null>(null);
  const orbitLine = useRef<THREE.Line<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.LineBasicMaterial,
    THREE.Object3DEventMap
  > | null>(null);

  const tleRef = useRef<{ tle1: string; tle2: string } | null>(null);

  const rotationX = useRef(0);
  const rotationY = useRef(0);
  const scaleRef = useRef(0.8); // początkowa skala grupy

  const lastDistance = useRef<number | null>(null); // do pinch zoom

  const latLonAltToXYZ = useCallback(
    (lat: number, lon: number, altKm: number = 0, radius = 7): Position3D => {
      const EARTH_RADIUS_KM = 6371;
      const scaledRadius = radius * (1 + altKm / EARTH_RADIUS_KM);

      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      return {
        x: -scaledRadius * Math.sin(phi) * Math.cos(theta),
        y: scaledRadius * Math.cos(phi),
        z: scaledRadius * Math.sin(phi) * Math.sin(theta),
      };
    },
    []
  );

  const computeOrbitFromTLE = useCallback(
    (tle1: string, tle2: string): Position3D[] => {
      const satrec = satellite.twoline2satrec(tle1, tle2);
      const positions: Position3D[] = [];
      const now = new Date();

      for (let i = 0; i < 90; i++) {
        const time = new Date(now.getTime() + i * 60 * 1000);
        const pos = satellite.propagate(satrec, time);
        const gmst = satellite.gstime(time);

        if (pos?.position) {
          const geo = satellite.eciToGeodetic(pos.position, gmst);
          positions.push(
            latLonAltToXYZ(
              satellite.degreesLat(geo.latitude),
              satellite.degreesLong(geo.longitude),
              geo.height
            )
          );
        }
      }

      return positions;
    },
    [latLonAltToXYZ]
  );
  useEffect(() => {
    if (!tleString || typeof tleString !== "string") return;

    const lines = tleString.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return;

    const [tle1, tle2] = lines.slice(-2).map((line) => line.trim());
    tleRef.current = { tle1, tle2 };

    const positions = computeOrbitFromTLE(tle1, tle2);
    const orbit = createOrbit({ positions });

    if (earthGroup.current && orbit) {
      earthGroup.current.add(orbit);
      orbitLine.current = orbit;
    }
  }, [tleString, computeOrbitFromTLE]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (
        event: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        const touches = event.nativeEvent.touches;

        // ROTATION
        if (touches.length === 1) {
          const sensitivity = 0.002;
          const maxDelta = 0.05;

          const deltaX = Math.max(
            -maxDelta,
            Math.min(maxDelta, gestureState.dx * sensitivity)
          );
          const deltaY = Math.max(
            -maxDelta,
            Math.min(maxDelta, gestureState.dy * sensitivity)
          );

          rotationY.current += deltaX;
          rotationX.current += deltaY;

          if (earthGroup.current) {
            earthGroup.current.rotation.y = rotationY.current;
            earthGroup.current.rotation.x = rotationX.current;
          }
        }

        // PINCH TO ZOOM
        if (touches.length === 2) {
          const [touch1, touch2] = touches;
          const dx = touch1.pageX - touch2.pageX;
          const dy = touch1.pageY - touch2.pageY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (lastDistance.current !== null) {
            const delta = distance - lastDistance.current;

            // Skala powinna być między 0.3 a 2.0
            scaleRef.current = Math.min(
              2.0,
              Math.max(0.3, scaleRef.current + delta * 0.001)
            );

            if (earthGroup.current) {
              earthGroup.current.scale.set(
                scaleRef.current,
                scaleRef.current,
                scaleRef.current
              );
            }
          }

          lastDistance.current = distance;
        }
      },
      onPanResponderRelease: () => {
        lastDistance.current = null;
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
          scene.add(ambientLight);

          const texture = await loadTextureAsync({
            asset: require("../assets/models/earth/textures/earth_baseColor.png"),
          });
          texture.flipY = true;

          const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
          const earthMaterial = new THREE.MeshStandardMaterial({
            map: texture,
          });
          const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);

          const group = new THREE.Group();
          group.add(earthMesh);
          group.position.y = 1;
          group.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
          scene.add(group);
          earthGroup.current = group;

          const sat = createSatellite({
            position: { x: 0, y: 0, z: 0 },
            size: 0.3,
          });
          group.add(sat);
          satelliteMesh.current = sat;

          const animate = () => {
            requestAnimationFrame(animate);

            if (earthGroup.current) {
              earthGroup.current.rotation.y = rotationY.current;
              earthGroup.current.rotation.x = rotationX.current;
            }

            if (tleRef.current && satelliteMesh.current) {
              const { tle1, tle2 } = tleRef.current;
              const satrec = satellite.twoline2satrec(tle1, tle2);
              const now = new Date();
              const pos = satellite.propagate(satrec, now);
              const gmst = satellite.gstime(now);

              if (pos?.position) {
                const geo = satellite.eciToGeodetic(pos.position, gmst);
                const newPos = latLonAltToXYZ(
                  satellite.degreesLat(geo.latitude),
                  satellite.degreesLong(geo.longitude),
                  geo.height
                );
                satelliteMesh.current.position.set(
                  newPos.x,
                  newPos.y,
                  newPos.z
                );
              }
            }

            renderer.render(scene, camera);
            gl.endFrameEXP();
          };

          animate();
        }}
      />
    </View>
  );
}
