import { Environment, useHelper } from '@react-three/drei';
import React, { useRef } from 'react'
import { CameraHelper } from 'three';

const CanvasEnv = () => {
  const camera = useRef();
  // useHelper(camera, CameraHelper);

  return (
    <group>
      <Environment preset='dawn' background blur={1} />
      <directionalLight castShadow intensity={5} position={[-20, 50, -50]} shadow-mapSize={[2048, 2048]}>
        <orthographicCamera ref={camera} attach="shadow-camera" args={[-30, 30, 30, -30]} />
      </directionalLight>

      <directionalLight position={[-50, 100, -50]} intensity={0.5} />
      <ambientLight intensity={1.5} />

      {/* <axesHelper args={[50, 50]} position={[0, 1.3, 0]}/> */}
      {/* <gridHelper args={[150, 150]} position={[0, 1.2, 0]} /> */}
    </group>
  )
}

export default CanvasEnv