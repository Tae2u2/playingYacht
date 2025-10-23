"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Sky } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls, button } from "leva";
import { ControllableYacht } from "./ControllableYacht";
import { ControlsUI } from "./ControlsUI";
import { CameraRig } from "./CameraRig";
import { Island } from "./Island";
import { IslandUI } from "./IslandUI";
import * as THREE from "three";
import Ocean from "./Ocean";
import { checkIslandCollision } from "../utils/collision";

const YACHT_MODEL_URL = "/yacht_light.glb";

// 섬 설정
const ISLAND_CONFIG = {
  position: [0, -2, -145] as [number, number, number],
  radiusX: 20,
  radiusZ: 30,
  height: 5,
};

export const YachtScene = () => {
  const [canvasKey, setCanvasKey] = useState(0);
  const [isInIsland, setIsInIsland] = useState(false);
  const yachtRef = useRef<THREE.Group>(null);

  // 요트 위치 변경 시 섬 충돌 감지
  const handleYachtPositionChange = (position: THREE.Vector3) => {
    const collision = checkIslandCollision(
      position,
      ISLAND_CONFIG.position,
      ISLAND_CONFIG.radiusX,
      ISLAND_CONFIG.radiusZ
    );

    if (collision && !isInIsland) {
      setIsInIsland(true);
    } else if (!collision && isInIsland) {
      setIsInIsland(false);
    }
  };

  // Leva 컨트롤 설정
  const { showPerf, ambientIntensity, directionalIntensity } = useControls({
    "Canvas Control": button(() => setCanvasKey((prev) => prev + 1)),
    showPerf: {
      value: true,
      label: "Show Performance",
    },
    ambientIntensity: {
      value: 0.6,
      min: 0,
      max: 2,
      step: 0.1,
      label: "Ambient Light",
    },
    directionalIntensity: {
      value: 1.5,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Directional Light",
    },
  });

  // canvasKey 변경 로그
  useEffect(() => {
    console.log("Canvas refreshed, key:", canvasKey);
  }, [canvasKey]);

  return (
    <div className="w-full h-screen">
      <ControlsUI />
      <IslandUI isVisible={isInIsland} />

      <Canvas
        key={canvasKey}
        camera={{ position: [0, 10, 20], fov: 60, near: 1, far: 1000 }}
      >
        {showPerf && <Perf position="top-left" />}

        <Environment preset="city" />
        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={[50, 50, 50]}
          intensity={directionalIntensity}
        />

        <Sky
          distance={450000}
          sunPosition={[100, 20, 100]}
          inclination={0.6}
          azimuth={0.25}
        />

        <Suspense fallback={null}>
          <ControllableYacht
            ref={yachtRef}
            url={YACHT_MODEL_URL}
            onPositionChange={handleYachtPositionChange}
            visible={!isInIsland}
          />
          <Island
            position={ISLAND_CONFIG.position}
            radiusX={ISLAND_CONFIG.radiusX}
            radiusZ={ISLAND_CONFIG.radiusZ}
            height={ISLAND_CONFIG.height}
          />
        </Suspense>

        <Ocean />
        <CameraRig targetRef={yachtRef} offset={new THREE.Vector3(0, 8, -20)} />
      </Canvas>
    </div>
  );
};
