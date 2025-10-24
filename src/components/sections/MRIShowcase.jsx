import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MRIShowcase = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduceMotion) return; // Fallback to default playback via attributes
    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    // Ensure video is ready for scrubbing
    let duration = 0;
    const onMeta = () => {
      duration = video.duration || 0;
      video.pause();
      video.currentTime = 0;
    };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener('loadedmetadata', onMeta, { once: true });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "+=320%",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        if (!duration) return;
        const p = gsap.utils.clamp(0, 1, self.progress);
        const SCRUB_FRACTION = 0.60;
        const scrubbed = Math.min(1, p / SCRUB_FRACTION);
        
        // Use RAF to batch video updates
        requestAnimationFrame(() => {
          const targetTime = scrubbed * Math.max(0, duration - 0.05);
          if (Math.abs(video.currentTime - targetTime) > 0.033) { // Only update if > 2 frames different
            video.currentTime = targetTime;
          }
        });
        
        const TEXT_FADE_START = 0.70;
        const TEXT_FADE_END = 0.85;
        const t = Math.min(1, Math.max(0, (p - TEXT_FADE_START) / (TEXT_FADE_END - TEXT_FADE_START)));
        if (textRef.current) textRef.current.style.opacity = t.toFixed(3);
      },
    });

    return () => {
      st.kill();
    };
  }, [reduceMotion]);

  return (
    <section id="mri-showcase" ref={sectionRef} className="relative min-h-screen md:min-h-[100dvh] overflow-hidden bg-white">
      {/* Fullscreen video */}
      <video
        ref={videoRef}
        src="/videos/cerebro-con-tumor.mp4"
        className="absolute inset-0 w-full h-full object-contain object-center"
        muted
        playsInline
        preload="auto"
        controls={false}
        autoPlay={reduceMotion}
        loop={reduceMotion}
      />

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
