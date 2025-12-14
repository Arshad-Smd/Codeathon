
"use client";

import { useEffect, useRef, useMemo } from 'react';
import * as drei from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  const state = useMemo(() => ({
    camera: new drei.PerspectiveCamera(75, 1, 0.1, 1000),
    scene: new drei.Scene(),
    renderer: null as drei.WebGLRenderer | null,
    mixer: null as drei.AnimationMixer | null,
    actions: {
        idle: null as drei.AnimationAction | null,
        walk: null as drei.AnimationAction | null,
        jump: null as drei.AnimationAction | null,
    },
    mario: null as drei.Group | null,
    questionBlock: null as drei.Group | null,
    
    // Animation state
    currentTarget: new drei.Vector3(),
    targetRotationY: Math.PI / 2, // Start by facing right
    currentWallY: 0,
    previousWallY: 0,
    velocityY: 0,
    isJumping: false,
    isFalling: false,
    lastAction: 'idle',
    currentSectionIndex: 0,
    previousScrollY: 0,

    // DOM Elements
    elements: new Map<string, HTMLElement>(),
    timelineBricks: [] as Element[],
    isPrizeRevealed: false,
    questionBlockPlaceholder: null as HTMLElement | null,
  }), []);

  const screenToWorld = (x: number, y: number): drei.Vector3 => {
    if (!state.renderer) return new drei.Vector3();
    const vec = new drei.Vector3( (x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.5 );
    vec.unproject(state.camera);
    vec.sub(state.camera.position).normalize();
    const distance = -state.camera.position.z / vec.z;
    return state.camera.position.clone().add(vec.multiplyScalar(distance));
  }

  const switchAction = (newActionName: 'walk' | 'idle' | 'jump') => {
    if (state.lastAction === newActionName || !state.actions.idle) return;

    const newAction = state.actions[newActionName];
    const oldAction = state.actions[state.lastAction];
    
    if (oldAction) oldAction.fadeOut(0.2);
    if (newAction) newAction.reset().fadeIn(0.2).play();
    
    state.lastAction = newActionName;
  }

  const updateMarioAndBlockPositions = () => {
    const activeNode = scenePath[state.currentSectionIndex];
    if (!activeNode) return;
    const element = state.elements.get(activeNode.sectionId);
    if (!element) return;
    const rect = element.getBoundingClientRect();

    const marioFeetOffset = 0.22;
    let wallY;
    if (activeNode.isTimeline && state.timelineBricks.length > 0) {
        const firstBrick = state.timelineBricks[0];
        const blockRect = firstBrick.getBoundingClientRect();
        wallY = screenToWorld(window.innerWidth / 2, blockRect.top).y + marioFeetOffset;
    } else {
        const wallTopY = rect.bottom - 64;
        wallY = screenToWorld(window.innerWidth / 2, wallTopY).y + marioFeetOffset;
    }

    state.currentTarget.y = wallY;
    state.currentWallY = wallY;
  }

  const triggerJump = () => {
    if (!state.isJumping && !state.isFalling) {
        state.isJumping = true;
        state.velocityY = 0.25; 
        switchAction('jump');
        state.actions.jump?.getMixer().addEventListener('finished', onJumpFinished);
    }
  }

  const onJumpFinished = () => {
    state.actions.jump?.getMixer().removeEventListener('finished', onJumpFinished);
    switchAction('idle');
  }

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;
    
    // Set initial scroll position
    state.previousScrollY = window.scrollY;

    // Initialize renderer
    state.renderer = new drei.WebGLRenderer({ antialias: true, alpha: true });
    state.renderer.outputColorSpace = drei.SRGBColorSpace;
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
        }
    });
    state.questionBlockPlaceholder = document.getElementById('question-block-placeholder');


    const loader = new GLTFLoader();
    
    // Load Mario Model
    loader.load('/mario.glb', (gltf) => {
        state.mario = gltf.scene;
        state.mario.scale.set(0.04, 0.04, 0.04);
        state.mario.rotation.y = Math.PI / 2; // Initial direction
        state.scene.add(state.mario);

        state.mixer = new drei.AnimationMixer(state.mario);
        state.actions.idle = state.mixer.clipAction(gltf.animations[0]);
        state.actions.walk = state.mixer.clipAction(gltf.animations[2]);
        state.actions.jump = state.mixer.clipAction(gltf.animations[1]);
        state.actions.jump!.loop = drei.LoopOnce;
        state.actions.jump!.clampWhenFinished = true;
        
        state.actions.idle.play();
        state.lastAction = 'idle';

        setTimeout(() => handleScroll(), 100);
    });

    // Load Question Block Model
    loader.load('/questionblock.glb', (gltf) => {
        state.questionBlock = gltf.scene;
        state.questionBlock.scale.set(0.001, 0.001, 0.001);
        state.scene.add(state.questionBlock);
    });

    const handleScroll = () => {
        if (state.isJumping) return;
        
        const scrollDirection = window.scrollY > state.previousScrollY ? 'down' : 'up';
        state.previousScrollY = window.scrollY;

        let activeNodeIndex = state.currentSectionIndex;
        let minDistance = Infinity;

        for (let i = 0; i < scenePath.length; i++) {
            const node = scenePath[i];
            const element = state.elements.get(node.sectionId);
            if (!element) continue;

            const rect = element.getBoundingClientRect();
            // Check if section is in the viewport
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                 const distanceToCenter = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
                 if (distanceToCenter < minDistance) {
                    minDistance = distanceToCenter;
                    activeNodeIndex = i;
                }
            }
        }
        // Ensure the first section is active when scrolled to the top
        if (state.elements.get(scenePath[0].sectionId)!.getBoundingClientRect().top >= 0) {
            activeNodeIndex = 0;
        }

        const activeNode = scenePath[activeNodeIndex];
        const element = state.elements.get(activeNode.sectionId);
        if (!element) return;
        
        const rect = element.getBoundingClientRect();

        if (activeNodeIndex !== state.currentSectionIndex) {
            state.isFalling = true;
            state.velocityY = 0;
            state.previousWallY = state.currentWallY;
            state.currentSectionIndex = activeNodeIndex;
        }

        const baseRotation = activeNode.walkDirection === 'left' ? -Math.PI / 2 : Math.PI / 2;
        const newTargetRotationY = scrollDirection === 'down' ? baseRotation : -baseRotation;
        if (state.targetRotationY !== newTargetRotationY) state.targetRotationY = newTargetRotationY;

        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = element.offsetHeight;
        const viewportHeight = window.innerHeight;
        // Total scrollable distance for the section to be fully visible and then scrolled past
        const totalScrollForSection = sectionHeight + viewportHeight;
        // How far we've scrolled into the section's total scrollable area
        const currentScrollInSection = window.scrollY - (sectionTop - viewportHeight);
        let sectionProgress = currentScrollInSection / totalScrollForSection;
        
        const clampedProgress = Math.max(0, Math.min(1, sectionProgress));
        
        const leftEdge = screenToWorld(0, 0);
        const rightEdge = screenToWorld(window.innerWidth, 0);
        
        const buffer = 0.2;
        const startX = leftEdge.x + buffer;
        const endX = rightEdge.x - buffer;
        
        let targetX;
        
        if (window.scrollY < 10) {
            targetX = startX;
        } else {
             targetX = activeNode.walkDirection === 'left' 
                ? endX - ((endX - startX) * clampedProgress)
                : startX + ((endX - startX) * clampedProgress);
        }

        state.currentTarget.x = targetX;
        updateMarioAndBlockPositions();
    };
    
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === 'ArrowUp') {
            event.preventDefault();
            triggerJump();
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mario-jump', triggerJump);

    const clock = new drei.Clock();
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (state.mixer) state.mixer.update(delta);
      
      updateMarioAndBlockPositions();

      if (state.mario) {
        
        const distanceToTargetX = Math.abs(state.mario.position.x - state.currentTarget.x);

        // Only update X position if NOT jumping
        if (!state.isJumping) {
            if (distanceToTargetX > 0.01) {
                switchAction('walk');
                state.mario.position.x += (state.currentTarget.x - state.mario.position.x) * 0.1;
            } else {
                switchAction('idle');
                state.mario.position.x = state.currentTarget.x;
            }
        }
        
        state.mario.rotation.y += (state.targetRotationY - state.mario.rotation.y) * 0.1;

        const isActivelyFalling = state.isJumping || state.isFalling;

        if (isActivelyFalling) {
            state.velocityY -= 0.015; // Gravity
            state.mario.position.y += state.velocityY;

            // Collision with question block
            if (state.questionBlock && state.questionBlock.visible && !state.isPrizeRevealed) {
                const distanceX = Math.abs(state.mario.position.x - state.questionBlock.position.x);
                const distanceY = Math.abs(state.mario.position.y - state.questionBlock.position.y);

                if (distanceX < 1 && distanceY < 1 && state.velocityY > 0) {
                     state.isPrizeRevealed = true;
                     state.questionBlock.position.y += 0.1; // Bump animation
                     setTimeout(() => {
                        window.dispatchEvent(new CustomEvent("prize-reveal"));
                     }, 100);
                }
            }
            
            if (state.mario.position.y <= state.currentWallY) {
                state.mario.position.y = state.currentWallY;
                state.isJumping = false;
                state.isFalling = false;
                state.velocityY = 0;
                if(state.lastAction === 'jump') switchAction('idle');
            }
        } else {
            state.mario.position.y = state.currentWallY;
        }
      }

      if (state.questionBlock) {
          if (state.questionBlockPlaceholder && !state.isPrizeRevealed) {
              const rect = state.questionBlockPlaceholder.getBoundingClientRect();
              if (rect.top < window.innerHeight && rect.bottom > 0) {
                  const worldPos = screenToWorld(rect.left + rect.width / 2, rect.top + rect.height / 2);
                  state.questionBlock.position.x = worldPos.x;
                  state.questionBlock.position.y = worldPos.y;
                  state.questionBlock.position.z = 0;
                  state.questionBlock.rotation.y += 0.01;
                  state.questionBlock.visible = true;
              } else {
                  state.questionBlock.visible = false;
              }
          } else {
              state.questionBlock.visible = false;
          }
      }
      
      if(state.renderer) state.renderer.render(state.scene, state.camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount || !state.renderer) return;
      state.camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      state.camera.updateProjectionMatrix();
      state.renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      handleScroll();
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mario-jump', triggerJump);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (currentMount && state.renderer?.domElement.parentNode === currentMount) {
        currentMount.removeChild(state.renderer.domElement);
      }
      state.renderer?.dispose();
    };
  }, [isMobile]);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-30 pointer-events-none" />;
}
