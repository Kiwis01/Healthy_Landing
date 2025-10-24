import { useEffect, useRef } from "react";
import gsap from "gsap";
import { rafThrottle } from "@/lib/utils";

const BackgroundFX = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const orbsRef = useRef([]);
  const mouse = useRef({ x: 0, y: 0, nx: 0, ny: 0 });

  // Canvas particles
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true }); // Performance hint
    let rafId = 0;

    const DPR = Math.min(1.5, window.devicePixelRatio || 1); // Reduced from 2
    let width = 0;
    let height = 0;

    const particles = [];
    const isSmall = () => window.innerWidth < 768;
    const COUNT_BASE = 40; // Reduced from 60
    let COUNT = isSmall() ? Math.floor(COUNT_BASE * 0.5) : COUNT_BASE; // Reduced mobile count

    const rand = (min, max) => min + Math.random() * (max - min);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      COUNT = isSmall() ? Math.floor(COUNT_BASE * 0.5) : COUNT_BASE;
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: rand(-0.1, 0.1), // Slightly reduced velocity
          vy: rand(-0.1, 0.1),
          r: rand(0.6, 2.0), // Slightly smaller
          a: rand(0.1, 0.3), // Slightly less opaque
        });
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouse.current.nx * 10; // Reduced from 12
      const my = mouse.current.ny * 10;

      for (let p of particles) {
        p.x += p.vx + mx * 0.004; // Reduced influence
        p.y += p.vy + my * 0.004;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(38, 186, 222, ${p.a})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    };

    // Throttled mouse move handler using RAF
    const onMove = rafThrottle((e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.nx = (mouse.current.x / window.innerWidth) * 2 - 1;
      mouse.current.ny = (mouse.current.y / window.innerHeight) * 2 - 1;
      
      // Throttled parallax orbs
      orbsRef.current.forEach((el, i) => {
        if (!el) return;
        const amp = 8 + i * 4; // Reduced from 10 + i * 6
        gsap.to(el, { x: mouse.current.nx * amp, y: mouse.current.ny * amp, duration: 0.8, overwrite: true, ease: "power2.out" });
      });
    });

    window.addEventListener("mousemove", onMove, { passive: true });
    
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        init();
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    resize();
    init();
    step();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", handleResize);
      onMove.cancel();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Animate orbs drifting
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    const orbs = orbsRef.current;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    orbs.forEach((el, i) => {
      if (!el) return;
      const dx = (i % 2 === 0 ? 1 : -1) * (15 + i * 6); // Reduced movement
      const dy = (i % 3 === 0 ? -1 : 1) * (20 + i * 8);
      tl.to(el, { x: `+=${dx}`, y: `+=${dy}`, duration: 16 + i * 3, ease: "sine.inOut" }, 0); // Slower
    });
    return () => tl.kill();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div
        className="absolute inset-0 opacity-[0.06] fx-grid" // Reduced opacity
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(30, 155, 184, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 155, 184, 0.2) 1px, transparent 1px)",
          backgroundSize: "50px 50px, 50px 50px", // Larger grid
          backgroundPosition: "0 0, 0 0",
        }}
      />

      <div className="absolute -top-20 -left-10 w-[26rem] h-[26rem] rounded-full blur-3xl opacity-50" // Reduced size
        ref={(el) => (orbsRef.current[0] = el)}
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(38,186,222,0.3), rgba(255,255,255,0) 60%)", willChange: "transform" }}
      />
      <div className="absolute top-1/3 -right-16 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-40"
        ref={(el) => (orbsRef.current[1] = el)}
        style={{ background: "radial-gradient(circle at 70% 40%, rgba(77,200,232,0.25), rgba(255,255,255,0) 60%)", willChange: "transform" }}
      />
      <div className="absolute bottom-[-6rem] left-1/3 w-[24rem] h-[24rem] rounded-full blur-3xl opacity-40"
        ref={(el) => (orbsRef.current[2] = el)}
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(30,155,184,0.24), rgba(255,255,255,0) 60%)", willChange: "transform" }}
      />

      <svg width="100" height="100" viewBox="0 0 120 120" className="absolute top-24 left-10 opacity-60" // Reduced size
        ref={(el) => (orbsRef.current[3] = el)} style={{ willChange: "transform" }}>
        <rect x="50" y="10" width="20" height="100" rx="10" fill="rgba(38,186,222,0.4)"/>
        <rect x="10" y="50" width="100" height="20" rx="10" fill="rgba(38,186,222,0.4)"/>
      </svg>
      <svg width="100" height="100" viewBox="0 0 120 120" className="absolute bottom-24 right-16 opacity-50"
        ref={(el) => (orbsRef.current[4] = el)} style={{ willChange: "transform" }}>
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(30,155,184,0.3)" strokeWidth="5"/>
        <circle cx="60" cy="60" r="26" fill="none" stroke="rgba(77,200,232,0.3)" strokeWidth="5"/>
      </svg>
    </div>
  );
};

export default BackgroundFX;