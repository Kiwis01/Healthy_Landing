import { ArrowDown, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20" id="hero">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30 z-0"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-healthy-primary/10 rounded-full filter blur-3xl z-0 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-healthy-secondary/10 rounded-full filter blur-3xl z-0 animate-pulse-slow animation-delay-400"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div 
            className="inline-block px-3 py-1 mb-6 rounded-full bg-healthy-primary/10 text-healthy-primary text-sm font-medium animate-fade-down opacity-0"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            Transform Your Health Journey
          </div>

          <h1 
            className="heading-xl mb-6 animate-fade-down opacity-0"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            Meet <span className="text-gradient font-bold">Healthy</span>,<br />
            Your AI Medical Software
          </h1>

          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 animate-fade-down opacity-0"
            style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
          >
            An AI-powered, collaborative, patient-centered imaging platform that works anywhere, no high-end hardware required.
          </p>

          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-down opacity-0"
            style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
          >
            <button 
              className="bg-healthy-primary hover:bg-healthy-secondary text-white px-8 py-6 rounded-lg font-medium transition-colors"
              onClick={() => {
                const subject = "Get Started with Healthy - AI Integration Inquiry";
                const body = `Hello Healthy Team,

I'm interested in integrating your AI medical services into my practice. 

Please provide me with more information about:
- Available AI services and pricing
- How to get started with the pay-as-you-go model
- Implementation timeline and support

Thank you!

Best regards,
[Your Name]`;
                
                const mailtoLink = `mailto:healthymx.contact@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.open(mailtoLink);
              }}
            >
              Get Started
            </button>
          </div>

          {/* Stats */}
          
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20 pointer-events-auto">
        <a href="#features" aria-label="Scroll to features" className="block p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </a>
      </div>
    </section>
  );
};

export default Hero; 