import { useEffect, useRef, memo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const demos = [
  {
    id: 1,
    title: "Tumor Detection",
    description: "AI-highlighted brain tumor regions",
    video: "/videos/cerebro-con-tumor.mp4"
  },
  {
    id: 2,
    title: "Lesion Analysis",
    description: "Automated lesion identification",
    video: "/videos/cerebro-con-tumor.mp4"
  },
  {
    id: 3,
    title: "Volume Measurement",
    description: "Precise volumetric analysis",
    video: "/videos/cerebro-con-tumor.mp4"
  },
  {
    id: 4,
    title: "Comparison View",
    description: "Side-by-side temporal analysis",
    video: "/videos/cerebro-con-tumor.mp4"
  }
];

const DemoCard = ({ demo, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    setHasInteracted(true);
    e.currentTarget.querySelector('video')?.play();
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Number badge */}
      <div className={`absolute -top-3 -left-3 z-20 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
        hasInteracted 
          ? 'bg-healthy-primary text-white shadow-lg scale-110' 
          : 'bg-white text-healthy-primary ring-2 ring-healthy-primary/20'
      }`}>
        {demo.id}
      </div>

      {/* Card container */}
      <div className={`relative h-full rounded-2xl overflow-hidden transition-all duration-500 ${
        isHovered 
          ? 'ring-2 ring-healthy-primary shadow-2xl shadow-healthy-primary/20 scale-[1.02]' 
          : 'ring-1 ring-black/10 shadow-lg'
      }`}>
        {/* Video */}
        <video
          src={demo.video}
          className="w-full h-full object-contain bg-gradient-to-br from-healthy-light to-white"
          muted
          playsInline
          preload="metadata"
          controls={false}
          loop
        />

        {/* Overlay gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Info overlay */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 transform transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}>
          <h3 className="text-white font-bold text-lg md:text-xl mb-1">
            {demo.title}
          </h3>
          <p className="text-white/90 text-sm md:text-base">
            {demo.description}
          </p>
        </div>

        {/* Hover hint (only shows before first interaction) */}
        {!hasInteracted && !isHovered && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg animate-pulse">
              <p className="text-sm font-medium text-healthy-primary">Hover to preview</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MRIShowcase = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = sectionRef.current;
    const headerEl = headerRef.current;
    if (!el || !headerEl) return;

    if (reduceMotion) {
      headerEl.style.opacity = '1';
      return;
    }

    const tween = gsap.fromTo(
      headerEl,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      if (tween) tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [reduceMotion]);

  return (
    <section 
      id="mri-showcase" 
      ref={sectionRef} 
      className="relative min-h-screen py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white via-healthy-light/30 to-white"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-healthy-primary/10 text-healthy-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-healthy-primary rounded-full animate-pulse" />
            AI-Powered Diagnostics
          </div>
          <h2 className="heading-lg mb-4 text-gray-900">
            Experience Our <span className="text-healthy-primary">MRI Analysis Suite</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            Explore four powerful AI-assisted tools designed to enhance diagnostic accuracy and efficiency. 
            Hover over each demo to see it in action.
          </p>
        </div>

        {/* Demo grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {demos.map((demo, index) => (
            <DemoCard key={demo.id} demo={demo} index={index} />
          ))}
        </div>

        {/* Bottom CTA hint */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-gray-500 text-sm md:text-base">
            Interactive demos • Hover to explore each feature
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(MRIShowcase);
