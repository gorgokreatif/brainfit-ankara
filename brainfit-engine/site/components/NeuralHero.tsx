'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

const NODE_COUNT = 70;
const CONNECT_DIST = 3.2;

export default function NeuralHero({ eyebrow, title, subtitle, ctaPrimary, ctaSecondary }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReduced || isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 14;

    const nodeGeo = new THREE.SphereGeometry(0.07, 8, 8);
    const accentMat = new THREE.MeshBasicMaterial({ color: 0x36c0c9 });
    const primaryMat = new THREE.MeshBasicMaterial({ color: 0x1b5fb0 });

    const nodes: THREE.Mesh[] = [];
    const vels: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const mat = Math.random() > 0.35 ? accentMat : primaryMat;
      const node = new THREE.Mesh(nodeGeo, mat);
      node.position.set(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 13,
        (Math.random() - 0.5) * 8
      );
      scene.add(node);
      nodes.push(node);
      vels.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.009,
        (Math.random() - 0.5) * 0.009,
        (Math.random() - 0.5) * 0.004
      ));
    }

    // Pre-allocate line buffer (avoid GC pressure per frame)
    const MAX_PAIRS = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
    const posArr = new Float32Array(MAX_PAIRS * 6);
    const lineGeo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(posArr, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeo.setAttribute('position', posAttr);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x1b5fb0, transparent: true, opacity: 0.25 });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    function updateLines() {
      let idx = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].position.distanceTo(nodes[j].position) < CONNECT_DIST) {
            posArr[idx++] = nodes[i].position.x;
            posArr[idx++] = nodes[i].position.y;
            posArr[idx++] = nodes[i].position.z;
            posArr[idx++] = nodes[j].position.x;
            posArr[idx++] = nodes[j].position.y;
            posArr[idx++] = nodes[j].position.z;
          }
        }
      }
      lineGeo.setDrawRange(0, idx / 3);
      posAttr.needsUpdate = true;
    }

    let animId: number;
    let frame = 0;

    function animate() {
      animId = requestAnimationFrame(animate);
      nodes.forEach((n, i) => {
        n.position.add(vels[i]);
        if (Math.abs(n.position.x) > 11) vels[i].x *= -1;
        if (Math.abs(n.position.y) > 6.5) vels[i].y *= -1;
        if (Math.abs(n.position.z) > 4) vels[i].z *= -1;
      });
      if (++frame % 3 === 0) updateLines();
      renderer.render(scene, camera);
    }

    updateLines();
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      nodeGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      accentMat.dispose();
      primaryMat.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      {/* Static background (visible on mobile / before canvas loads) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/generated/hero-bg.jpg)' }}
      />

      {/* Neural canvas container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(14,27,42,0.88) 0%, rgba(11,61,122,0.55) 100%)',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 pt-36">
        <p
          className="text-xs font-bold tracking-widest uppercase mb-5"
          style={{ color: 'var(--accent)' }}
        >
          {eyebrow}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-6 max-w-3xl">
          {title}
        </h1>
        <p
          className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
          style={{ color: 'rgba(246,248,251,0.82)' }}
        >
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#contact"
            className="px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:scale-105 hover:brightness-110 shadow-lg"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {ctaPrimary}
          </a>
          <a
            href="#programs"
            className="px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-105 border-2"
            style={{ borderColor: 'rgba(246,248,251,0.4)', color: 'var(--paper)' }}
          >
            {ctaSecondary}
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
