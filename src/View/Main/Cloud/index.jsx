import { useVideoTexture } from "@react-three/drei"
import { Bloom, BrightnessContrast, EffectComposer, HueSaturation, TiltShift2, ToneMapping, WaterEffect } from "@react-three/postprocessing"

const Cloud = () => {
    return (
        <>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} scale={500}>
                <planeGeometry />
                <meshLambertMaterial color="#353535" />
            </mesh>
            <Postpro />
            <Cookie distance={100} intensity={5} angle={0.6} penumbra={1} position={[2, 5, 0]} />
        </>
    )
}

export default Cloud

const Postpro = () => {
    return (
        <EffectComposer disableNormalPass>
            <HueSaturation saturation={-1} />
            {/* <BrightnessContrast brightness={0} contrast={0.25} /> */}
            {/* <WaterEffect factor={0.75} /> */}
            {/* <TiltShift2 samples={6} blur={0.5} /> */}
            <Bloom mipmapBlur luminanceThreshold={0} intensity={15} />
            {/* <ToneMapping /> */}
        </EffectComposer>
    )
}
  
const Cookie = (props) => {
    const texture = useVideoTexture('/caustics.mp4')
    return <spotLight decay={0} map={texture} castShadow {...props} />
}