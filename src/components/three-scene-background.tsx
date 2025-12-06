"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeSceneBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Clouds
    const clouds: THREE.Group[] = [];
    const createCloud = () => {
        const cloud = new THREE.Group();
        const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        const mainSphere = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 16), cloudMaterial);
        cloud.add(mainSphere);

        const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), cloudMaterial);
        sphere2.position.set(-1, -0.2, 0);
        cloud.add(sphere2);

        const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 16), cloudMaterial);
        sphere3.position.set(0.8, -0.4, 0);
        cloud.add(sphere3);
        
        const sphere4 = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), cloudMaterial);
        sphere4.position.set(0.2, 0.6, 0);
        cloud.add(sphere4);

        return cloud;
    };

    const cloud1 = createCloud();
    cloud1.scale.set(1.5, 1.5, 1.5);
    cloud1.position.set(-15, 12, -10);
    scene.add(cloud1);
    clouds.push(cloud1);

    const cloud2 = createCloud();
    cloud2.scale.set(1, 1, 1);
    cloud2.position.set(0, 14, -8);
    scene.add(cloud2);
    clouds.push(cloud2);
    
    const cloud3 = createCloud();
    cloud3.scale.set(2, 2, 2);
    cloud3.position.set(15, 13, -12);
    scene.add(cloud3);
    clouds.push(cloud3);

    // Green Hills
    const hillMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.8 });
    
    const hillShape1 = new THREE.Shape();
    hillShape1.moveTo(-50, -10);
    hillShape1.bezierCurveTo(-30, 0, -20, -5, 0, -10);
    hillShape1.lineTo(50, -10);
    hillShape1.lineTo(50, -20);
    hillShape1.lineTo(-50, -20);
    const hillGeometry1 = new THREE.ShapeGeometry(hillShape1);
    const hill1 = new THREE.Mesh(hillGeometry1, hillMaterial);
    hill1.position.z = -20;
    scene.add(hill1);
    
    const hillShape2 = new THREE.Shape();
    hillShape2.moveTo(-60, -10);
    hillShape2.bezierCurveTo(-40, 5, -10, 2, 20, -10);
    hillShape2.lineTo(60, -10);
    hillShape2.lineTo(60, -20);
    hillShape2.lineTo(-60, -20);
    const hillGeometry2 = new THREE.ShapeGeometry(hillShape2);
    const hill2 = new THREE.Mesh(hillGeometry2, hillMaterial);
    hill2.position.x = 20;
    hill2.position.z = -30;
    scene.add(hill2);

    // Pipe
    const pipeMaterial = new THREE.MeshStandardMaterial({ color: 0x00dd00, roughness: 0.6 });
    const pipeBodyGeometry = new THREE.CylinderGeometry(1.5, 1.5, 4, 32);
    const pipeBody = new THREE.Mesh(pipeBodyGeometry, pipeMaterial);
    pipeBody.position.set(10, -8, -15);
    scene.add(pipeBody);
    
    const pipeRimGeometry = new THREE.CylinderGeometry(1.8, 1.8, 1, 32);
    const pipeRim = new THREE.Mesh(pipeRimGeometry, pipeMaterial);
    pipeRim.position.set(10, -5.5, -15);
    scene.add(pipeRim);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      clouds.forEach((cloud, index) => {
        cloud.position.x += 0.005 * (index + 1);
        if (cloud.position.x > 30) cloud.position.x = -30;
      });
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />;
}
