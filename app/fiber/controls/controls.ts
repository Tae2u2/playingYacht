import { useEffect, useState } from "react";

// 키보드 입력 상태를 관리하는 타입
export interface KeyboardControls {
  forward: boolean; // W 또는 ↑
  backward: boolean; // S 또는 ↓
  left: boolean; // A 또는 ←
  right: boolean; // D 또는 →
  up: boolean; // Space
  down: boolean; // Shift
}

/**
 * 방향키와 WASD로 요트를 조종하는 커스텀 훅
 *
 * 사용법:
 * const controls = useKeyboardControls();
 * if (controls.forward) { // 앞으로 이동 }
 *
 * 키 매핑:
 * - W / ↑ : 전진
 * - S / ↓ : 후진
 * - A / ← : 좌회전
 * - D / → : 우회전
 * - Space : 상승
 * - Shift : 하강
 */
export const useKeyboardControls = (): KeyboardControls => {
  const [keys, setKeys] = useState<KeyboardControls>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowdown": // ↓ -> 전진 (반대)
          setKeys((prev) => ({ ...prev, forward: true }));
          break;
        case "s":
        case "arrowup": // ↑ -> 후진 (반대)
          setKeys((prev) => ({ ...prev, backward: true }));
          break;
        case "a":
        case "arrowright": // → -> 좌회전 (반대)
          setKeys((prev) => ({ ...prev, left: true }));
          break;
        case "d":
        case "arrowleft": // ← -> 우회전 (반대)
          setKeys((prev) => ({ ...prev, right: true }));
          break;
        case " ":
          e.preventDefault(); // 스페이스바 페이지 스크롤 방지
          setKeys((prev) => ({ ...prev, up: true }));
          break;
        case "shift":
          setKeys((prev) => ({ ...prev, down: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowdown": // ↓ -> 전진 (반대)
          setKeys((prev) => ({ ...prev, forward: false }));
          break;
        case "s":
        case "arrowup": // ↑ -> 후진 (반대)
          setKeys((prev) => ({ ...prev, backward: false }));
          break;
        case "a":
        case "arrowright": // → -> 좌회전 (반대)
          setKeys((prev) => ({ ...prev, left: false }));
          break;
        case "d":
        case "arrowleft": // ← -> 우회전 (반대)
          setKeys((prev) => ({ ...prev, right: false }));
          break;
        case " ":
          setKeys((prev) => ({ ...prev, up: false }));
          break;
        case "shift":
          setKeys((prev) => ({ ...prev, down: false }));
          break;
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // 클린업: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keys;
};

/**
 * 요트의 이동 속도 및 회전 속도 설정
 */
export const YACHT_CONTROLS = {
  moveSpeed: 0.2, // 전진/후진 속도
  rotationSpeed: 0.03, // 회전 속도 (라디안)
  verticalSpeed: 0.1, // 상승/하강 속도
  maxSpeed: 1.0, // 최대 속도
  acceleration: 0.05, // 가속도
  friction: 0.95, // 마찰력 (0-1, 1에 가까울수록 마찰이 적음)
};
