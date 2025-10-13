'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Physics Ball Component
function PhysicsBall({ 
  mousePosition, 
  index,
  allBalls
}: { 
  position: [number, number, number]; 
  mousePosition: { x: number; y: number }; 
  index: number;
  allBalls: { current: (THREE.Mesh | null)[] };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const color = '#00ffff'; // Single cyan color for all balls
  const ballRadius = 0.3; // Doubled from 0.15 to 0.3

  useFrame((_state, delta) => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    
    // Store mesh reference
    allBalls.current[index] = mesh;
    
    // Calculate mouse distance and influence
    const mouseDistance = Math.sqrt(
      Math.pow(mousePosition.x * 4 - mesh.position.x, 2) + 
      Math.pow(mousePosition.y * 4 - mesh.position.y, 2)
    );
    
    // Forces accumulator
    const totalForce = new THREE.Vector3(0, 0, 0);
    
    // Mouse force - gentle push away from cursor
    if (mouseDistance < 2.5) {
      const mouseDirection = new THREE.Vector3(
        mesh.position.x - mousePosition.x * 4,
        mesh.position.y - mousePosition.y * 4,
        0
      ).normalize();
      
      const influence = Math.max(0, (2.5 - mouseDistance) / 2.5);
      const pushForce = mouseDirection.multiplyScalar(influence * 4); // Doubled from 2 to 4
      totalForce.add(pushForce);
    } else {
      // Moderate attraction to center when mouse is far
      const centerDirection = new THREE.Vector3(
        -mesh.position.x,
        -mesh.position.y,
        -mesh.position.z
      );
      const distanceFromCenter = centerDirection.length();
      
      if (distanceFromCenter > 0.1) {
        const attractionForce = centerDirection.normalize().multiplyScalar(distanceFromCenter * 0.4); // Doubled from 0.2 to 0.4
        totalForce.add(attractionForce);
      }
    }
    
    // Ball-to-ball collision detection and response with better physics
    allBalls.current.forEach((otherBall, otherIndex) => {
      if (!otherBall || otherIndex === index) return;
      
      const distance = mesh.position.distanceTo(otherBall.position);
      const minDistance = ballRadius * 2.2; // Larger buffer to completely prevent overlap
      
      if (distance < minDistance && distance > 0) {
        // Collision detected - push balls apart
        const collisionDirection = new THREE.Vector3()
          .subVectors(mesh.position, otherBall.position)
          .normalize();
        
        const overlap = minDistance - distance;
        // Stronger repulsion with doubled speed
        const repulsionStrength = 6; // Doubled from 3 to 6
        const repulsionForce = collisionDirection.multiplyScalar(overlap * repulsionStrength);
        totalForce.add(repulsionForce);
        
        // Immediate position correction for any overlap
        if (overlap > 0.05) {
          mesh.position.add(collisionDirection.multiplyScalar(overlap * 0.3));
        }
        
        // Add velocity damping on collision
        const relativeVelocity = velocityRef.current.clone();
        const velocityAlongCollision = relativeVelocity.dot(collisionDirection);
        
        if (velocityAlongCollision < 0) {
          // Moderate bounce
          const bounce = collisionDirection.multiplyScalar(Math.abs(velocityAlongCollision) * 0.6);
          totalForce.add(bounce);
        }
      }
    });
    
    // Apply forces to velocity - balanced speed
    velocityRef.current.add(totalForce.multiplyScalar(delta * 4));
    velocityRef.current.multiplyScalar(0.88); // Moderate damping
    
    // Limit maximum velocity to prevent overly fast movements
    const maxVelocity = 1.0;
    if (velocityRef.current.length() > maxVelocity) {
      velocityRef.current.normalize().multiplyScalar(maxVelocity);
    }
    
    // Update position - double the speed from before
    mesh.position.add(velocityRef.current.clone().multiplyScalar(delta * 4));
    
    // Gentle rotation
    mesh.rotation.x += delta * 0.3;
    mesh.rotation.y += delta * 0.2;
  });

  return (
    <Sphere ref={meshRef} args={[0.3, 32, 32]} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={1}
      />
    </Sphere>
  );
}

// Ball Pit Scene
function BallPitScene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const { camera } = useThree();
  const allBallsRef = useRef<(THREE.Mesh | null)[]>([]);
  
  useEffect(() => {
    camera.position.z = 4;
    camera.position.y = 0;
  }, [camera]);

  // Generate ball positions more spread out initially
  const balls = Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * Math.PI * 2;
    const radius = 1.5 + Math.random() * 2.5; // More spread out
    const height = (Math.random() - 0.5) * 0.5;
    
    return {
      position: [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        height
      ] as [number, number, number],
      index: i
    };
  });

  return (
    <>
      {/* Lighting setup for better depth and shadows */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.5} 
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00ffff" />
      <pointLight position={[-5, -5, 3]} intensity={0.8} color="#0099ff" />
      <pointLight position={[0, -5, -3]} intensity={0.6} color="#00ff88" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#00ffff"
        castShadow
      />
      
      {balls.map((ball) => (
        <PhysicsBall
          key={ball.index}
          position={ball.position}
          mousePosition={mousePosition}
          index={ball.index}
          allBalls={allBallsRef}
        />
      ))}
    </>
  );
}

// Main Physics Ball Pit Component
const PhysicsBallPit = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    
    const handleMouseMove = (event: MouseEvent) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        setMousePosition({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <BallPitScene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default PhysicsBallPit;
