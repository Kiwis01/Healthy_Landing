import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";

const TaglineSequence = () => {
  const sectionRef = useRef(null);
  const t1Ref = useRef(null);
  const t2Ref = useRef(null);
  const t3Ref = useRef(null);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function BrainModel(props) {
    const group = useRef();
    const { scene } = useGLTF('/models/brain_point_cloud/scene.gltf');
    // Make materials semi-transparent
    useEffect(() => {
      if (!scene) return;
      scene.traverse((obj) => {
        const apply = (mat) => {
          if (!mat) return;
          mat.transparent = true;
          mat.opacity = 0.6; // 60% opacity (15% less transparent)
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
      if (!group.current) return;
      // subtle rotation for life
      group.current.rotation.y += delta * 0.25;
    });
    return (
      <group ref={group} {...props}>
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
      gsap.set(items, { autoAlpha: 0, y: 10 });

      let lastIndex = -1;
      const applyIndex = (i) => {
        items.forEach((el, j) => {
          gsap.to(el, {
            autoAlpha: j === i ? 1 : 0,
            y: j === i ? 0 : -10,
            duration: 0.25,
            ease: "power1.out",
          });
        });
        lastIndex = i;
      };

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
        snap: {
          snapTo: (value) => Math.round(value * 3) / 3, // 0, 1/3, 2/3, 1
          duration: 0.4,
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const i = Math.min(2, Math.max(0, Math.round(self.progress * 3)));
          if (i !== lastIndex) applyIndex(i);
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
    <section id="taglines" ref={sectionRef} className="relative bg-white">
      <div className="sticky top-0 min-h-screen flex items-center justify-center">
        {/* 3D brain background (behind text) */}
        {!reduceMotion && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 2.6], fov: 45 }} dpr={[1, 1.7]} gl={{ antialias: true }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 2, 2]} intensity={0.6} />
              <directionalLight position={[-2, -1, -2]} intensity={0.18} />
              <BrainModel />
            </Canvas>
          </div>
        )}
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
useGLTF.preload('/models/brain_point_cloud/scene.gltf');

export default TaglineSequence;
