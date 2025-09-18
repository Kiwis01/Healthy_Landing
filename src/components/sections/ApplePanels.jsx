import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Cloud, Shield } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const panels = [
  {
    id: "panel-collab",
    title: "Seamless Collaboration",
    desc: "Trabaja en equipo en tiempo real, comparte hallazgos y acelera decisiones clínicas.",
    Icon: Cloud,
    bg: "from-healthy-light to-white",
  },
  {
    id: "panel-ai",
    title: "Advanced AI Diagnostics",
    desc: "Modelos de IA de última generación para segmentación y análisis de imágenes médicas.",
    Icon: Brain,
    bg: "from-white to-healthy-light",
  },
  {
    id: "panel-security",
    title: "Privacy & Security",
    desc: "Cumplimiento de mejores prácticas y cifrado de datos para proteger la información del paciente.",
    Icon: Shield,
    bg: "from-healthy-light to-white",
  },
  {
    id: "panel-sarcoidosis",
    title: "Clinical Case: Sarcoidosis",
    desc: "Visualización de lesiones granulomatosas con reconstrucción 3D para apoyo al diagnóstico.",
    Icon: Shield,
    bg: "from-white to-healthy-light",
  },
];

const ApplePanels = () => {
  const refs = useRef([]);
  const [visible, setVisible] = useState({});
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function LungModel(props) {
    const group = useRef();
    const { scene } = useGLTF('/models/lung_cancer_pancost_tumor/scene.gltf');
    useFrame((_, delta) => {
      if (!group.current) return;
      group.current.rotation.y += delta * 0.10;
      group.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.1;
    });
    return (
      <group ref={group} {...props}>
        <primitive object={scene} position={[0, -0.6, 0]} scale={1.4} />
      </group>
    );
  }

  function SarcoidosisModel(props) {
    const group = useRef();
    const { scene } = useGLTF('/models/sarcoidosis/scene.gltf');
    useFrame((_, delta) => {
      if (!group.current) return;
      group.current.rotation.y += delta * 0.10;
    });
    return (
      <group ref={group} {...props}>
        <primitive object={scene} position={[0, -0.4, 0]} scale={1.2} />
      </group>
    );
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const idx = refs.current.indexOf(entry.target);
          if (idx >= 0) {
            setVisible((v) => ({ ...v, [idx]: entry.isIntersecting }));
          }
        });
      }, { threshold: 0.25 });

      refs.current.forEach((el) => {
        if (!el) return;
        io.observe(el);
        const title = el.querySelector(".ap-title");
        const desc = el.querySelector(".ap-desc");
        const icon = el.querySelector(".ap-icon");

        // Pin each panel for an Apple-like stepping effect
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          scrub: true,
        });

        // Animate content in/out while pinned
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        });

        tl.fromTo(
          [title, desc],
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: "power2.out" }
        ).fromTo(
          icon,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: "power2.out" },
          "<+0.1"
        );
      });
    
      return () => {
        // IntersectionObserver cleanup
        // Will be invoked when ctx is reverted
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="apple-panels" className="relative">
      {panels.map(({ id, title, desc, Icon, bg }, idx) => (
        <div
          key={id}
          ref={(el) => (refs.current[idx] = el)}
          className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b ${bg}`}
        >
          <div className="absolute inset-0 opacity-[0.06] bg-hero-pattern" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 items-center gap-10">
              <div className="text-center md:text-left">
                <h2 className="ap-title heading-lg mb-4">{title}</h2>
                <p className="ap-desc text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
                  {desc}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="ap-icon relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-2xl bg-white shadow-xl border border-gray-200 flex items-center justify-center overflow-hidden">
                  {id === 'panel-ai' && !reduceMotion && visible[idx] ? (
                    <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }} dpr={[1, 1.7]} gl={{ antialias: true }}>
                      <ambientLight intensity={0.6} />
                      <directionalLight position={[2, 2, 2]} intensity={0.7} />
                      <directionalLight position={[-2, -1, -2]} intensity={0.25} />
                      <LungModel />
                    </Canvas>
                  ) : id === 'panel-sarcoidosis' && !reduceMotion && visible[idx] ? (
                    <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }} dpr={[1, 1.7]} gl={{ antialias: true }}>
                      <ambientLight intensity={0.6} />
                      <directionalLight position={[2, 2, 2]} intensity={0.7} />
                      <directionalLight position={[-2, -1, -2]} intensity={0.25} />
                      <SarcoidosisModel />
                    </Canvas>
                  ) : (
                    <Icon className="h-24 w-24 text-healthy-primary" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ApplePanels;
