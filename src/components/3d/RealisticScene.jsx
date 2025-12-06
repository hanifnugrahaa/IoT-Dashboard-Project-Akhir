import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment, 
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  MeshReflectorMaterial
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import RealisticLogo from './RealisticLogo';

const RealisticScene = () => {
  return (
    <div className="w-full h-full relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
      
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        {/* Clear Color */}
        <color attach="background" args={['#000000']} />
        
        {/* Fog for Depth */}
        <fog attach="fog" args={['#000000', 5, 15]} />
        
        {/* Sky/Environment */}
        <Sky 
          distance={450000}
          sunPosition={[100, 20, 100]}
          inclination={0}
          azimuth={0.25}
        />
        
        {/* Main Lighting */}
        <ambientLight intensity={0.3} />
        
        {/* Dynamic Lights */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          color="#4fc3f7"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        <directionalLight
          position={[-5, 3, 2]}
          intensity={0.5}
          color="#9575cd"
          castShadow
        />
        
        {/* Rim Light */}
        <directionalLight
          position={[0, 0, -5]}
          intensity={0.3}
          color="#ffffff"
        />
        
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        
        {/* Floor Reflection */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={80}
            depthScale={1}
            minDepthThreshold={0.9}
            maxDepthThreshold={1}
            color="#101020"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Contact Shadows */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.8}
          scale={10}
          blur={2}
          far={5}
          resolution={256}
          color="#000000"
        />
        
        {/* Accumulative Shadows for softer shadows */}
        <AccumulativeShadows
          temporal
          frames={100}
          color="#000000"
          colorBlend={0.5}
          alphaTest={0.9}
          scale={20}
        >
          <RandomizedLight
            amount={8}
            radius={5}
            ambient={0.5}
            position={[5, 5, -10]}
          />
        </AccumulativeShadows>
        
        {/* Logo */}
        <Suspense fallback={null}>
          <RealisticLogo />
        </Suspense>
        
        {/* Environment Map for Reflections */}
        <Environment preset="studio" background={false} />
        
        {/* Post-processing Effects */}
        <EffectComposer>
          <DepthOfField
            focusDistance={0.02}
            focalLength={0.05}
            bokehScale={3}
          />
          <Bloom
            intensity={0.8}
            kernelSize={3}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.025}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.002, 0.002]}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default RealisticScene;