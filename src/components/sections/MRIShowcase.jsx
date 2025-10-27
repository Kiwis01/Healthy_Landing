import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MRIShowcase = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = sectionRef.current;
    const textEl = textRef.current;
    if (!el || !textEl) return;

    if (reduceMotion) {
      textEl.style.opacity = '1';
      return;
    }

    const tween = gsap.fromTo(
      textEl,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 25%',
          end: 'top 70%',
          scrub: true,
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
    <section id="mri-showcase" ref={sectionRef} className="relative min-h-screen md:min-h-[80dvh] overflow-hidden bg-white">
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div className="grid grid-cols-2 grid-rows-2 gap-3 md:gap-20 max-w-[1310px] h-[60vh] md:h-[70vh]">
        <video
          src="/videos/cerebro-con-tumor.mp4"
          className="w-full h-full object-contain bg-black/5 rounded-lg ring-1 ring-black/10 shadow"
          muted
          playsInline
          preload="metadata"
          controls={false}
          loop
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
        <video
          src="/videos/cerebro-con-tumor.mp4"
          className="w-full h-full object-contain bg-black/5 rounded-lg ring-1 ring-black/10 shadow"
          muted
          playsInline
          preload="metadata"
          controls={false}
          loop
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
        <video
          src="/videos/cerebro-con-tumor.mp4"
          className="w-full h-full object-contain bg-black/5 rounded-lg ring-1 ring-black/10 shadow"
          muted
          playsInline
          preload="metadata"
          controls={false}
          loop
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
        <video
          src="/videos/cerebro-con-tumor.mp4"
          className="w-full h-full object-contain bg-black/5 rounded-lg ring-1 ring-black/10 shadow"
          muted
          playsInline
          preload="metadata"
          controls={false}
          loop
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
        </div>
      </div>

      {/* Removed dark vignette to keep edges white on mobile */}

      {/* Glass text that fades in near the end */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center opacity-0"
        style={{ transition: 'opacity 200ms linear' }}
      >
        <div className="inline-block bg-white/70 backdrop-blur-md ring-1 ring-black/10 rounded-2xl px-6 py-5 shadow-xl max-w-2xl text-center">
          <h2 className="heading-lg mb-2 text-gray-900">AI‑assisted MRI review</h2>
          <p className="text-gray-700 text-lg">
            MRI slices with AI‑highlighted regions to support diagnosis. Scroll to scrub through the sequence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(MRIShowcase);
