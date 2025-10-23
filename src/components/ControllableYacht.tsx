import { useRef, useEffect, forwardRef } from "react";
import { Clone, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useKeyboardControls, YACHT_CONTROLS } from "../controls/controls";

interface ControllableYachtProps {
  url: string;
  onPositionChange?: (position: THREE.Vector3) => void;
  visible?: boolean;
}

export const ControllableYacht = forwardRef<
  THREE.Group,
  ControllableYachtProps
>(({ url, onPositionChange, visible = true }, ref) => {
  const { scene } = useGLTF(url);
  const yachtRef = useRef<THREE.Group>(null!);
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const controls = useKeyboardControls();

  useEffect(() => {
    if (yachtRef.current) {
      yachtRef.current.position.y = 8; // 초기 y축 위치 설정
      yachtRef.current.rotation.y = Math.PI; // 180도 회전 (↑ 키로 전진하도록)
      // ref 전달
      if (typeof ref === "function") {
        ref(yachtRef.current);
      } else if (ref) {
        ref.current = yachtRef.current;
      }
    }
  }, [ref]);

  useFrame((state, delta) => {
    if (!yachtRef.current) return;

    const yacht = yachtRef.current;
    const velocity = velocityRef.current;

    if (controls.left) {
      yacht.rotation.y -= YACHT_CONTROLS.rotationSpeed;
    }
    if (controls.right) {
      yacht.rotation.y += YACHT_CONTROLS.rotationSpeed;
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

    // 위치 변경 콜백 호출
    if (onPositionChange) {
      onPositionChange(yacht.position.clone());
    }

    if (speed > 0.01) {
      const time = state.clock.getElapsedTime();
      yacht.rotation.z = Math.sin(time * 3) * 0.02;
      yacht.rotation.x = Math.cos(time * 2.5) * 0.02;
    }
  });

  return (
    <group ref={yachtRef} visible={visible}>
      <Clone object={scene} scale={0.5} />
    </group>
  );
});

ControllableYacht.displayName = "ControllableYacht";
