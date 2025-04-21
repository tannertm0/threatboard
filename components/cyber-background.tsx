"use client";

import * as THREE from 'three';
import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Trail, Line, Stars, Ring } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useTheme } from 'next-themes';

export function CyberBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Default to dark mode until mounted
  const isDarkMode = mounted ? resolvedTheme === 'dark' : true;
  
  // useEffect only runs on the client, so now we can safely access theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] -z-10">
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
        <color attach="background" args={[isDarkMode ? '#000' : '#f8fafc']} />
        <StarField isDarkMode={isDarkMode} />
        <EffectComposer>
          <Bloom 
            mipmapBlur
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

function StarField({ isDarkMode }: { isDarkMode: boolean }) {
  const [starPositions, setStarPositions] = useState<THREE.Vector3[]>([]);
  const starsRef = useRef<THREE.Points>(null);
  
  // Create a custom star field to track positions
  const starGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const count = 500;
    
    for (let i = 0; i < count; i++) {
      const radius = 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push(x, y, z);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);
  
  // Store star positions for use in attack lines
  useEffect(() => {
    if (starGeometry) {
      const positions = starGeometry.attributes.position.array;
      const starPositions: THREE.Vector3[] = [];
      
      for (let i = 0; i < positions.length; i += 3) {
        starPositions.push(
          new THREE.Vector3(
            positions[i],
            positions[i + 1],
            positions[i + 2]
          )
        );
      }
      
      setStarPositions(starPositions);
    }
  }, [starGeometry]);
  
  // Star color based on theme
  const starColor = isDarkMode ? "#FFFFFF" : "#000000";
  
  return (
    <>
      <points ref={starsRef}>
        <primitive object={starGeometry} />
        <pointsMaterial size={0.1} color={starColor} />
      </points>
      <StarLines starPositions={starPositions} isDarkMode={isDarkMode} />
    </>
  );
}

function StarLines({ starPositions, isDarkMode }: { starPositions: THREE.Vector3[], isDarkMode: boolean }) {
  const [activeLines, setActiveLines] = useState<Array<{
    id: number;
    start: THREE.Vector3;
    end: THREE.Vector3;
    startTime: number;
  }>>([]);
  
  const nextLineId = useRef(0);
  const lastSpawnTime = useRef(Date.now());
  
  // Function to get a random star position from our tracked stars
  const getRandomStarPosition = () => {
    if (starPositions.length === 0) {
      // Fallback if no stars are available yet
      const radius = 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      return new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }
    
    const randomIndex = Math.floor(Math.random() * starPositions.length);
    return starPositions[randomIndex].clone();
  };
  
  // Spawn a new line every 5-10 seconds
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastSpawn = now - lastSpawnTime.current;
      
      // Only spawn if we have less than 3 active lines and stars are available
      if (activeLines.length < 3 && timeSinceLastSpawn > 5000 && starPositions.length > 0) {
        const start = getRandomStarPosition();
        const end = getRandomStarPosition();
        
        // Make sure start and end are different positions
        if (start.distanceTo(end) < 1) {
          return; // Skip if too close
        }
        
        setActiveLines(prev => [
          ...prev, 
          { 
            id: nextLineId.current++, 
            start, 
            end, 
            startTime: Date.now() 
          }
        ]);
        
        lastSpawnTime.current = Date.now();
      }
    }, 1000);
    
    return () => clearInterval(spawnInterval);
  }, [activeLines.length, starPositions.length]);
  
  // Remove lines that have completed their animation
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      // Keep animations for 16 seconds instead of 10 to allow for the pulse effect
      setActiveLines(prev => 
        prev.filter(line => now - line.startTime < 16000)
      );
    }, 1000);
    
    return () => clearInterval(cleanupInterval);
  }, []);
  
  return (
    <>
      {activeLines.map(line => (
        <StarLine 
          key={line.id} 
          start={line.start} 
          end={line.end} 
          startTime={line.startTime} 
          isDarkMode={isDarkMode}
        />
      ))}
    </>
  );
}

