import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, PerspectiveCamera } from "@react-three/drei";

const TaglineSequence = () => {
  const sectionRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const camRef = useRef(null);
  const brainRef = useRef(null);
  const overlayRef = useRef(null);
  const t1Ref = useRef(null);
  const t2Ref = useRef(null);
  const t3Ref = useRef(null);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function BrainModel(props) {
    const group = useRef();
    const { scene } = useGLTF('/models/brain_point_cloud/scene_draco.gltf');
    // Make materials semi-transparent
    useEffect(() => {
      if (!scene) return;
      scene.traverse((obj) => {
        const apply = (mat) => {
          if (!mat) return;
          mat.transparent = true;
          mat.opacity = 0.65; // 65% opacity (additional 5% less transparent)
          // optional: reduce depthWrite to avoid harsh self-overdraw with transparency
          if ('depthWrite' in mat) mat.depthWrite = false;
        };
        if (obj.isMesh || obj.isPoints || obj.isLine) {
          if (Array.isArray(obj.material)) obj.material.forEach(apply);
          else apply(obj.material);
          // make lines invisible (cleaner) and points more subtle
          if (obj.isLine) {
            obj.visible = false;
          }
          if (obj.isPoints && obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach((m) => { m.opacity = 0.35; m.transparent = true; m.depthWrite = false; });
            else { obj.material.opacity = 0.35; obj.material.transparent = true; obj.material.depthWrite = false; }
          }
        }
      });
    }, [scene]);
    useFrame((state, delta) => {
      const target = (props.outerRef && props.outerRef.current) ? props.outerRef.current : group.current;
      if (!target) return;
      // subtle rotation for life
      target.rotation.y += delta * 0.45;
    });
    return (
      <group ref={props.outerRef || group} {...props}>
        <Center>
          {/* 3x larger than previous 1.4 => 4.2, plus 10% => 4.62 */}
          <primitive object={scene} scale={4.62} />
        </Center>
      </group>
    );
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = [t1Ref.current, t2Ref.current, t3Ref.current];
      // Initialize hidden and non-interactive
      items.forEach((el) => el && gsap.set(el, { autoAlpha: 0, y: 6, display: 'none', pointerEvents: 'none' }));

      let lastIndex = -1;
      const applyIndex = (i) => {
        // Stop any ongoing tweens to avoid overlap/flicker
        gsap.killTweensOf(items);
        items.forEach((el, j) => {
          if (!el) return;
          if (j === i) {
            gsap.set(el, { display: 'inline-block', pointerEvents: 'auto' });
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: 6 },
              { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' }
            );
          } else {
            // Hide others immediately to prevent stacking
            gsap.set(el, { autoAlpha: 0, y: -6, display: 'none', pointerEvents: 'none' });
          }
        });
        lastIndex = i;
      };

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=240%",
        scrub: true,
        pin: true,
        snap: {
          snapTo: (value) => Math.round(value * 3) / 3, // thirds: 0, 0.333, 0.667, 1
          duration: 0.45,
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const i = Math.min(2, Math.max(0, Math.floor(self.progress * 3 + 0.0001)));
          if (i !== lastIndex) applyIndex(i);
        },
      });

      // Zoom/fade driven directly by scroll during the last third (built for every device)
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=240%",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          // normalize last third progress: 0 at 2/3, 1 at end
          const seg = Math.min(1, Math.max(0, (p - 2 / 3) / (1 / 3)));
          const cam = camRef.current;
          const wrap = canvasWrapRef.current;
          const brain = brainRef.current;
          if (cam) {
            // interpolate camera Z to dive into the brain and widen FOV for impact
            cam.position.z = gsap.utils.interpolate(2.6, 0.02, seg);
            cam.fov = gsap.utils.interpolate(45, 90, seg);
            if (typeof cam.updateProjectionMatrix === 'function') cam.updateProjectionMatrix();
          }
          if (brain) {
            // scale up brain to enhance the "entering" sensation
            brain.scale.setScalar(gsap.utils.interpolate(1, 18, seg));
          }
          if (wrap) {
            // fade only in the last 30% of the final segment for a visible zoom first
            const fadeSeg = Math.min(1, Math.max(0, (seg - 0.7) / 0.3));
            const o = 1 - fadeSeg;
            wrap.style.opacity = o.toFixed(3);
          }
          // Ensure overlay never blocks subsequent sections
          if (overlayRef.current) overlayRef.current.style.opacity = '0';
        },
      });

      // Hide global grid overlay while this section is active for a cleaner look
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        onEnter: () => document.documentElement.setAttribute('data-no-grid', '1'),
        onEnterBack: () => document.documentElement.setAttribute('data-no-grid', '1'),
        onLeave: () => document.documentElement.removeAttribute('data-no-grid'),
        onLeaveBack: () => document.documentElement.removeAttribute('data-no-grid'),
      });

      // Initialize first tagline visible
      applyIndex(0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="taglines" ref={sectionRef} className="relative overflow-hidden bg-white">
      <div className="min-h-screen flex items-center justify-center">
        {/* 3D brain background (behind text) */}
        {!reduceMotion && (
          <div ref={canvasWrapRef} className="absolute inset-0 z-0 pointer-events-none">
            <Canvas dpr={[1, 1.7]} gl={{ antialias: true }}>
              <PerspectiveCamera makeDefault ref={camRef} position={[0, 0, 2.6]} fov={45} near={0.001} far={50} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 2, 2]} intensity={0.6} />
              <directionalLight position={[-2, -1, -2]} intensity={0.18} />
              <BrainModel outerRef={brainRef} />
            </Canvas>
          </div>
        )}
        {/* Plain white overlay to mask the jump to the next slide */}
        <div ref={overlayRef} className="fixed inset-0 z-[60] pointer-events-none opacity-0 bg-white" />
        <div className="relative z-10 w-full h-[28vh] md:h-[34vh] text-center px-6">
          <h2
            ref={t1Ref}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-block px-3 py-1.5 rounded-2xl text-3xl md:text-5xl font-semibold text-white will-change-transform bg-white/5 backdrop-blur-sm ring-1 ring-white/10 shadow-[0_2px_14px_rgba(0,0,0,0.14)]"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.35), 0 0 12px rgba(0,0,0,0.22)' }}
          >
            a healthcare technology company
          </h2>
          <h2
            ref={t2Ref}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-block px-3 py-1.5 rounded-2xl text-3xl md:text-5xl font-semibold text-white will-change-transform bg-white/5 backdrop-blur-sm ring-1 ring-white/10 shadow-[0_2px_14px_rgba(0,0,0,0.14)]"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.35), 0 0 12px rgba(0,0,0,0.22)' }}
          >
            reinventing diagnostics with AI
          </h2>
          <h2
            ref={t3Ref}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-block px-3 py-1.5 rounded-2xl text-3xl md:text-5xl font-semibold text-white will-change-transform bg-white/5 backdrop-blur-sm ring-1 ring-white/10 shadow-[0_2px_14px_rgba(0,0,0,0.14)]"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.35), 0 0 12px rgba(0,0,0,0.22)' }}
          >
            built for every device
          </h2>
        </div>
      </div>
    </section>
  );
};

// Preload brain model for faster reveal
useGLTF.preload('/models/brain_point_cloud/scene_draco.gltf');

export default memo(TaglineSequence);
