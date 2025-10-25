/**
 * 현재 시간을 기반으로 태양 위치를 계산하는 유틸리티
 */

/**
 * 현재 시간에 따른 태양의 위치를 계산
 * @returns [x, y, z] 태양 위치 벡터
 */
export const getSunPosition = (): [number, number, number] => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // 시간을 0-24 범위의 소수로 변환
  const timeOfDay = hours + minutes / 60;

  // 0시 ~ 24시를 0 ~ 2π 라디안으로 매핑
  const angle = (timeOfDay / 24) * Math.PI * 2;

  // 태양의 궤도 반지름
  const distance = 100;
  const height = 50;

  // 낮 12시에 최고점, 밤 0시에 최저점
  // angle = 0 (0시) -> y = -height (지평선 아래)
  // angle = π/2 (6시) -> y = 0 (일출)
  // angle = π (12시) -> y = height (정오)
  // angle = 3π/2 (18시) -> y = 0 (일몰)
  const x = Math.sin(angle) * distance;
  const y = -Math.cos(angle) * height; // 12시에 최고점
  const z = Math.cos(angle) * distance;

  return [x, y, z];
};

/**
 * 현재 시간이 낮인지 밤인지 판단
 * @returns true: 낮, false: 밤
 */
export const isDaytime = (): boolean => {
  const now = new Date();
  const hours = now.getHours();
  // 6시 ~ 18시를 낮으로 간주
  return hours >= 6 && hours < 18;
};

/**
 * 현재 시간에 따른 하늘 밝기 계산
 * @returns 0-1 사이의 값 (0: 완전한 밤, 1: 완전한 낮)
 */
export const getSkyBrightness = (): number => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const timeOfDay = hours + minutes / 60;

  // 낮 시간대 (6시 ~ 18시)
  if (timeOfDay >= 6 && timeOfDay < 18) {
    // 정오(12시)에 가장 밝음
    const noonOffset = Math.abs(timeOfDay - 12);
    return 1 - noonOffset / 12;
  }

  // 밤 시간대
  return 0.2; // 최소 밝기
};
