import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Vision = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const chipsRef = useRef(null);

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
          scrollTrigger: { trigger: headerRef.current, start: "top 95%", once: true },
        });
      }
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: cardRef.current, start: "top 95%", once: true },
        });
      }
      if (chipsRef.current) {
        gsap.from(Array.from(chipsRef.current.children), {
          opacity: 0,
          y: 12,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: { trigger: chipsRef.current, start: "top 98%", once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -5;
    const ry = ((x / rect.width) - 0.5) * 5;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const handleLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };
  return (
    <section ref={sectionRef} id="vision" className="relative overflow-hidden py-24 bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-healthy-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-healthy-primary/10 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={headerRef}>
            <div className="inline-block px-4 py-2 rounded-full bg-healthy-secondary/10 text-healthy-secondary text-sm font-semibold mb-6">
              Our Vision
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Empower Every Clinician
            </h2>
          </div>
          <div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-md ring-1 ring-black/5 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-300 will-change-transform"
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-healthy-primary/20 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-healthy-secondary/20 rounded-br-3xl" />
            
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
              We're building the AI layer that augments clinicians—automating tasks, surfacing insights, and enabling data-driven decisions.
            </p>
            <div ref={chipsRef} className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="px-4 py-2 text-sm font-medium rounded-full bg-healthy-primary/10 text-healthy-primary">Augment, not replace</span>
              <span className="px-4 py-2 text-sm font-medium rounded-full bg-healthy-secondary/10 text-healthy-secondary">Surface insights</span>
              <span className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100 text-gray-700">Data-driven</span>
            </div>
            <div>
              <a href="#contact" className="inline-flex items-center gap-2 bg-healthy-primary hover:bg-healthy-secondary text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Request a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Vision);
