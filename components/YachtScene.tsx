"use client";

import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Sky } from "@react-three/drei";
import { ControllableYacht } from "./ControllableYacht";
import { ControlsUI } from "./ControlsUI";
import { CameraRig } from "./CameraRig";
import * as THREE from "three";
import Ocean from "./Ocean";

const YACHT_MODEL_URL = "/yacht_light.glb";

export const YachtScene = () => {
  const [canvasKey] = useState(0);
  const yachtRef = useRef<THREE.Group>(null);

  return (
    <div className="w-full h-screen">
      <ControlsUI />

      <Canvas
        key={canvasKey}
        camera={{ position: [0, 10, 20], fov: 60, near: 1, far: 1000 }}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.6} />
        <directionalLight position={[50, 50, 50]} intensity={1.5} />

        <Sky
          distance={450000}
          sunPosition={[100, 20, 100]}
          inclination={0.6}
          azimuth={0.25}
        />

        <Suspense fallback={null}>
          <ControllableYacht ref={yachtRef} url={YACHT_MODEL_URL} />
        </Suspense>

        <Ocean />
        <CameraRig
          targetRef={yachtRef}
          offset={new THREE.Vector3(0, 8, -20)}
        />
      </Canvas>
    </div>
  );
};
