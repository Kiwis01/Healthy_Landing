import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { rafThrottle } from "@/lib/utils";

const BackgroundOrgans = ({ showOn = ["#apple-panels", "#features"] }) => {
  const wrapRef = useRef(null);
  const brainRef = useRef(null);
  const lungRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(wrap, { autoAlpha: 0 });

      const triggers = showOn.map((sel) =>
        ScrollTrigger.create({
          trigger: sel,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => gsap.to(wrap, { autoAlpha: 1, duration: 0.5 }),
          onEnterBack: () => gsap.to(wrap, { autoAlpha: 1, duration: 0.5 }),
          onLeave: () => gsap.to(wrap, { autoAlpha: 0, duration: 0.5 }),
          onLeaveBack: () => gsap.to(wrap, { autoAlpha: 0, duration: 0.5 }),
        })
      );

      return () => triggers.forEach((t) => t.kill());
    });

    return () => ctx.revert();
  }, [showOn]);

  // Throttled parallax tilt on mouse
  useEffect(() => {
    const onMove = rafThrottle((e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const nx = (e.clientX / w) * 2 - 1;
      const ny = (e.clientY / h) * 2 - 1;
      
      const tilt = (el, amp = 5) => { // Reduced from 6
        if (!el) return;
        gsap.to(el, {
          rotateY: nx * amp,
          rotateX: -ny * amp,
          x: nx * amp * 1.5, // Reduced from 2
          y: ny * amp * 1.5,
          transformPerspective: 800,
          transformOrigin: "50% 50%",
          duration: 0.6, // Slightly slower
          ease: "power2.out",
          overwrite: true,
        });
      };
      tilt(brainRef.current, 6); // Reduced from 8
      tilt(lungRef.current, 5); // Reduced from 7
    });
    
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      onMove.cancel();
    };
  }, []);

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[-5] pointer-events-none">
      <div
        ref={brainRef}
        className="absolute left-8 top-24 md:left-16 md:top-28 w-[180px] md:w-[240px] aspect-square rounded-2xl bg-white/5 backdrop-blur-[2px] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        style={{ willChange: "transform" }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-healthy-primary/8 to-healthy-secondary/8" />
        <div className="relative w-full h-full grid place-items-center">
          <svg width="110" height="110" viewBox="0 0 120 120" className="opacity-85">
            <path d="M60,20c20,0,36,12,36,28s-16,24-36,24S24,64,24,48,40,20,60,20Z" fill="none" stroke="rgba(38,186,222,0.75)" strokeWidth="3" />
            <path d="M44,64c0,12,6,20,16,20s16-8,16-20" fill="none" stroke="rgba(30,155,184,0.65)" strokeWidth="3" />
          </svg>
          <div className="absolute bottom-2 text-white/75 text-sm">Brain 3D (placeholder)</div>
        </div>
      </div>

      <div
        ref={lungRef}
        className="absolute right-8 bottom-24 md:right-16 md:bottom-28 w-[190px] md:w-[260px] aspect-[4/3] rounded-2xl bg-white/5 backdrop-blur-[2px] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        style={{ willChange: "transform" }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-healthy-secondary/8 to-healthy-primary/8" />
        <div className="relative w-full h-full grid place-items-center">
          <svg width="150" height="110" viewBox="0 0 160 120" className="opacity-85">
            <path d="M80,20 C60,20 55,38 55,60 C55,85 70,90 80,92 C90,90 105,85 105,60 C105,38 100,20 80,20 Z" fill="none" stroke="rgba(77,200,232,0.75)" strokeWidth="3" />
            <path d="M80,35 L80,95" stroke="rgba(38,186,222,0.6)" strokeWidth="3" />
          </svg>
          <div className="absolute bottom-2 text-white/75 text-sm">Lung 3D (placeholder)</div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundOrgans;