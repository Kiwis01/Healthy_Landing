import { useEffect, lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundFX from "@/components/layout/BackgroundFX";
import BackgroundOrgans from "@/components/layout/BackgroundOrgans";
import Hero from "@/components/sections/Hero"; 

// Lazy load non-critical sections
const TaglineSequence = lazy(() => import("@/components/sections/TaglineSequence"));
const IntroPanel = lazy(() => import("@/components/sections/IntroPanel"));
const MRIShowcase = lazy(() => import("@/components/sections/MRIShowcase"));
const Features = lazy(() => import("@/components/sections/Features"));
const Problem = lazy(() => import("@/components/sections/Problem"));
const Vision = lazy(() => import("@/components/sections/Vision"));
const LogoCloud = lazy(() => import("@/components/sections/LogoCloud"));
const Contact = lazy(() => import("@/components/sections/Contact"));
const Pricing = lazy(() => import("@/components/sections/Pricing"));
const About = lazy(() => import("@/components/sections/About"));

const Index = () => {
  // Global smooth scrolling with Lenis + coordinate with ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Keep GSAP's ScrollTrigger in sync
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Anchor navigation using Lenis
    const handleAnchorClick = (e) => {
      const target = e.target;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el, {
        offset: 0,
      });
    };

    document.addEventListener('click', handleAnchorClick);

    // Handle deep-link on initial load
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          lenis.scrollTo(el, { offset: 0 });
        }, 100);
      }
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  // Add reveal animations on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Target elements with data-animate attribute
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => {
      el.classList.remove('animate-fade-in');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundFX />
      <BackgroundOrgans />
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Suspense fallback={<div className="min-h-screen" />}>
          <TaglineSequence />
          <MRIShowcase />
          <Problem />
          <Features />
          <Vision />
          <LogoCloud />
          <Pricing />
          {/* Commented out for a more focused, minimalistic experience */}
          {/* <IntroPanel /> */}
          {/* <About /> */}
          <Contact />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index; 