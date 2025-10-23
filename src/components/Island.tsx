"use client";

import * as THREE from "three";
import { useMemo } from "react";

interface IslandProps {
  position?: [number, number, number];
  radiusX?: number;
  radiusZ?: number;
  height?: number;
  visible?: boolean;
}

export const Island = ({
  position = [0, -2, -75],
  radiusX = 20,
  radiusZ = 30,
  height = 5,
  visible = true,
}: IslandProps) => {
  // 타원형 실린더 지오메트리 생성
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(
      1, // top radius (normalized)
      1, // bottom radius
      height, // height
      64, // radial segments (과녁 패턴을 위해 증가)
      1 // height segments
    );

    // 타원형으로 변형 (x축과 z축 스케일 다르게)
    const vertices = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < vertices.length; i += 3) {
      vertices[i] *= radiusX; // x축 스케일
      vertices[i + 2] *= radiusZ; // z축 스케일
    }
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();

    return geo;
  }, [radiusX, radiusZ, height]);

  // 과녁 패턴을 위한 커스텀 셰이더
  const targetMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        radiusX: { value: radiusX },
        radiusZ: { value: radiusZ },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float radiusX;
        uniform float radiusZ;
        varying vec3 vPosition;

        void main() {
          // 타원형 중심으로부터의 정규화된 거리 계산
          float normalizedDist = sqrt(
            (vPosition.x * vPosition.x) / (radiusX * radiusX) +
            (vPosition.z * vPosition.z) / (radiusZ * radiusZ)
          );

          // 과녁 링 개수 (6개 링)
          float rings = 6.0;
          float ringIndex = floor(normalizedDist * rings);

          // 홀수/짝수 링에 따라 흑백 결정
          float isBlack = mod(ringIndex, 2.0);

          vec3 color = mix(vec3(1.0), vec3(0.0), isBlack);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }, [radiusX, radiusZ]);

  if (!visible) return null;

  return (
    <mesh
      position={position}
      geometry={geometry}
      material={targetMaterial}
      receiveShadow
      castShadow
    />
  );
};
