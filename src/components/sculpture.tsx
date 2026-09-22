'use client';

import { useEffect, useRef } from 'react';

type SceneKind = 'hero' | 'orbit' | 'wave' | 'grid' | 'terminal';

/** Real geometry, physical materials, and studio reflections. Loaded only in view. */
export function Sculpture({ kind = 'hero' }: { kind?: SceneKind }) {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const start = async () => {
      const THREE = await import('three');
      const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
      catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, .1, 50);
      camera.position.set(0, 0, 8.8);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const environment = pmrem.fromScene(room, .04);
      scene.environment = environment.texture;
      room.dispose(); pmrem.dispose();
      const group = new THREE.Group();
      scene.add(group);
      const chrome = new THREE.MeshPhysicalMaterial({ color: kind === 'hero' ? '#c4b2ef' : '#e5dfef', metalness: 1, roughness: .17, clearcoat: 1, clearcoatRoughness: .12, iridescence: .55, iridescenceIOR: 1.4, envMapIntensity: 1.5 });
      const dark = new THREE.MeshPhysicalMaterial({ color: '#252131', metalness: .9, roughness: .18, clearcoat: 1 });
      const pearl = new THREE.MeshPhysicalMaterial({ color: '#f5efdc', metalness: .3, roughness: .17, clearcoat: 1 });
      const geometry = kind === 'wave'
        ? new THREE.TorusKnotGeometry(1.05, .31, 180, 28, 3, 4)
        : kind === 'orbit'
          ? new THREE.TorusGeometry(1.18, .42, 40, 120)
        : kind === 'grid'
          ? new THREE.IcosahedronGeometry(1.4, 0)
          : new THREE.TorusKnotGeometry(1.12, kind === 'hero' ? .43 : .36, 200, 36, 2, 3);
      const main = new THREE.Mesh(geometry, chrome);
      main.rotation.set(.35, -.35, .4);
      group.add(main);
      const smallGeometry = new THREE.SphereGeometry(.24, 32, 24);
      const satellites = [new THREE.Mesh(smallGeometry, pearl), new THREE.Mesh(smallGeometry, dark), new THREE.Mesh(smallGeometry, chrome)];
      satellites.forEach((mesh, i) => { mesh.scale.setScalar(i === 1 ? 1.6 : 1); group.add(mesh); });
      const rim = new THREE.DirectionalLight('#c1a7ff', 5);
      rim.position.set(3, 4, 2); scene.add(rim);
      const fill = new THREE.DirectionalLight('#eaffc1', 3);
      fill.position.set(-4, -1, 3); scene.add(fill);
      const pointer = { x: 0, y: 0 };
      let scroll = 0, visible = true, frame = 0, previous = 0, elapsed = 0, renderedStill = false;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      const move = (event: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        pointer.x = (event.clientX - rect.left) / rect.width - .5;
        pointer.y = (event.clientY - rect.top) / rect.height - .5;
      };
      const leave = () => { pointer.x = 0; pointer.y = 0; };
      const onScroll = () => { scroll = Math.max(0, -host.getBoundingClientRect().top / window.innerHeight); };
      const resize = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.position.z = camera.aspect < .85 ? 10.4 : 8.8;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      });
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      const render = (time: number) => {
        frame = requestAnimationFrame(render);
        if (time - previous < 30) return;
        const delta = Math.min((time - previous) / 1000, .05); previous = time;
        if (!visible || document.hidden) return;
        const animate = !reduced.matches && document.documentElement.dataset.motion !== 'paused';
        if (!animate && renderedStill) return;
        renderedStill = !animate;
        if (animate) {
          elapsed += delta;
          main.rotation.y = -.35 + elapsed * .13 + scroll * .55;
          main.rotation.z = .4 + Math.sin(elapsed * .19) * .2;
          group.rotation.y += (pointer.x * .32 - group.rotation.y) * .035;
          group.rotation.x += (pointer.y * .2 - group.rotation.x) * .035;
          group.position.y = Math.sin(elapsed * .65) * .09;
        }
        satellites.forEach((mesh, i) => {
          const angle = i * 2.3 + elapsed * .15;
          mesh.position.set(Math.cos(angle) * 2.1, Math.sin(angle) * 1.6, Math.sin(angle + i) * .5);
        });
        renderer.render(scene, camera);
      };
      host.dataset.ready = 'true';
      host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave);
      window.addEventListener('scroll', onScroll, { passive: true });
      resize.observe(host); observer.observe(host); frame = requestAnimationFrame(render);
      cleanup = () => {
        cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect();
        host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave);
        window.removeEventListener('scroll', onScroll);
        geometry.dispose(); smallGeometry.dispose(); chrome.dispose(); dark.dispose(); pearl.dispose(); environment.dispose();
        renderer.dispose(); renderer.domElement.remove(); delete host.dataset.ready;
      };
      if (disposed) cleanup();
    };
    const load = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { load.disconnect(); void start().catch(() => { cleanup?.(); }); } }, { rootMargin: '300px' });
    load.observe(host);
    return () => { disposed = true; load.disconnect(); cleanup?.(); };
  }, [kind]);
  return <div ref={hostRef} className={`sculpture sculpture-${kind}`} role="img" aria-label="Floating polished chrome sculpture with orbiting spheres"><div className="scene-fallback" aria-hidden="true"><i /><i /><i /></div></div>;
}
