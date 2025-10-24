import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);
  const weAreRef = useRef(null);
  const groupRef = useRef(null);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const c1 = circle1Ref.current;
    const c2 = circle2Ref.current;
    const c3 = circle3Ref.current;
    const group = groupRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Initial state
      gsap.set(group, { y: 0, scale: 1, transformOrigin: "50% 50%" });
      gsap.set(weAreRef.current, { autoAlpha: 1, y: 0 });
      if (video) gsap.set(video, { autoAlpha: reduceMotion ? 1 : 0 });

      // Ensure header logo is hidden initially while hero is active
      document.documentElement.setAttribute('data-hero-active', '1');

      // Prepare video for scrubbing
      let duration = 0;
      let lastTime = 0;
      const setTime = (time) => {
        if (video && Math.abs(time - lastTime) > 0.016) { // Only update if change > 1 frame at 60fps
          video.currentTime = time;
          lastTime = time;
        }
      };
      const onMeta = () => {
        if (!video) return;
        duration = video.duration || 0;
        video.pause();
        video.currentTime = 0;
      };
      if (!reduceMotion && video) {
        if (video.readyState >= 1) onMeta();
        else video.addEventListener('loadedmetadata', onMeta, { once: true });
      }

      // Timeline synced to the section scroll and pinned for extended scrubbing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=220%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = gsap.utils.clamp(0, 1, self.progress);
            // Keep navbar logo hidden almost until the hero finishes
            const active = p < 0.98 ? '1' : '0';
            document.documentElement.setAttribute('data-hero-active', active);

            // Phases
            const VIDEO_START = 0.20;      // when video begins
            const FADE_IN_WIN = 0.12;      // fade-in window length
            const MAX_SCRUB_NORM = 0.955;  // cap scrub a bit earlier to avoid tail frames

            // Compute fades
            const fadeIn = Math.min(1, Math.max(0, (p - VIDEO_START) / FADE_IN_WIN));
            const videoAlpha = fadeIn; // keep visible until the very end

            // Cross-fade text out as video fades in (only react to fade-in portion)
            if (weAreRef.current) gsap.set(weAreRef.current, { autoAlpha: 1 - fadeIn });
            // Scroll-scrub the intro video after VIDEO_START
            if (video && !reduceMotion) {
              const norm = Math.min(1, Math.max(0, (p - VIDEO_START) / (1 - VIDEO_START)));
              const capped = Math.min(norm, MAX_SCRUB_NORM);
              if (duration) {
                const targetTime = capped * Math.max(0, duration - 0.05);
                setTime(targetTime);
              }
              gsap.set(video, { autoAlpha: videoAlpha });
            } else if (video) {
              gsap.set(video, { autoAlpha: 1 });
            }
          },
          onLeave: () => {
            const next = document.getElementById('taglines') || sectionRef.current?.nextElementSibling;
            if (next) {
              const top = next.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top, behavior: 'auto' });
            }
          },
        },
      });

      // Move the central group (text + logo) together so it "moves away" on scroll
      tl.to(group, { y: -140, scale: 0.9, ease: "none" }, 0)
        .to(c1, { y: 60, ease: "none" }, 0)
        .to(c2, { y: 100, ease: "none" }, 0)
        .to(c3, { y: 140, ease: "none" }, 0);

      // Note: text fade is handled in onUpdate together with the video fade
    }, section);

    return () => {
      document.documentElement.removeAttribute('data-hero-active');
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-white" id="hero">
      {/* Pinned viewport via GSAP ScrollTrigger (no nested sticky) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-hero-pattern opacity-40"></div>

        {/* Fullscreen intro video that fades in and scrubs with scroll */}
        <video
          ref={videoRef}
          src="/videos/intro.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
          muted
          playsInline
          preload="auto"
          controls={false}
          autoPlay={reduceMotion}
          loop={reduceMotion}
        />

        {/* Parallax blobs */}
        <div ref={circle1Ref} className="absolute -top-20 right-10 w-72 h-72 bg-healthy-primary/10 rounded-full blur-3xl"></div>
        <div ref={circle2Ref} className="absolute top-40 -left-10 w-[30rem] h-[30rem] bg-healthy-secondary/10 rounded-full blur-3xl"></div>
        <div ref={circle3Ref} className="absolute bottom-10 right-1/3 w-80 h-80 bg-healthy-accent/10 rounded-full blur-3xl"></div>

        {/* Centered group: 'Hello, we are' + big logo */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div ref={groupRef} className="relative text-center flex flex-col items-center">
            <h2
              ref={weAreRef}
              className="font-medium text-gray-800 leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)", transform: "scale(1.15)", marginBottom: "2px" }}
            >
              Hello, we are..
            </h2>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute inset-x-0 bottom-8 z-20 pointer-events-auto">
          <div className="flex items-center justify-center">
            <a href="#taglines" aria-label="Scroll down" className="group inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 backdrop-blur hover:bg-white/90 transition">
              <ArrowDown className="h-5 w-5 text-gray-500 group-hover:text-healthy-primary transition" />
              <span className="text-sm text-gray-600">Scroll</span>
            </a>
          </div>
        </div>

        {/* White fade at bottom to blend into next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none"></div>
      </div>

    </section>
  );
};

export default Hero;