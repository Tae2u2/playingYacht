# 3D 라이브러리 Fiber

- Next환경에서도 잘 동작한다고 해서 학습해봤다.
- /fiber 경로로 접근
- 요트는 무료 소스 사용
- 기본적인 마우스, 스크롤 그리고 하늘을 적용했다.

```
    "@react-three/drei": "^9.105.6",
    "@react-three/fiber": "^8.16.6",
    "@react-three/gltfjsx": "^4.3.4",
```


```
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

```

<img width="1056" height="552" alt="스크린샷 2025-09-15 015743" src="https://github.com/user-attachments/assets/1ac5fbe2-22c4-4351-b2a9-74bcb053f637" />

<img width="613" height="530" alt="스크린샷 2025-09-15 015752" src="https://github.com/user-attachments/assets/89e93e47-c770-4af9-9dd1-f611768ef1c7" />
<img width="679" height="635" alt="스크린샷 2025-09-15 015757" src="https://github.com/user-attachments/assets/e1c5181d-0183-4abc-9e19-4dd565bccc71" />


---

3d 구현 작업에는 오래전부터 관심이 많았다. 앞으로도 꾸준히 학습하고 싶은 부분이다. <br /> 키보드로 오브제를 움직이는 것과 빛과 카메라의 위치를 지정하는 기본적인 코드는 작성할 수 있다.
