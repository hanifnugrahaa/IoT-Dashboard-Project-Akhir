import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader, extend } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Float, Text, MeshReflectorMaterial, MeshRefractionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Extend untuk custom material jika perlu
extend({ MeshReflectorMaterial, MeshRefractionMaterial });

const RealisticLogo = ({ logoPath = '/logos/gamasense-logo.png' }) => {
  const mainGroup = useRef();
  const logoMesh = useRef();
  const particlesGroup = useRef();
  const lightRef = useRef();
  
  const [texture, setTexture] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Load texture dengan mipmaps
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(logoPath, (tex) => {
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      setTexture(tex);
    });
  }, [logoPath]);

  // Mouse tracking untuk parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Smooth rotation dengan easing
    if (mainGroup.current) {
      // Auto rotation
      mainGroup.current.rotation.y = time * 0.2;
      
      // Subtle floating
      mainGroup.current.position.y = Math.sin(time * 0.5) * 0.05;
      
      // Parallax effect dari mouse
      mainGroup.current.rotation.x = mousePosition.y * 0.1;
      mainGroup.current.rotation.z = -mousePosition.x * 0.1;
    }

    // Animate logo mesh
    if (logoMesh.current) {
      // Pulsing scale
      const scale = 1 + Math.sin(time * 1.2) * 0.01;
      logoMesh.current.scale.setScalar(scale);
      
      // Material animation
      if (logoMesh.current.material) {
        logoMesh.current.material.emissiveIntensity = 0.2 + Math.sin(time * 2) * 0.05;
      }
    }

    // Animate particles
    if (particlesGroup.current) {
      particlesGroup.current.children.forEach((particle, i) => {
        const angle = time * 0.5 + i;
        const radius = 1.8 + Math.sin(time * 0.3 + i) * 0.2;
        particle.position.x = Math.cos(angle) * radius;
        particle.position.y = Math.sin(angle) * radius;
        particle.position.z = Math.sin(time * 0.8 + i) * 0.3;
        
        // Rotate particles
        particle.rotation.x = time * 0.5 + i;
        particle.rotation.y = time * 0.3 + i;
      });
    }

    // Animate light
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(time * 0.7) * 3;
      lightRef.current.position.y = Math.cos(time * 0.5) * 2;
    }
  });

  if (!texture) return null;

  // Generate particles data
  const particles = Array.from({ length: 24 }).map((_, i) => ({
    size: 0.03 + Math.random() * 0.02,
    speed: 0.5 + Math.random() * 0.5,
  }));

  return (
    <group ref={mainGroup}>
      {/* Environment Reflections */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[10, 10]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={50}
          depthScale={1}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          color="#202020"
          metalness={0.8}
          roughness={0.2}
          mirror={0.5}
        />
      </mesh>

      {/* Main Logo with Depth */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <group>
          {/* Back Layer - Glow */}
          <mesh position={[0, 0, -0.8]}>
            <circleGeometry args={[1.7, 64]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Middle Layer - Depth */}
          <mesh position={[0, 0, -0.4]}>
            <planeGeometry args={[2.5, 2.5, 32, 32]} />
            <meshPhysicalMaterial
              map={texture}
              transparent
              alphaTest={0.1}
              transmission={0.2} // Glass-like effect
              thickness={0.5}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.1}
              envMapIntensity={1}
              emissive="#ffffff"
              emissiveIntensity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Front Layer - Main Logo */}
          <mesh ref={logoMesh} position={[0, 0, 0]}>
            <planeGeometry args={[2, 2, 32, 32]} />
            <meshPhysicalMaterial
              map={texture}
              transparent
              alphaTest={0.05}
              roughness={0.05}
              metalness={0.9}
              clearcoat={1}
              clearcoatRoughness={0}
              emissive="#ffffff"
              emissiveIntensity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Edge Bevel */}
          <mesh position={[0, 0, 0.1]}>
            <ringGeometry args={[1.01, 1.05, 32]} />
            <meshPhysicalMaterial
              color="#ffffff"
              metalness={1}
              roughness={0.1}
              emissive="#ffffff"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      </Float>

      {/* Animated Light Source */}
      <pointLight
        ref={lightRef}
        position={[3, 3, 3]}
        intensity={1}
        color="#4fc3f7"
        distance={10}
        decay={2}
      />
      
      <pointLight
        position={[-3, -3, 3]}
        intensity={0.5}
        color="#9575cd"
        distance={10}
        decay={2}
      />

      {/* Floating Particles */}
      <group ref={particlesGroup}>
        {particles.map((particle, i) => (
          <mesh key={i}>
            <sphereGeometry args={[particle.size, 16, 16]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={0.8}
              thickness={0.5}
              roughness={0}
              metalness={1}
              emissive="#4fc3f7"
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Lens Flare Effect */}
      <mesh position={[0, 0, 1]}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default RealisticLogo;