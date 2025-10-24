import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Scan, FileText, LayoutGrid } from "lucide-react";

const Features = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarse = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  const features = [
    {
      Icon: Brain,
      title: "Real-time Decision Support, Powered by LLMs.",
      desc: "Synthesizes the entire patient record into a dynamic risk model and flags adverse events before they happen.",
      tags: ["LLM-Powered", "Real-time CDS", "Risk Stratification"],
    },
    {
      Icon: Scan,
      title: "From Raw Pixels to Quantitative Insights.",
      desc: "U-Net segmentation and inference pipeline deliver objective tumor volumes and structures in seconds.",
      tags: ["Deep Learning", "U-Net", "Inference Pipeline", "Quant Radiology"],
    },
    {
      Icon: FileText,
      title: "Autonomous Data Transformation.",
      desc: "OCR + parsers clean and structure any PDF/image-based report into instantly usable clinical data.",
      tags: ["OCR Pipeline", "Heuristic Parsing", "Data Structuring", "Zero-Touch"],
    },
    {
      Icon: LayoutGrid,
      title: "A Frictionless, End-to-End Clinical Environment.",
      desc: "EMR, PACS, and docs unified in a single pane of glass—fast, accessible, and elegant.",
      tags: ["Unified Workspace", "Single Pane", "Frictionless"],
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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

  // No complex tilt to avoid conflicts; simple hover handled via CSS

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 bg-gray-50" id="features">
      {/* decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-healthy-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-healthy-secondary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-healthy-primary/10 text-healthy-primary text-sm font-medium mb-4">
            The Platform
          </div>
          <h2 className="heading-lg mb-4">We're Building the Foundational Layer for AI-Driven Healthcare.</h2>
          <p className="text-gray-600 text-lg">Four core modules powering Clinical Intelligence at scale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ Icon, title, desc, tags }, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-white to-white group-hover:from-white/90 group-hover:to-white/90 z-[-1]" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-healthy-primary/10 text-healthy-primary group-hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 group-hover:bg-healthy-primary/10 group-hover:text-healthy-primary transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Features); 