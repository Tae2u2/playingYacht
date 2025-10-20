import { useRef, useEffect } from "react";
import { Clone, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useKeyboardControls, YACHT_CONTROLS } from "../controls/controls";

export const ControllableYacht = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const yachtRef = useRef<THREE.Group>(null!);
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const controls = useKeyboardControls();

  useEffect(() => {
    if (yachtRef.current) {
      yachtRef.current.rotation.y = 0;
    }
  }, []);

  useFrame((state, delta) => {
    if (!yachtRef.current) return;

    const yacht = yachtRef.current;
    const velocity = velocityRef.current;

    if (controls.left) {
      yacht.rotation.y += YACHT_CONTROLS.rotationSpeed;
    }
    if (controls.right) {
      yacht.rotation.y -= YACHT_CONTROLS.rotationSpeed;
    }

    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(yacht.quaternion);

    if (controls.forward) {
      velocity.add(direction.multiplyScalar(YACHT_CONTROLS.acceleration));
    }
    if (controls.backward) {
      velocity.add(direction.multiplyScalar(-YACHT_CONTROLS.acceleration));
    }

    if (controls.up) {
      velocity.y += YACHT_CONTROLS.verticalSpeed * delta;
    }
    if (controls.down) {
      velocity.y -= YACHT_CONTROLS.verticalSpeed * delta;
    }

    const speed = velocity.length();
    if (speed > YACHT_CONTROLS.maxSpeed) {
      velocity.normalize().multiplyScalar(YACHT_CONTROLS.maxSpeed);
    }

    velocity.multiplyScalar(YACHT_CONTROLS.friction);
    yacht.position.add(velocity.clone().multiplyScalar(delta * 60));

    if (yacht.position.y < 0) {
      yacht.position.y = 0;
      velocity.y = 0;
    }

    if (speed > 0.01) {
      const time = state.clock.getElapsedTime();
      yacht.rotation.z = Math.sin(time * 3) * 0.02;
      yacht.rotation.x = Math.cos(time * 2.5) * 0.02;
    }
  });

  return (
    <group ref={yachtRef}>
      <Clone object={scene} scale={0.5} />
    </group>
  );
};
