import * as THREE from "three";

/**
 * 타원형 섬과의 충돌 감지
 * @param yachtPosition 요트의 위치
 * @param islandPosition 섬의 위치 [x, y, z]
 * @param radiusX 섬의 X축 반지름
 * @param radiusZ 섬의 Z축 반지름
 * @returns 요트가 섬에 도착했는지 여부
 */
export const checkIslandCollision = (
  yachtPosition: THREE.Vector3,
  islandPosition: [number, number, number],
  radiusX: number,
  radiusZ: number
): boolean => {
  const [islandX, , islandZ] = islandPosition;

  // 요트와 섬 중심 사이의 거리 계산 (타원 방정식 사용)
  const dx = (yachtPosition.x - islandX) / radiusX;
  const dz = (yachtPosition.z - islandZ) / radiusZ;

  // 타원 내부에 있는지 확인 (x²/a² + z²/b² <= 1)
  const distanceSquared = dx * dx + dz * dz;

  return distanceSquared <= 1;
};
