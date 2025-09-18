import { useEffect, useRef } from "react";
import gsap from "gsap";

const BackgroundFX = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const orbsRef = useRef([]);
  const mouse = useRef({ x: 0, y: 0, nx: 0, ny: 0 });

  // Canvas particles
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // skip heavy animations

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let rafId = 0;

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;

    const particles = [];
    const isSmall = () => window.innerWidth < 768;
    const COUNT_BASE = 60; // keep it light
    let COUNT = isSmall() ? Math.floor(COUNT_BASE * 0.6) : COUNT_BASE;

    const rand = (min, max) => min + Math.random() * (max - min);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      COUNT = isSmall() ? Math.floor(COUNT_BASE * 0.6) : COUNT_BASE;
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: rand(-0.12, 0.12),
          vy: rand(-0.12, 0.12),
          r: rand(0.6, 2.2),
          a: rand(0.1, 0.35),
        });
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      // subtle parallax vector from mouse
      const mx = mouse.current.nx * 12;
      const my = mouse.current.ny * 12;

      for (let p of particles) {
        p.x += p.vx + mx * 0.005;
        p.y += p.vy + my * 0.005;

        // wrap around
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(38, 186, 222, ${p.a})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    };

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.nx = (mouse.current.x / window.innerWidth) * 2 - 1;
      mouse.current.ny = (mouse.current.y / window.innerHeight) * 2 - 1;
      // parallax orbs
      orbsRef.current.forEach((el, i) => {
        if (!el) return;
        const amp = 10 + i * 6; // different amplitudes
        gsap.to(el, { x: mouse.current.nx * amp, y: mouse.current.ny * amp, duration: 0.6, overwrite: true });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", () => { resize(); init(); });

    resize();
    init();
    step();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Animate orbs drifting
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // skip heavy animations
    const orbs = orbsRef.current;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    orbs.forEach((el, i) => {
      if (!el) return;
      const dx = (i % 2 === 0 ? 1 : -1) * (20 + i * 8);
      const dy = (i % 3 === 0 ? -1 : 1) * (30 + i * 10);
      tl.to(el, { x: `+=${dx}`, y: `+=${dy}`, duration: 14 + i * 3, ease: "sine.inOut" }, 0);
    });
    return () => tl.kill();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none">
      {/* canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* subtle grid overlay (can be disabled with html[data-no-grid='1']) */}
      <div
        className="absolute inset-0 opacity-[0.08] fx-grid"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(30, 155, 184, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 155, 184, 0.25) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 40px 40px",
          backgroundPosition: "0 0, 0 0",
        }}
      />

      {/* gradient orbs (placeholders) */}
      <div className="absolute -top-20 -left-10 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-60"
        ref={(el) => (orbsRef.current[0] = el)}
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(38,186,222,0.35), rgba(255,255,255,0) 60%)" }}
      />
      <div className="absolute top-1/3 -right-16 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-50"
        ref={(el) => (orbsRef.current[1] = el)}
        style={{ background: "radial-gradient(circle at 70% 40%, rgba(77,200,232,0.30), rgba(255,255,255,0) 60%)" }}
      />
      <div className="absolute bottom-[-6rem] left-1/3 w-[26rem] h-[26rem] rounded-full blur-3xl opacity-50"
        ref={(el) => (orbsRef.current[2] = el)}
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(30,155,184,0.28), rgba(255,255,255,0) 60%)" }}
      />

      {/* placeholder medical-themed shapes */}
      <svg width="120" height="120" viewBox="0 0 120 120" className="absolute top-24 left-10 opacity-70"
        ref={(el) => (orbsRef.current[3] = el)}>
        <rect x="50" y="10" width="20" height="100" rx="10" fill="rgba(38,186,222,0.45)"/>
        <rect x="10" y="50" width="100" height="20" rx="10" fill="rgba(38,186,222,0.45)"/>
      </svg>
      <svg width="120" height="120" viewBox="0 0 120 120" className="absolute bottom-24 right-16 opacity-60"
        ref={(el) => (orbsRef.current[4] = el)}>
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(30,155,184,0.35)" strokeWidth="6"/>
        <circle cx="60" cy="60" r="26" fill="none" stroke="rgba(77,200,232,0.35)" strokeWidth="6"/>
      </svg>
    </div>
  );
};

export default BackgroundFX;
