import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDHeroCanvasProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const ThreeDHeroCanvas: React.FC<ThreeDHeroCanvasProps> = ({
  className = '',
  theme = 'light',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer
    const width = mount.clientWidth || 400;
    const height = mount.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group for mouse interaction
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Centerpiece: Wireframe Icosahedron (Light Blue & Red)
    const icoGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8, // Light Blue
      wireframe: true,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    mainGroup.add(icoMesh);

    // 2. Inner floating core (Vibrant Red)
    const coreGeometry = new THREE.OctahedronGeometry(1.1, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Red
      emissive: 0xdc2626,
      emissiveIntensity: 0.5,
      roughness: 0.3,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // 3. Orbital Ring (Light Green)
    const torusGeometry = new THREE.TorusGeometry(3.1, 0.05, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x4ade80, // Light Green
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.rotation.x = Math.PI / 3;
    mainGroup.add(torusMesh);

    // 4. Secondary Ring (Light Blue)
    const torus2Geometry = new THREE.TorusGeometry(3.3, 0.04, 16, 100);
    const torus2Material = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Light Blue
      transparent: true,
      opacity: 0.6,
    });
    const torus2Mesh = new THREE.Mesh(torus2Geometry, torus2Material);
    torus2Mesh.rotation.y = Math.PI / 4;
    mainGroup.add(torus2Mesh);

    // 5. 3-Color Particle Constellation (Red, Light Blue, Light Green)
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cRed = new THREE.Color(0xef4444);
    const cBlue = new THREE.Color(0x38bdf8);
    const cGreen = new THREE.Color(0x4ade80);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.6 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const colorChoice = i % 3 === 0 ? cRed : i % 3 === 1 ? cBlue : cGreen;
      colors[i * 3] = colorChoice.r;
      colors[i * 3 + 1] = colorChoice.g;
      colors[i * 3 + 2] = colorChoice.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLightRed = new THREE.PointLight(0xef4444, 2, 20);
    pointLightRed.position.set(4, 3, 4);
    scene.add(pointLightRed);

    const pointLightBlue = new THREE.PointLight(0x38bdf8, 2, 20);
    pointLightBlue.position.set(-4, -3, 4);
    scene.add(pointLightBlue);

    // Mouse tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationY = normX * 0.8;
      targetRotationX = normY * 0.5;
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Resize handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle 3D rotations
      icoMesh.rotation.x = elapsedTime * 0.25;
      icoMesh.rotation.y = elapsedTime * 0.35;

      coreMesh.rotation.x = -elapsedTime * 0.4;
      coreMesh.rotation.z = elapsedTime * 0.3;

      torusMesh.rotation.z = elapsedTime * 0.2;
      torus2Mesh.rotation.x = -elapsedTime * 0.25;

      particleSystem.rotation.y = elapsedTime * 0.12;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;

      // Smooth damping toward mouse target
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      torus2Geometry.dispose();
      torus2Material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full pointer-events-none ${className}`}
      style={{ minHeight: '320px' }}
    />
  );
};
