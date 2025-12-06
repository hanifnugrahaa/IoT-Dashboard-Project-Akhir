import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const TextLogo3D = () => {
  const mainGroup = useRef();
  const particlesGroup = useRef();
  const ringRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
      // // Smooth rotation
      // if (mainGroup.current) {
      //   mainGroup.current.rotation.y = 0.5;
      //   mainGroup.current.position.y = Math.sin(time * 0.5) * 0.05;
      // }

      // Rotasi ring terpisah
      if (ringRef.current) {
        ringRef.current.rotation.y = -time * 0.5;
      }
  });

  return (
    <group ref={mainGroup}>
      {/* Outer Ring - PUTIH POLOS */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[4.0, 0.1, 32, 100]} />
          <meshStandardMaterial
            color="#ffffff" // PUTIH
            metalness={0.7}
            roughness={0.2}
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Middle Ring - PUTIH POLOS */}
        <mesh rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[3.5, 0.06, 32, 100]} />
          <meshStandardMaterial
            color="#ffffff" // PUTIH
            metalness={0.6}
            roughness={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* Main Text "GAMASENSE" - WARNA KUNING & FOKUS */}
      <Float 
        speed={1} 
        rotationIntensity={0.2} 
        floatIntensity={0.3}
      >
        <Text
          position={[0, 0, 0]}
          fontSize={1} 
          color="#FFD700" 
          anchorX="center"
          anchorY="middle"
          bevelEnabled={true}
          bevelSize={0.06}
          bevelThickness={0.12}
          bevelSegments={10}
          curveSegments={32}
          depth={0.5}
          letterSpacing={0.1}
          font="/fonts/Nabla.woff"
          outlineWidth={0.005}
          outlineColor="#000000"
          material={
            new THREE.MeshPhysicalMaterial({
              color: '#FFD700',
              metalness: 0.3,
              roughness: 0.1,
              clearcoat: 1,
              clearcoatRoughness: 0,
              emissive: '#FFA500',
              emissiveIntensity: 0.2
            })
          }
        >
          GAMASENSE
        </Text>
      </Float>

      {/* Subtitle - PUTIH */}
      <Text
        position={[0, -2.0, 0]}
        fontSize={0.35}
        color="#ffffff" // PUTIH
        anchorX="center"
        anchorY="middle"
        bevelEnabled={true}
        bevelSize={0.02}
        bevelThickness={0.04}
        depth={0.2}
        font="/fonts/Rock3D.woff"
      >
        七転び八起き
      </Text>

      {/* Particle Effects - PUTIH POLOS */}
      {/* <group ref={particlesGroup}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 2.8;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <mesh key={i} position={[x, y, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color="#ffffff" // PUTIH
                emissive="#ffffff"
                emissiveIntensity={0.2}
                metalness={0.5}
                roughness={0.4}
              />
            </mesh>
          );
        })}
      </group> */}

      {/* Bottom Line - PUTIH */}
      <mesh position={[0, -2.5, 0]}>
        <boxGeometry args={[3.5, 0.02, 0.1]} />
        <meshStandardMaterial
          color="#ffffff" // PUTIH
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
};

export default TextLogo3D;