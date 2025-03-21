import * as THREE from 'three';
import React from 'react'
import { TextureLoader } from 'three';
import { useLoader, useThree } from '@react-three/fiber';

import TextureFrame from '../../../assets/image/frame-texture.jpg'
import PhotoImg from '../../../assets/image/photo.jpg'

export const extrudeSettings = (value) => {
  const setting = {
    steps: 1,
    depth: value,
    bevelEnabled: false,
    bevelThickness: 0,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 1
  }
  return setting;
}
export const extrudeBevelSettings = (value) => {
  const setting = {
    steps: 1,
    depth: value,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelOffset: 0.05,
    bevelSegments: 25
  }
  return setting;
}

const FrameModel = () => {
  const { gl } = useThree();

  const borderTexture = useLoader(TextureLoader, TextureFrame);
  borderTexture.anisotropy = Math.min(gl.capabilities.getMaxAnisotropy(50));
  borderTexture.wrapS = borderTexture.wrapT = THREE.RepeatWrapping;
  borderTexture.repeat.set(0.02, 0.075)
  borderTexture.offset.x = 0.5
  borderTexture.offset.y = 0.5

  const middleBorderTexture = borderTexture?.clone()
  middleBorderTexture.anisotropy = Math.min(gl.capabilities.getMaxAnisotropy(50));
  middleBorderTexture.wrapS = middleBorderTexture.wrapT = THREE.RepeatWrapping;
  middleBorderTexture.repeat.set(11, 11)
  middleBorderTexture.offset.x = 0.5
  middleBorderTexture.offset.y = 0.5

  const photoTexture = useLoader(TextureLoader, PhotoImg)
  photoTexture.anisotropy = Math.min(gl.capabilities.getMaxAnisotropy(50));
  photoTexture.wrapS = photoTexture.wrapT = THREE.RepeatWrapping;
  photoTexture.repeat.set(0.025, 0.035)
  photoTexture.rotation = Math.PI / 2
  photoTexture.offset.x = 0.5
  photoTexture.offset.y = 0.5

  const photoSectionW = 26.7;
  const photoSectionH = 39;
  const photoSectionThickness = 1;
  const middleFrameBorder = 3
  const outFrameBorder = 1.3;
  
  const middleFrameW = photoSectionW + middleFrameBorder * 2;
  const middleFrameH = photoSectionH + middleFrameBorder * 2;
  const middleFrameThickness = photoSectionThickness + 0.14;
  const outFrameShort = middleFrameW + outFrameBorder * 2;
  const outFrameLarge = middleFrameH + outFrameBorder * 2;
  const outFrameThickness = middleFrameThickness + 0.3;
  
  const photoSectionModel = () => {
    const model = new THREE.Shape();
    model.moveTo(-photoSectionW / 2, -photoSectionH / 2) ;
    model.lineTo(-photoSectionW / 2, photoSectionH / 2);
    model.lineTo(photoSectionW / 2, photoSectionH / 2);
    model.lineTo(photoSectionW / 2, -photoSectionH / 2);
    model.closePath();

    return model;
  }
  
  const middleFrameModel = () => {
    const model = new THREE.Shape();
    model.moveTo(-middleFrameW / 2, -middleFrameH / 2) ;
    model.lineTo(-middleFrameW / 2, middleFrameH / 2);
    model.lineTo(middleFrameW / 2, middleFrameH / 2);
    model.lineTo(middleFrameW / 2, -middleFrameH / 2);
    model.closePath();

    const hole = new THREE.Path();    
    hole.moveTo(-photoSectionW / 2, -photoSectionH / 2) ;
    hole.lineTo(-photoSectionW / 2, photoSectionH / 2);
    hole.lineTo(photoSectionW / 2, photoSectionH / 2);
    hole.lineTo(photoSectionW / 2, -photoSectionH / 2);
    hole.closePath();

    model.holes.push(hole);

    return model;
  }

  const outFrameShortModel = () => {
    const model = new THREE.Shape();
    model.moveTo(-outFrameShort / 2, -outFrameBorder);
    model.lineTo(-outFrameShort / 2 + outFrameBorder + 0.035, 0);
    model.lineTo(outFrameShort / 2 - outFrameBorder - 0.035, 0);
    model.lineTo(outFrameShort / 2, -outFrameBorder);
    model.closePath();

    return model;
  }

  const outFrameLargeModel = () => {
    const model = new THREE.Shape();
    model.moveTo(-outFrameLarge / 2, -outFrameBorder);
    model.lineTo(-outFrameLarge / 2 + outFrameBorder + 0.035, 0);
    model.lineTo(outFrameLarge / 2 - outFrameBorder - 0.035, 0);
    model.lineTo(outFrameLarge / 2, -outFrameBorder);
    model.closePath();

    return model;
  }
  
  return (
    <group castShadow receiveShadow name='model' rotation={[-Math.PI / 2, 0, 0]} scale={0.075}>
      <mesh castShadow receiveShadow name='photo-section'>
        <extrudeGeometry args={[photoSectionModel(), extrudeSettings(photoSectionThickness)]} />
        <meshPhongMaterial map={photoTexture} color={'#999'} />
      </mesh>

      <mesh receiveShadow name='middle-frame'>
        <extrudeGeometry args={[middleFrameModel(), extrudeSettings(middleFrameThickness)]} />
        <meshPhongMaterial map={middleBorderTexture} bumpMap={middleBorderTexture} bumpScale={0.01} specular="#664C29" color={'#333'} side={THREE.DoubleSide}/>
      </mesh>

      <group castShadow name='out-frame'>
        <mesh castShadow name='top' position={[0, middleFrameH / 2 + 0.12, outFrameBorder + 0.14]} rotation={[Math.PI, 0, 0]}>
          <extrudeGeometry args={[outFrameShortModel(), extrudeBevelSettings(outFrameThickness)]} />
          <meshPhongMaterial map={borderTexture} bumpMap={borderTexture} bumpScale={0.01} specular="#664C29" color='#333' side={THREE.DoubleSide} roughness={0.5}/>
        </mesh>
        <mesh castShadow name='bottom' position={[0, -middleFrameH / 2 - 0.12, 0]}>
          <extrudeGeometry args={[outFrameShortModel(), extrudeBevelSettings(outFrameThickness)]} />
          <meshPhongMaterial map={borderTexture} bumpMap={borderTexture} bumpScale={0.01} specular="#664C29" color='#333' side={THREE.DoubleSide} roughness={0.5}/>
        </mesh>
        <mesh castShadow name='left' position={[-middleFrameW / 2 - 0.12, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <extrudeGeometry args={[outFrameLargeModel(), extrudeBevelSettings(outFrameThickness)]} />
          <meshPhongMaterial map={borderTexture} bumpMap={borderTexture} bumpScale={0.01} specular="#664C29" color='#333' side={THREE.DoubleSide} roughness={0.5}/>
        </mesh>
        <mesh castShadow name='right' position={[middleFrameW / 2 + 0.12, 0, outFrameBorder + 0.14]} rotation={[0, Math.PI, -Math.PI / 2]}>
          <extrudeGeometry args={[outFrameLargeModel(), extrudeBevelSettings(outFrameThickness)]} />
          <meshPhongMaterial map={borderTexture} bumpMap={borderTexture} bumpScale={0.01} specular="#664C29" color='#333' side={THREE.DoubleSide} roughness={0.5}/>
        </mesh>
      </group>
    </group>
  )
}

export default FrameModel