'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface Ball {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  ref: React.RefObject<THREE.Mesh>;
  color: string;
  size: number;
}

function PhysicsBalls({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const ball1Ref = useRef<THREE.Mesh>(null);
  const ball2Ref = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  const balls = useRef<Ball[]>([
    {
      position: new THREE.Vector3(-2, 1, 0),
      velocity: new THREE.Vector3(0.02, 0.015, 0),
      ref: ball1Ref,
      color: '#00ffff',
      size: 0.4,
    },
    {
      position: new THREE.Vector3(2, -1, 0),
      velocity: new THREE.Vector3(-0.018, 0.02, 0),
      ref: ball2Ref,
      color: '#0080ff',
      size: 0.35,
    },
  ]);

  const mouseRef = useRef({ x: 0, y: 0, radius: 0.5 });

  useEffect(() => {
    mouseRef.current = { ...mousePosition, radius: 0.5 };
  }, [mousePosition]);

  useFrame(() => {
    // Dynamic bounds based on viewport
    const boundsX = viewport.width / 2 - 0.5;
    const boundsY = viewport.height / 2 - 0.5;

    balls.current.forEach((ball) => {
      if (!ball.ref.current) return;

      // Update position
      ball.position.add(ball.velocity);

      // Boundary collisions with dynamic bounds
      if (Math.abs(ball.position.x) > boundsX) {
        ball.velocity.x *= -0.95; // Slight energy loss
        ball.position.x = Math.sign(ball.position.x) * boundsX;
      }
      if (Math.abs(ball.position.y) > boundsY) {
        ball.velocity.y *= -0.95;
        ball.position.y = Math.sign(ball.position.y) * boundsY;
      }

      // Mouse interaction - scaled to viewport
      const mouseX = mousePosition.x * (viewport.width / 2);
      const mouseY = mousePosition.y * (viewport.height / 2);
      const dx = ball.position.x - mouseX;
      const dy = ball.position.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouseRef.current.radius + ball.size) {
        const angle = Math.atan2(dy, dx);
        const force = 0.05;
        ball.velocity.x += Math.cos(angle) * force;
        ball.velocity.y += Math.sin(angle) * force;
        
        // Limit velocity
        const speed = Math.sqrt(ball.velocity.x ** 2 + ball.velocity.y ** 2);
        const maxSpeed = 0.08;
        if (speed > maxSpeed) {
          ball.velocity.multiplyScalar(maxSpeed / speed);
        }
      }

      // Apply friction
      ball.velocity.multiplyScalar(0.998);

      // Update mesh position
      ball.ref.current.position.copy(ball.position);
    });

    // Ball-to-ball collisions
    const [ball1, ball2] = balls.current;
    if (ball1.ref.current && ball2.ref.current) {
      const dx = ball2.position.x - ball1.position.x;
      const dy = ball2.position.y - ball1.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDist = ball1.size + ball2.size;

      if (distance < minDist) {
        // Collision detected
        const angle = Math.atan2(dy, dx);
        const targetX = ball1.position.x + Math.cos(angle) * minDist;
        const targetY = ball1.position.y + Math.sin(angle) * minDist;
        
        const ax = (targetX - ball2.position.x) * 0.1;
        const ay = (targetY - ball2.position.y) * 0.1;
        
        ball1.velocity.x -= ax;
        ball1.velocity.y -= ay;
        ball2.velocity.x += ax;
        ball2.velocity.y += ay;
      }
    }
  });

  return (
    <>
      {/* Lighting setup matching PhysicsBallPit */}
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
        color="#ffffff"
        castShadow
      />
      
      {balls.current.map((ball, index) => (
        <Sphere
          key={index}
          ref={ball.ref}
          args={[ball.size, 32, 32]}
          position={[ball.position.x, ball.position.y, ball.position.z]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={ball.color}
            emissive={ball.color}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.8}
          />
        </Sphere>
      ))}
    </>
  );
}

const BouncingBalls = () => {
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
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent', pointerEvents: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        shadows
      >
        <PhysicsBalls mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default BouncingBalls;
