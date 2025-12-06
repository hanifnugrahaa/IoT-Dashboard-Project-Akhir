// 3DLogo.jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

function RotatingLogo() {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5; // Rotasi slow
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        {/* Box Logo */}
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial
          color="#0ea5e9"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0}
          transmission={0.5}
          opacity={0.8}
          transparent
        />
        
        {/* Text inside */}
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.1}
          position={[-0.9, 0, 1.1]}
        >
          GAMA
          <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </Text3D>
      </mesh>
    </Float>
  );
}

// Di Loading Screen:
<Canvas
  style={{ background: '#000000' }}
  camera={{ position: [0, 0, 5], fov: 50 }}
>
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} intensity={1} />
  <RotatingLogo />
  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
</Canvas>