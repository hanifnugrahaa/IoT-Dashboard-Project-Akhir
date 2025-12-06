import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Torus } from '@react-three/drei';

const GamaSenseLogo = () => {
  const groupRef = useRef();
  const innerGroupRef = useRef();

  // Animasi putar
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5; // Putar lambat
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    
    if (innerGroupRef.current) {
      innerGroupRef.current.rotation.z = state.clock.elapsedTime * 0.8; // Putar lebih cepat
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Ring */}
      <Torus
        args={[1.8, 0.1, 16, 100]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </Torus>

      {/* Middle Ring */}
      <Torus
        args={[1.3, 0.08, 16, 100]}
        rotation={[0, 0, Math.PI / 4]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </Torus>

      {/* Inner Structure */}
      <group ref={innerGroupRef}>
        {/* Center Sphere */}
        <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </Sphere>

        {/* Energy Particles */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 1;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <Sphere
              key={i}
              args={[0.15, 16, 16]}
              position={[x, y, 0]}
            >
              <meshStandardMaterial
                color={i % 2 === 0 ? "#0ea5e9" : "#8b5cf6"}
                emissive={i % 2 === 0 ? "#0ea5e9" : "#8b5cf6"}
                emissiveIntensity={0.8}
                metalness={0.9}
                roughness={0.1}
              />
            </Sphere>
          );
        })}

        {/* Sensor Rods */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          const length = 0.8;
          const x = Math.cos(angle) * length;
          const y = Math.sin(angle) * length;
          
          return (
            <Cylinder
              key={`rod-${i}`}
              args={[0.05, 0.05, 0.6]}
              position={[x * 0.7, y * 0.7, 0]}
              rotation={[0, 0, angle]}
            >
              <meshStandardMaterial
                color="#22c55e"
                emissive="#22c55e"
                emissiveIntensity={0.3}
                metalness={0.6}
                roughness={0.4}
              />
            </Cylinder>
          );
        })}
      </group>

      {/* Floating Particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 2.2 + Math.sin(i * 0.5) * 0.2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = Math.sin(i * 0.8) * 0.3;
        
        return (
          <Sphere
            key={`particle-${i}`}
            args={[0.06, 8, 8]}
            position={[x, y, z]}
          >
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.5}
              metalness={1}
              roughness={0}
            />
          </Sphere>
        );
      })}
    </group>
  );
};

export default GamaSenseLogo;