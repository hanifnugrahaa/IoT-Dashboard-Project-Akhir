import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const SVGLogo3D = () => {
  const groupRef = useRef();
  const particlesRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.3;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.05;
    }

    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y = Math.sin(time * 2 + i) * 0.1;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Ring */}
      <mesh>
        <torusGeometry args={[1.8, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Middle Ring */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.4, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Logo Text in 3D */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.2}>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.05}
        >
          Gama
        </Text>
        
        <Text
          position={[0, -0.9, 0.1]}
          fontSize={0.6}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.05}
        >
          Sense
        </Text>
      </Float>

      {/* Air Quality Icon */}
      <group>
        {/* Wind symbol */}
        <mesh position={[0, 0.4, 0.2]}>
          <coneGeometry args={[0.1, 0.3, 8]} rotation={[Math.PI, 0, 0]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>

        {/* Circular particles */}
        <group ref={particlesRef}>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 1;
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
              >
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.4}
                />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* Bottom line */}
      <mesh position={[0, -1.3, 0]}>
        <boxGeometry args={[2.5, 0.02, 0.1]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

export default SVGLogo3D;