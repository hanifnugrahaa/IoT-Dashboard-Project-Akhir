import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const AirQualityIcon3D = () => {
  const groupRef = useRef();
  const particleGroupRef = useRef();
  const windRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Rotasi utama
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.3;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.05;
    }

    // Animasi partikel
    if (particleGroupRef.current) {
      particleGroupRef.current.children.forEach((particle, i) => {
        particle.rotation.x = time * 0.5 + i;
        particle.rotation.y = time * 0.3 + i;
        const scale = 0.8 + Math.sin(time * 2 + i) * 0.2;
        particle.scale.setScalar(scale);
      });
    }

    // Animasi garis angin
    if (windRef.current) {
      windRef.current.rotation.z = time * 0.2;
      windRef.current.children.forEach((line, i) => {
        line.position.x = Math.sin(time * 0.5 + i) * 0.1;
      });
    }
  });

  // Generate clean particles
  const particles = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 1.5;
    return {
      position: [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        Math.sin(i) * 0.5
      ],
      size: 0.15 + Math.sin(i) * 0.05
    };
  });

  // Wind lines
  const windLines = Array.from({ length: 6 }).map((_, i) => ({
    start: [-1.8, (i - 2.5) * 0.4, 0],
    end: [1.8, (i - 2.5) * 0.4, 0],
  }));

  return (
    <group ref={groupRef}>
      {/* Background Ring */}
      <mesh>
        <ringGeometry args={[2.2, 2.5, 64]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main Air Quality Circle */}
      <mesh>
        <circleGeometry args={[1.5, 64]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Center Wind Icon */}
      <group ref={windRef}>
        {/* Wind Lines */}
        {windLines.map((line, i) => (
          <group key={i} position={[0, 0, 0.1]}>
            <mesh>
              <boxGeometry args={[3.6, 0.02, 0.01]} />
              <meshBasicMaterial 
                color="#ffffff"
                transparent
                opacity={0.3 + i * 0.05}
              />
            </mesh>
            {/* Arrow heads */}
            <mesh position={[1.7, line.start[1], 0.1]}>
              <coneGeometry args={[0.05, 0.15, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Clean Particles */}
      <group ref={particleGroupRef}>
        {particles.map((particle, i) => (
          <mesh key={i} position={particle.position}>
            <sphereGeometry args={[particle.size, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.2}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Inner Circle with AQI Text */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh>
          <ringGeometry args={[0.8, 1.0, 32]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.3}
          />
        </mesh>
        
        {/* AQI Text Ring */}
        <Text
          position={[0, 0, 0.2]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          rotation={[0, 0, 0]}
        >
          AQI
        </Text>
      </Float>

      {/* Floating Dots around */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 2.8;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial 
              color="#ffffff"
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}

      {/* Glow Effect Lines */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const length = 0.3 + Math.sin(i * 0.5) * 0.1;
        
        return (
          <mesh key={`glow-${i}`} position={[0, 0, -0.1]}>
            <boxGeometry args={[0.02, length, 0.01]} />
            <meshBasicMaterial 
              color="#ffffff"
              transparent
              opacity={0.1}
            />
            <group rotation={[0, 0, angle]} />
          </mesh>
        );
      })}
    </group>
  );
};

export default AirQualityIcon3D;