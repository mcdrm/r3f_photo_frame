import { AccumulativeShadows, Environment, OrbitControls, RandomizedLight } from '@react-three/drei';
import React, { useRef } from 'react'

const CanvasEnv = () => {
  const camera = useRef();

  return (
    <group>
      <color attach="background" args={['#353535']} />
      <fog attach="fog" args={['#353535', 5, 20]} />
      <ambientLight intensity={2} />
      <AccumulativeShadows receiveShadow temporal frames={100} opacity={0.8} alphaTest={0.9} scale={12} position={[0, -0.5, 0]}>
        <RandomizedLight radius={4} ambient={0.5} position={[5, 8, -10]} bias={0.001} />
      </AccumulativeShadows>
      <Environment preset="city" />
      <OrbitControls autoRotate autoRotateSpeed={0.1} enableZoom={false} minPolarAngle={0} maxPolarAngle={Math.PI / 3} />
    </group>
  )
}

export default CanvasEnv