import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import logoUrl from "@/components/resources/logo/logo.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);
  const weAreRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const logo = logoRef.current;
    const c1 = circle1Ref.current;
    const c2 = circle2Ref.current;
    const c3 = circle3Ref.current;
    const group = groupRef.current;
    if (!section || !logo) return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Initial state
      gsap.set(group, { y: 0, scale: 1, transformOrigin: "50% 50%" });
      gsap.set(logo, { scale: 1, y: 0, opacity: 1 });
      gsap.set(weAreRef.current, { autoAlpha: 1, y: 0 });
      // Ensure header logo is hidden initially while hero is active
      document.documentElement.setAttribute('data-hero-active', '1');

      // Timeline synced to the section scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            // Keep navbar logo hidden almost until the hero finishes
            const active = self.progress < 0.98 ? '1' : '0';
            document.documentElement.setAttribute('data-hero-active', active);
          },
        },
      });

      // Move the central group (text + logo) together so it "moves away" on scroll
      tl.to(group, { y: -140, scale: 0.9, ease: "none" }, 0)
        // Background parallax
        .to(c1, { y: 60, ease: "none" }, 0)
        .to(c2, { y: 100, ease: "none" }, 0)
        .to(c3, { y: 140, ease: "none" }, 0);

      // Fade out the 'we are' text near the end of the hero
      tl.to(weAreRef.current, { autoAlpha: 0, ease: "none" }, 0.85);
    }, section);

    return () => {
      document.documentElement.removeAttribute('data-hero-active');
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[200vh] overflow-clip bg-white" id="hero">
      {/* Sticky viewport for parallax stage */}
      <div className="sticky top-0 h-screen">
        <div className="absolute inset-0 bg-hero-pattern opacity-40"></div>

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
              Hello, we are
            </h2>
            <img
              ref={logoRef}
              src={logoUrl}
              alt="Healthy Logo"
              className="w-[60vw] max-w-[540px] min-w-[220px] will-change-transform drop-shadow-xl"
            />
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