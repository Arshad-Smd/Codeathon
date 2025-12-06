"use client";

import { useEffect, useRef, useMemo } from 'react';
import * as drei from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ScenePathNode {
  sectionId: string;
  walkDirection: 'left' | 'right';
  isTimeline?: boolean;
}

const scenePath: ScenePathNode[] = [
  { sectionId: 'hero', walkDirection: 'right' },
  { sectionId: 'about', walkDirection: 'left' },
  { sectionId: 'timeline', walkDirection: 'right', isTimeline: true },
  { sectionId: 'prizes', walkDirection: 'left' },
  { sectionId: 'challenges', walkDirection: 'right' },
  { sectionId: 'sponsors', walkDirection: 'left'},
];

export function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const state = useMemo(() => ({
    camera: new drei.PerspectiveCamera(75, 1, 0.1, 1000),
    scene: new drei.Scene(),
    renderer: null as drei.WebGLRenderer | null,
    mixer: null as drei.AnimationMixer | null,
    actions: {
        idle: null as drei.AnimationAction | null,
        walk: null as drei.AnimationAction | null,
    },
    mario: null as drei.Group | null,
    
    // Animation state
    currentTarget: new drei.Vector3(),
    targetRotationY: Math.PI / 2, // Start by facing right
    currentWallY: 0,
    previousWallY: 0,
    velocityY: 0,
    isFalling: false,
    lastAction: 'idle',
    currentSectionIndex: 0,
    previousScrollY: 0,


    // DOM Elements
    elements: new Map<string, HTMLElement>(),
    timelineBricks: [] as Element[],
  }), []);


  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;
    
    // Set initial scroll position
    state.previousScrollY = window.scrollY;

    // Initialize renderer
    state.renderer = new drei.WebGLRenderer({ antialias: true, alpha: true });
    state.renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    state.renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(state.renderer.domElement);
    
    // Lights
    state.scene.add(new drei.AmbientLight(0xffffff, 2.5));
    const directionalLight = new drei.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(5, 10, 7);
    state.scene.add(directionalLight);

    // Initial camera position
    state.camera.position.z = 5;

    // Cache DOM elements
    scenePath.forEach(node => {
        const el = document.getElementById(node.sectionId);
        if (el) {
            state.elements.set(node.sectionId, el);
            
            // Cache timeline brick blocks
            if (node.isTimeline) {
                const bricks = el.querySelectorAll('.timeline-brick');
                state.timelineBricks = Array.from(bricks);
            }
        }
    });

    // Load Model and Animations
    const loader = new GLTFLoader();
    loader.load('/mario.glb', (gltf) => {
        state.mario = gltf.scene;
        state.mario.scale.set(0.04, 0.04, 0.04);
        state.mario.rotation.y = Math.PI / 2; // Initial direction (facing right)
        state.scene.add(state.mario);

        state.mixer = new drei.AnimationMixer(state.mario);
        state.actions.idle = state.mixer.clipAction(gltf.animations[0]);
        state.actions.walk = state.mixer.clipAction(gltf.animations[2]);
        
        state.actions.idle.play();
        state.lastAction = 'idle';

        // Set initial position with a small delay to ensure DOM is ready
        setTimeout(() => {
            handleScroll();
        }, 100);
    }, undefined, (error) => {
        console.error('An error happened loading the model:', error);
    });

    // Convert screen coordinates to world coordinates
    const screenToWorld = (x: number, y: number): drei.Vector3 => {
        const vec = new drei.Vector3(
            (x / window.innerWidth) * 3 - 1.5,
            -(y / window.innerHeight) * 2 + 1,
            0
        );
        vec.unproject(state.camera);
        const dir = vec.sub(state.camera.position).normalize();
        const distance = -state.camera.position.z / dir.z;
        const pos = state.camera.position.clone().add(dir.multiplyScalar(distance));
        return pos;
    }

    const switchAction = (newActionName: 'walk' | 'idle') => {
        if (state.lastAction === newActionName) return;

        const newAction = state.actions[newActionName];
        const oldAction = state.actions[state.lastAction];
        
        if (oldAction) oldAction.fadeOut(0.2);
        if (newAction) {
            newAction.reset().fadeIn(0.2).play();
        }
        
        state.lastAction = newActionName;
    }

    const handleScroll = () => {
        // Clear any existing timeout
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }
        
        switchAction('walk');

        // Set a new timeout
        scrollTimeout.current = setTimeout(() => {
            switchAction('idle');
        }, 150); // Idle after 150ms of no scrolling


        const scrollDirection = window.scrollY > state.previousScrollY ? 'down' : 'up';
        state.previousScrollY = window.scrollY;

        let activeNodeIndex = state.currentSectionIndex;
        
        // Find the section that is most visible in viewport
        let minDistance = Infinity;
        for (let i = 0; i < scenePath.length; i++) {
            const node = scenePath[i];
            const element = state.elements.get(node.sectionId);
            if (!element) continue;

            const rect = element.getBoundingClientRect();
            // Check if element is within the viewport
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                 const distanceToCenter = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
                 if (distanceToCenter < minDistance) {
                    minDistance = distanceToCenter;
                    activeNodeIndex = i;
                }
            }
        }
        if (state.elements.get(scenePath[0].sectionId)!.getBoundingClientRect().top > 0) {
            activeNodeIndex = 0;
        }

        
        const activeNode = scenePath[activeNodeIndex];
        const element = state.elements.get(activeNode.sectionId);
        if (!element) return;
        
        const rect = element.getBoundingClientRect();

        // Detect section transitions for falling animation AND direction change
        if (activeNodeIndex !== state.currentSectionIndex) {
            state.isFalling = true;
            state.velocityY = 0;
            state.previousWallY = state.currentWallY;
            state.currentSectionIndex = activeNodeIndex;
        }

        // Set the target rotation based on scroll direction and section config
        const baseRotation = activeNode.walkDirection === 'left' ? -Math.PI / 2 : Math.PI / 2;
        const newTargetRotationY = scrollDirection === 'down' ? baseRotation : -baseRotation;
        if (state.targetRotationY !== newTargetRotationY) {
            state.targetRotationY = newTargetRotationY;
        }

        // Calculate scroll progress within the section
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = element.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // The total scroll distance for this section is its own height plus the viewport height
        const totalScrollForSection = sectionHeight + viewportHeight;
        // The current scroll position relative to the start of this section's visibility
        const currentScrollInSection = window.scrollY - (sectionTop - viewportHeight);
        
        let sectionProgress = currentScrollInSection / totalScrollForSection;

        const clampedProgress = Math.max(0, Math.min(1, sectionProgress));

        // Calculate the world space width at z=0
        const leftEdge = screenToWorld(0, 0);
        const rightEdge = screenToWorld(window.innerWidth, 0);
        
        const startX = leftEdge.x;
        const endX = rightEdge.x;
        
        let targetX;
        if (activeNode.walkDirection === 'left') {
            // Walk from right to left
            targetX = endX - ((endX - startX) * clampedProgress);
        } else {
            // Walk from left to right
            targetX = startX + ((endX - startX) * clampedProgress);
        }

        // --- FIX FOR HERO SECTION START POSITION ---
        // If we are on the first section and haven't scrolled, force Mario to the start.
        if (activeNodeIndex === 0 && window.scrollY === 0) {
            targetX = activeNode.walkDirection === 'left' ? endX : startX;
        }


        // Calculate Y position (the wall position)
        let wallY;
        const marioFeetOffset = 0.22; // Fine-tuned offset
        
        if (activeNode.isTimeline && state.timelineBricks.length > 0) {
            // Re-query for timeline bricks in case they change
            const currentBricks = element.querySelectorAll('.timeline-brick');
            if (currentBricks.length > 0) {
                const firstBrick = currentBricks[0];
                const blockRect = firstBrick.getBoundingClientRect();
                const blockTopY = blockRect.top;
                wallY = screenToWorld(window.innerWidth / 2, blockTopY).y + marioFeetOffset;
            } else {
                 const wallTopY = rect.bottom - 64; 
                 wallY = screenToWorld(window.innerWidth / 2, wallTopY).y + marioFeetOffset;
            }
        } else if (activeNode.sectionId === 'contact') {
            // Make Mario "disappear" by moving him way off-screen for contact section
            wallY = -100;
        } else {
            // Regular sections - walk on bottom wall (64px = h-16)
            const wallTopY = rect.bottom - 64;
            wallY = screenToWorld(window.innerWidth / 2, wallTopY).y + marioFeetOffset;
        }

        // Update the current wall Y position
        state.currentWallY = wallY;
        
        // Set target X, Y will be handled by falling/sticking logic
        state.currentTarget.set(targetX, wallY, 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop
    const clock = new drei.Clock();
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (state.mixer) {
        state.mixer.update(delta);
      }

      if (state.mario) {
        // Only update position if walking, to prevent sliding while idle
        if (state.lastAction === 'walk') {
            state.mario.position.x += (state.currentTarget.x - state.mario.position.x) * 0.05;
        }
        
        // Smooth rotation
        state.mario.rotation.y += (state.targetRotationY - state.mario.rotation.y) * 0.08;

        // Handle Y position (wall sticking vs falling)
        if (state.isFalling) {
            // Apply gravity
            state.velocityY -= 0.015;
            state.mario.position.y += state.velocityY;

            // Check if Mario has landed on or passed the new wall
            if (state.mario.position.y <= state.currentWallY) {
                state.mario.position.y = state.currentWallY;
                state.isFalling = false;
                state.velocityY = 0;
            }
        } else {
            // Mario is on the wall - stick firmly to it
            state.mario.position.y = state.currentWallY;
        }
      }
      
      if(state.renderer) {
        state.renderer.render(state.scene, state.camera);
      }
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount || !state.renderer) return;
      state.camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      state.camera.updateProjectionMatrix();
      state.renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      handleScroll();
    };
    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (currentMount && state.renderer?.domElement.parentNode === currentMount) {
        currentMount.removeChild(state.renderer.domElement);
      }
      state.renderer?.dispose();
    };
  }, [state]);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-30 pointer-events-none" />;
}
