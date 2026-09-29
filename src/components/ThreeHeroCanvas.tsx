import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Verificar se o usuário prefere movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Configuração de cena, câmera e renderizador WebGL
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x071829, 0.0018);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
    camera.position.z = 700;
    camera.position.y = 120;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: 'high-performance' 
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x071829, 0); // Fundo transparente para mesclar com o CSS
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL not supported, falling back to clean CSS ambient glow', err);
      return;
    }

    // Criação da Manta de Partículas de Ouro (Organic Golden Wave Matrix)
    const SEPARATION = 45;
    const AMOUNTX = 40;
    const AMOUNTY = 32;
    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);
    const colors = new Float32Array(numParticles * 3);

    // Paleta de Ouro Nobre: #C5A880, #D4AF37, #E2CDA9
    const goldColor1 = new THREE.Color(0xc5a880);
    const goldColor2 = new THREE.Color(0xf2e3c6);
    const goldColor3 = new THREE.Color(0x8a6828);

    let i = 0, j = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        // Posição x, y, z
        positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        positions[i + 1] = 0; // Calculado no loop de animação
        positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2 - 100;

        // Escala e variação de tom
        scales[j] = (Math.sin(ix * 0.2) + Math.cos(iy * 0.2) + 2) * 1.4;

        const mixedColor = goldColor1.clone().lerp(
          (ix + iy) % 2 === 0 ? goldColor2 : goldColor3,
          Math.sin(ix * 0.3) * 0.5 + 0.5
        );

        colors[i] = mixedColor.r;
        colors[i + 1] = mixedColor.g;
        colors[i + 2] = mixedColor.b;

        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // ShaderMaterial para partículas circulares suaves com brilho dourado
    const vertexShader = `
      attribute float scale;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = scale * (280.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        float r = distance(gl_PointCoord, vec2(0.5, 0.5));
        if (r > 0.5) discard;
        float alpha = smoothstep(0.5, 0.05, r) * 0.65;
        gl_FragColor = vec4(vColor, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Linhas Sutis Orgânicas conectando pontos principais (Efeito rede de segurança jurídica)
    const lineCount = 18;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineCount * 6);
    for (let l = 0; l < lineCount * 6; l += 6) {
      const idx1 = Math.floor(Math.random() * numParticles) * 3;
      const idx2 = Math.floor(Math.random() * numParticles) * 3;
      linePositions[l] = positions[idx1];
      linePositions[l + 1] = positions[idx1 + 1];
      linePositions[l + 2] = positions[idx1 + 2];
      linePositions[l + 3] = positions[idx2];
      linePositions[l + 4] = positions[idx2 + 1];
      linePositions[l + 5] = positions[idx2 + 2];
    }
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xc5a880,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Interatividade com Mouse e Toque (Lerp suave a 60 FPS)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      targetX = (clientX - windowHalfX) * 0.35;
      targetY = (clientY - windowHalfY) * 0.35;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Responsividade no redimensionamento da janela
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Loop de Renderização com Otimização de Visibilidade e Viewport
    let animationFrameId: number | null = null;
    let isRunning = false;
    let count = 0;

    const renderFrame = () => {
      // Suavização do movimento da câmera em direção ao cursor
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX * 0.8;
      camera.position.y = 120 + -mouseY * 0.6;
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // Se o usuário prefere movimento reduzido, desacelera suavemente
      const waveSpeed = prefersReducedMotion ? 0.01 : 0.035;
      count += waveSpeed;

      // Cálculo da Onda Orgânica nas partículas
      const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionAttr.array as Float32Array;

      let p = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          posArray[p + 1] = 
            (Math.sin((ix + count) * 0.3) * 35) + 
            (Math.sin((iy + count) * 0.5) * 35);
          p += 3;
        }
      }
      positionAttr.needsUpdate = true;

      // Leve rotação de linhas
      lines.rotation.y = count * 0.05;

      renderer?.render(scene, camera);
    };

    const animate = () => {
      if (!isRunning) return;
      renderFrame();
      animationFrameId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!isRunning && !document.hidden) {
        isRunning = true;
        animate();
      }
    };

    const stopAnimation = () => {
      isRunning = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    // IntersectionObserver: pausa imediatamente quando o Hero sai da tela ao rolar a página
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAnimation();
            } else {
              stopAnimation();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    } else {
      startAnimation();
    }

    // Pausar renderização quando a aba estiver oculta para poupar bateria e CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Limpeza de recursos (Cleanup de GPU, observer e listeners)
    return () => {
      stopAnimation();
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-70"
      aria-hidden="true"
    />
  );
};
