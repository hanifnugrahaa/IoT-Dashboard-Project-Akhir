import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import AirQualityIcon3D from './AirQualityIcon3D';

const CleanAirScene = ({ autoRotate = false, enableControls = false }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient Light */}
        <ambientLight intensity={0.5} color="#ffffff" />
        
        {/* Main Directional Light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          color="#ffffff"
          castShadow
        />
        
        {/* Fill Light */}
        <directionalLight
          position={[-5, -5, 5]}
          intensity={0.3}
          color="#ffffff"
        />
        
        {/* Rim Light */}
        <directionalLight
          position={[0, 0, -5]}
          intensity={0.2}
          color="#ffffff"
        />

        {/* Stars Background (minimal) */}
        <Stars 
          radius={100} 
          depth={50} 
          count={1000} 
          factor={4} 
          saturation={0} 
          fade 
        />

        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 15, 25]} />

        {/* Suspense boundary */}
        <Suspense fallback={null}>
          <AirQualityIcon3D />
        </Suspense>

        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />

        {/* Controls */}
        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        )}

        {/* Post-processing Effects */}
        <EffectComposer>
          <Bloom
            intensity={0.5}
            kernelSize={3}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.025}
          />
          <Vignette
            eskil={false}
            offset={0.1}
            darkness={0.5}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default CleanAirScene;