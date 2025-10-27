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
      title: "AI Decision Support",
      desc: "Real-time risk models flag adverse events before they happen.",
      tags: ["LLM-Powered", "Real-time"],
    },
    {
      Icon: Scan,
      title: "Quantitative Imaging",
      desc: "Automated segmentation delivers objective results in seconds.",
      tags: ["Deep Learning", "U-Net"],
    },
    {
      Icon: FileText,
      title: "Smart Data Extraction",
      desc: "Transform any report into structured clinical data instantly.",
      tags: ["OCR", "Auto-Parsing"],
    },
    {
      Icon: LayoutGrid,
      title: "Unified Workspace",
      desc: "EMR, PACS, and docs in one elegant interface.",
      tags: ["Single Pane", "Fast"],
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

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 bg-gray-50" id="features">
      {/* decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-healthy-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-healthy-secondary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-healthy-primary/10 text-healthy-primary text-sm font-semibold mb-6">
            The Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            AI-Driven Healthcare
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            Four core modules powering clinical intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map(({ Icon, title, desc, tags }, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group relative rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 will-change-transform"
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-healthy-primary/20 via-healthy-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-healthy-primary/10 text-healthy-primary mb-4 group-hover:scale-110 group-hover:bg-healthy-primary group-hover:text-white transition-all duration-300">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 group-hover:bg-healthy-primary/10 group-hover:text-healthy-primary transition-colors duration-300">
                      {t}
                    </span>
                  ))}
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