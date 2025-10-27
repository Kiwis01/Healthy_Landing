import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LogoCloud = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const logosRef = useRef([]);

  // Replace these with your actual partner/validation logos
  const partners = [
    { name: "Partner 1", logo: "/images/MIT_logo.svg" },
    { name: "Partner 2", logo: "/images/enactus_logo.png" },
    { name: "Partner 3", logo: "/images/ford_logo.png" },
    { name: "Partner 4", logo: "/images/unesco_logo.png" },
    { name: "Partner 5", logo: "/images/logo5.png" },
    { name: "Partner 6", logo: "/images/logo6.png" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 95%",
            once: true,
          },
        });
      }

      gsap.from(logosRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 bg-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-full max-w-4xl rounded-full bg-healthy-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Trusted & Validated By
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 max-w-6xl mx-auto items-center">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              ref={(el) => (logosRef.current[idx] = el)}
              className="group flex items-center justify-center"
            >
              {/* Placeholder for logo - replace with actual img tags */}
              <div className="relative w-full aspect-[3/2] flex items-center justify-center">
                {/* Temporary placeholder - replace with: */}
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Optional subtle divider line */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default memo(LogoCloud);
