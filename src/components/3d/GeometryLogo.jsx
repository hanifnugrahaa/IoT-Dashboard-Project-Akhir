import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GeometryLogo = () => {
  const mainGroup = useRef();
  const innerRing = useRef();
  const particles = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Main rotation
    if (mainGroup.current) {
      mainGroup.current.rotation.y = time * 0.15;
      mainGroup.current.rotation.x = Math.sin(time * 0.2) * 0.05;
    }
    
    // Inner ring animation
    if (innerRing.current) {
      innerRing.current.rotation.z = time * 0.3;
      innerRing.current.scale.x = 1 + Math.sin(time * 2) * 0.02;
      innerRing.current.scale.y = 1 + Math.sin(time * 2) * 0.02;
    }
    
    // Particles animation
    if (particles.current) {
      particles.current.children.forEach((particle, i) => {
        const speed = 0.5 + (i % 3) * 0.2;
        particle.position.y = Math.sin(time * speed + i) * 0.2;
        particle.rotation.x = time * 0.5 + i;
        particle.rotation.y = time * 0.3 + i;
      });
    }
  });

  return (
    <group ref={mainGroup}>
      {/* Outer Ring with Glow */}
      <mesh>
        <torusGeometry args={[2.2, 0.08, 32, 100]} />
        <MeshWobbleMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.1}
          emissive="#4fc3f7"
          emissiveIntensity={0.3}
          factor={0.2}
          speed={0.5}
        />
      </mesh>

      {/* Middle Ring */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.7, 0.06, 32, 100]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.2}
          transmission={0.2}
          thickness={1}
          emissive="#9575cd"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Inner Ring - Animated */}
      <mesh ref={innerRing}>
        <torusGeometry args={[1.2, 0.04, 24, 100]} />
        <MeshDistortMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.3}
          distort={0.3}
          speed={1}
          emissive="#ffffff"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Center Sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.8, 2]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.95}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0}
            emissive="#4fc3f7"
            emissiveIntensity={0.2}
            transmission={0.5}
            thickness={2}
          />
        </mesh>
      </Float>

      {/* Floating Particles */}
      <group ref={particles}>
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const radius = 2.5;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <mesh key={i} position={[x, y, 0]}>
              <dodecahedronGeometry args={[0.1, 0]} />
              <meshPhysicalMaterial
                color={i % 2 === 0 ? "#4fc3f7" : "#9575cd"}
                metalness={1}
                roughness={0}
                transmission={0.8}
                thickness={1}
                emissive={i % 2 === 0 ? "#4fc3f7" : "#9575cd"}
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })}
      </group>

      {/* Text Elements */}
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
      >
        GamaSense
      </Text>

      <Text
        position={[0, -2.8, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
      >
        Air Quality Monitoring
      </Text>

      {/* Beam Lights */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[0, 0, -1]} rotation={[0, angle, 0]}>
            <cylinderGeometry args={[0.02, 0.1, 3]} />
            <meshBasicMaterial
              color="#4fc3f7"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default GeometryLogo;