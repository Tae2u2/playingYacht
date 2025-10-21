import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Water } from "three/examples/jsm/objects/Water";
import { TextureLoader, RepeatWrapping, PlaneGeometry, Vector3 } from "three";

function Ocean() {
  const waterRef = useRef<Water>(null);

  // 물결 노말맵 로드
  const waterNormals = useLoader(
    TextureLoader,
    "https://threejs.org/examples/textures/waternormals.jpg"
  );

  waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping;

  useFrame((state, delta: number) => {
    if (waterRef.current) {
      waterRef.current.material.uniforms["time"].value += delta;
    }
  });

  const waterGeometry = new PlaneGeometry(10000, 10000);

  const water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: waterNormals,
    sunDirection: new Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: false,
  });

  water.rotation.x = -Math.PI / 2;

  return <primitive object={water} ref={waterRef} />;
}

export default Ocean;
