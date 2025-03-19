import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import FrameModel from './FrameModel';
import CanvasEnv from './CanvasEnv';
import Cloud from './Cloud';

const Main = () => {

  return (
      <Canvas gl={{ antialias: false }} flat shadows camera={{ position: [3, 0, 5], fov: 35 }}>
          <FrameModel />
          <Cloud />
          <CanvasEnv />
      </Canvas>
  )
}

export default Main;