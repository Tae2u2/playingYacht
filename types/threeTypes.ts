declare module "three/examples/jsm/objects/Water" {
  import { Mesh, PlaneGeometry, ShaderMaterial, Texture, Vector3 } from "three";

  export interface WaterOptions {
    textureWidth?: number;
    textureHeight?: number;
    waterNormals: Texture;
    sunDirection?: Vector3;
    sunColor?: number;
    waterColor?: number;
    distortionScale?: number;
    fog?: boolean;
    alpha?: number;
  }

  export class Water extends Mesh {
    material: ShaderMaterial & {
      uniforms: {
        time: { value: number };
        [key: string]: any;
      };
    };

    constructor(geometry: PlaneGeometry, options: WaterOptions);
  }
}
