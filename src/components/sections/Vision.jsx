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
    <section ref={sectionRef} id="vision" className="relative overflow-hidden py-24 bg-gray-50">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 h-72 w-72 rounded-full bg-healthy-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-healthy-primary/10 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div ref={headerRef}>
            <div className="inline-block px-3 py-1 rounded-full bg-healthy-secondary/10 text-healthy-secondary text-sm font-medium mb-4">
              Our Vision
            </div>
            <h2 className="heading-lg mb-6">Our Vision: To Empower Every Clinician with Superhuman Insight.</h2>
          </div>
          <div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative bg-white/80 backdrop-blur-md ring-1 ring-black/5 rounded-2xl p-8 md:p-10 shadow-xl text-left transition-transform duration-200 will-change-transform"
          >
            <p className="text-gray-700 text-lg leading-relaxed">
              "At Healthy-Record, we believe the future of medicine isn't about replacing clinicians; it's about augmenting them.
              We're building the foundational AI layer that automates repetitive tasks, surfaces critical insights hidden in data, and
              provides powerful diagnostic tools. We're moving from a system of record to a system of intelligence, creating a world
              where every medical decision is data-driven, proactive, and precise."
            </p>
            <div ref={chipsRef} className="mt-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">Augment, not replace</span>
              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">Surface hidden insights</span>
              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">System of intelligence</span>
            </div>
            <div className="mt-8">
              <a href="#contact" className="inline-flex items-center gap-2 bg-healthy-primary hover:bg-healthy-secondary text-white px-6 py-3 rounded-lg font-medium transition-colors">
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
