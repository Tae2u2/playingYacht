"use client";

import {
  Clone,
  Environment,
  OrbitControls,
  Sky,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";

const Models = [{ name: "yacht", url: "/yacht_light.glb" }];

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <Clone object={scene} />;
};

const Box2 = (props: JSX.IntrinsicElements["mesh"]) => {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    //mesh.current.rotation.x = mesh.current.rotation.y += 0.05
  });
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial attach="material" color="royalblue" />
    </mesh>
  );
};

export default function Page() {
  return (
    <div className="w-ful h-screen">
      {/*position [숫자가 커질수록 멀어짐, 숫자가 커질수록 y축을 기준으로 앞으로 회전함 (천장이 보임),숫자가 커질수록z축을 기점으로 시계 반대방향으로 회전함]*/}
      <Canvas camera={{ position: [20, 0, 20], near: 1 }}>
        <Environment preset="city" />
        {/* 아파트 배경, 숲, 공원 등 drei에서 기본 설정된 환경을 배경으로 넣을 수 있음 */}
        <Suspense>
          <Model url={Models[0].url} />
          {/*threejs*/}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Box2 position={[-1.2, 0, 0]} />
          <Box2 position={[1.2, 0, 0]} />
        </Suspense>
        <OrbitControls />
        {/*하늘도 제공인데 태양의 위치, 밤도 오게 할 수 있다. */}
        <Sky sunPosition={[100, 110, 50]} />
      </Canvas>
    </div>
  );
}
