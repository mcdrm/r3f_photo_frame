import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import FrameModel from './FrameModel';
import CanvasEnv from './CanvasEnv';

const Main = () => {

  return (
    <Canvas
      camera={{
        aspect: window.innerWidth / window.innerHeight,
        fov: 45,
        near: 0.01,
        far: 10000,
      }}
      shadows
    >
      <OrbitControls />
      <FrameModel />
      <CanvasEnv />
    </Canvas>
  )
}

export default Main;