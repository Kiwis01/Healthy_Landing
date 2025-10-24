import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, FileText, Layers, Activity } from "lucide-react";

const Problem = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarse = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  const painPoints = [
    {
      Icon: Layers,
      title: "Fragmented Data & Tooling",
      description:
        "Clinicians are forced to navigate a disconnected maze of EMRs, PACS, and lab portals, creating friction and wasting valuable time.",
    },
    {
      Icon: FileText,
      title: "Unstructured Data Overload",
      description:
        "Critical insights remain locked in unstructured PDFs and image-based reports, demanding manual review and transcription.",
    },
    {
      Icon: Activity,
      title: "Latent Clinical Risk",
      description:
        "Patient safety is compromised by the inability to proactively detect drug-allergy conflicts or adverse interaction signals buried in dense clinical histories.",
    },
    {
      Icon: AlertTriangle,
      title: "Manual, Subjective Diagnostics",
      description:
        "Radiological analysis relies on manual measurements and subjective interpretation, limiting speed, consistency, and accuracy.",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          immediateRender: false,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }

      // Cards stagger in
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Simple tilt interaction
  const handleMove = (e, idx) => {
    if (reduceMotion || isCoarse) return;
    const el = cardsRef.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = Math.max(-3, Math.min(3, ((y / rect.height) - 0.5) * -6)); // clamp ±3deg
    const ry = Math.max(-3, Math.min(3, ((x / rect.width) - 0.5) * 6));
    el.style.willChange = 'transform';
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const handleLeave = (idx) => {
    const el = cardsRef.current[idx];
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section ref={sectionRef} id="problem" className="relative overflow-hidden py-24 bg-white">
      {/* decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-10 h-72 w-72 rounded-full bg-red-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-healthy-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-sm font-medium mb-4">
            Healthcare's Broken Stack
          </div>
          <h2 className="heading-lg mb-4">Healthcare's Broken Stack is Failing Clinicians.</h2>
          <p className="text-gray-600 text-lg">
            Systemic fragmentation and unstructured information slow down decisions and increase patient risk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {painPoints.map(({ Icon, title, description }, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              onMouseMove={(e) => handleMove(e, idx)}
              onMouseLeave={() => handleLeave(idx)}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-[transform,box-shadow] duration-300 hover:shadow-lg will-change-transform"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-healthy-primary/10 text-healthy-primary group-hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Problem);
