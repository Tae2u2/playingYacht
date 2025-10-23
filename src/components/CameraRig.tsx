import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  targetRef: React.RefObject<THREE.Group>;
  offset?: THREE.Vector3;
  smoothness?: number;
}

export const CameraRig = ({
  targetRef,
  offset = new THREE.Vector3(0, 5, 15),
  smoothness = 0.05,
}: CameraRigProps) => {
  const { camera } = useThree();
  const cameraPositionRef = useRef(new THREE.Vector3());
  const lookAtPositionRef = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!targetRef.current) return;

    const target = targetRef.current;

    // 요트의 rotation을 고려한 카메라 오프셋 계산
    const rotatedOffset = offset.clone();
    rotatedOffset.applyQuaternion(target.quaternion);

    // 목표 카메라 위치
    const targetCameraPosition = target.position.clone().add(rotatedOffset);

    // 부드러운 카메라 이동 (lerp)
    cameraPositionRef.current.lerp(targetCameraPosition, smoothness);
    camera.position.copy(cameraPositionRef.current);

    // 카메라가 요트를 바라보도록 설정
    const lookAtTarget = target.position.clone();
    lookAtTarget.y += 2; // 요트의 중심보다 약간 위를 바라봄

    lookAtPositionRef.current.lerp(lookAtTarget, smoothness);
    camera.lookAt(lookAtPositionRef.current);
  });

  return null;
};
