import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BackgroundVideo = ({ src, showOn = ["#taglines", "#apple-panels"] }) => {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(wrap, { autoAlpha: 0 });

      const triggers = showOn.map((sel) =>
        ScrollTrigger.create({
          trigger: sel,
          start: "top 75%",
          end: "bottom 25%",
          onEnter: () => gsap.to(wrap, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }),
          onEnterBack: () => gsap.to(wrap, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }),
          onLeave: () => gsap.to(wrap, { autoAlpha: 0, duration: 0.5, ease: "power1.out" }),
          onLeaveBack: () => gsap.to(wrap, { autoAlpha: 0, duration: 0.5, ease: "power1.out" }),
        })
      );

      // Attempt to play on mount (muted inline)
      const tryPlay = () => {
        video.play().catch(() => {});
      };
      tryPlay();

      return () => {
        triggers.forEach((t) => t.kill());
      };
    });

    return () => ctx.revert();
  }, [showOn]);

  return (
    <div ref={wrapRef} className="fixed inset-0 -z-20 pointer-events-none">
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_60%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
};

export default BackgroundVideo;
