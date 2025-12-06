import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera,
  Environment
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import TextLogo3D from './ExtrudedLogo';

const LogoScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={1} 
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 30%, #000000 70%, #0f172a 100%)' }}
      >
        {/* Background */}
        <color attach="background" args={['black']} />
        
        {/* Lighting SIMPLE untuk fokus */}
        <ambientLight intensity={0.6} color="#ffffff" />
        
        {/* Main Light dari depan untuk text jelas */}
        <directionalLight
          position={[0, 0, 10]}
          intensity={1.2}
          color="#ffffff"
        />
        
        {/* Fill lights dari samping */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.5}
          color="#ffffff"
        />
        
        <directionalLight
          position={[-5, 5, 5]}
          intensity={0.5}
          color="#ffffff"
        />
        
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={50} />
        
        {/* Simple Auto-rotate */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0}
        />
        
        {/* 3D Text Logo */}
        <Suspense fallback={null}>
          <TextLogo3D />
        </Suspense>
        
        {/* Environment untuk reflections ringan */}
        <Environment 
          preset="dawn" 
          background={false}
          environmentIntensity={0.3} 
        />
        
        {/* Minimal Bloom untuk highlight */}
        <EffectComposer>
          <Bloom
            intensity={0.3} // 
            kernelSize={2}
            luminanceThreshold={0.95} // 
            luminanceSmoothing={0.05}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default LogoScene;