interface StarLineProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  startTime: number;
  isDarkMode: boolean;
}

function StarLine({ start, end, startTime, isDarkMode }: StarLineProps) {
  const ref = useRef<THREE.Group>(null);
  const particleRef = useRef<THREE.Mesh>(null);
  const [showPulse, setShowPulse] = useState(false);
  const [pulsePosition, setPulsePosition] = useState(end);
  const hasReachedEnd = useRef(false);

  // Same red color regardless of theme
  const particleColor = new THREE.Color(5, 0.2, 0.2);  // Bright red for both modes

  useFrame((state: { clock: { getElapsedTime: () => number } }) => {
    if (particleRef.current) {
      const elapsed = (Date.now() - startTime) / 1000;
      const duration = 12; // Slower movement - 12 seconds for a complete cycle
      const progress = Math.min(elapsed / duration, 1);
      
      // Smoother easing function for more natural movement
      const easedProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      // Linear interpolation between start and end
      const currentPosition = new THREE.Vector3().lerpVectors(
        start, 
        end, 
        easedProgress
      );
      
      particleRef.current.position.copy(currentPosition);

      // Check if we're near the end and haven't triggered a pulse yet
      if (progress > 0.90 && !hasReachedEnd.current) {
        setShowPulse(true);
        setPulsePosition(end.clone()); // Use exact end position
        hasReachedEnd.current = true; // Mark that we've reached the end
      } else if (progress < 0.05) {
        // Only reset when starting a new cycle
        setShowPulse(false);
        hasReachedEnd.current = false;
      }
    }
  });

  return (
    <group ref={ref}>
      <Trail
        width={3}
        length={8}
        color={particleColor}
        attenuation={(t) => t * t}
      >
        <mesh ref={particleRef}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color={particleColor} toneMapped={false} />
        </mesh>
      </Trail>
      {showPulse && (
        <PulseEffect position={pulsePosition} isDarkMode={isDarkMode} />
      )}
    </group>
  );
}

function PulseEffect({ position, isDarkMode }: { position: THREE.Vector3, isDarkMode: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const startTimeRef = useRef<number | null>(null);
  const isComplete = useRef(false);
  
  // Same pulse color regardless of theme
  const pulseColor = new THREE.Color(7, 0.3, 0.3);   // Bright red for both modes
  
  useFrame(({camera}) => {
    if (ref.current) {
      // Make ring face the camera
      ref.current.lookAt(camera.position);
      
      // Initialize start time on first render
      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now();
      }
      
      // Calculate elapsed time since the pulse started
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const duration = 1.2; // Faster animation cycle
      
      // Only animate for the duration, then stop
      if (elapsed <= duration && !isComplete.current) {
        // Adjust progress to have expansion phase and fade phase
        const progress = elapsed / duration;
        
        // Growth phase (0 to 0.5), fade phase (0.5 to 1.0)
        const growthPhase = Math.min(progress * 2, 1); // 0-0.5 maps to 0-1, >0.5 is 1
        const fadePhase = Math.max(0, (progress - 0.5) * 2); // <0.5 is 0, 0.5-1 maps to 0-1
        
        // Smooth easing for growth
        const easedGrowth = 1 - Math.pow(1 - growthPhase, 3);
        
        // Scale up to full size and then stay at full size
        const scale = 0.1 + easedGrowth * 1.2;
        
        // Start fading out as soon as we reach full size (when progress > 0.5)
        const opacity = Math.max(0, 1 - (fadePhase * fadePhase * 1.5));
        
        ref.current.scale.setScalar(scale);
        if (ref.current.material instanceof THREE.Material) {
          ref.current.material.opacity = opacity;
        }
      } else if (elapsed > duration) {
        isComplete.current = true;
      }
    }
  });

  return (
    <Ring
      ref={ref}
      position={position}
      args={[0, 0.3, 32]} // Small initial ring
      // No fixed rotation - using lookAt instead
    >
      <meshBasicMaterial
        color={pulseColor}
        transparent
        opacity={1}
        side={THREE.DoubleSide}
      />
    </Ring>
  );
}