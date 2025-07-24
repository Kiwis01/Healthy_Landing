import { Brain, Eye, Bot, BarChart3, Lightbulb, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Medical Diagnosis",
      description: "Advanced AI-powered medical diagnosis with real-time analysis and comprehensive reporting.",
      features: ["Real-time analysis", "Multi-modal imaging", "Instant reports", "Expert validation"],
      pricing: "Pay per analysis"
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "VR/AR Medical Imaging",
      description: "3D reconstruction and immersive visualization for enhanced medical diagnosis.",
      features: ["3D body reconstruction", "Immersive visualization", "Interactive diagnosis", "Spatial analysis"],
      pricing: "Pay per session"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Medical Assistant",
      description: "Intelligent medical assistant providing 24/7 support and clinical guidance.",
      features: ["24/7 availability", "Clinical guidance", "Patient triage", "Medical queries"],
      pricing: "Pay per interaction"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Medical Data Analytics",
      description: "Comprehensive data analysis and insights for healthcare optimization.",
      features: ["Predictive modeling", "Trend analysis", "Custom reports", "API integration"],
      pricing: "Pay per query"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "AI Medical Insights",
      description: "Deep learning insights for predictive medicine and personalized care recommendations.",
      features: ["Predictive medicine", "Personalized care", "Risk assessment", "Treatment optimization"],
      pricing: "Pay per insight"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Solutions",
      description: "Custom AI solutions for hospitals, clinics, and healthcare organizations.",
      features: ["Custom integration", "White-label options", "Dedicated support", "SLA guarantees"],
      pricing: "Custom pricing"
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-healthy-primary/10 text-healthy-primary text-sm font-medium mb-4">
            Our Services
          </div>
          <h2 className="heading-lg mb-4">AI-Powered Medical Solutions</h2>
          <p className="text-gray-600 text-lg">
            Pay-as-you-go AI services for healthcare professionals. Only pay for what you use, 
            with transparent pricing and enterprise-grade reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-healthy-primary/20 p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-healthy-primary/10 rounded-xl mb-6">
                <div className="text-healthy-primary">
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-healthy-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-healthy-primary">
                  {service.pricing}
                </span>
                <Button 
                  variant="outline" 
                  className="border-healthy-primary text-healthy-primary hover:bg-healthy-primary hover:text-white"
                  onClick={() => {
                    const mailtoLink = `mailto:healthymx.contact@gmail.com?subject=${encodeURIComponent(`Quote Request - ${service.title}`)}&body=${encodeURIComponent(`Hello,\n\nI'm interested in getting a quote for your ${service.title} service.\n\nPlease provide more information about pricing and implementation.\n\nBest regards,`)}`;
                    window.location.href = mailtoLink;
                  }}
                >
                  Quote Your Plan
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="heading-md mb-4">Ready to Integrate AI into Your Practice?</h3>
            <p className="text-gray-600 mb-6">
              Get started with our pay-as-you-go model. No upfront costs, no long-term commitments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-healthy-primary hover:bg-healthy-secondary text-white px-8 py-3"
                onClick={() => {
                  const mailtoLink = `mailto:healthymx.contact@gmail.com?subject=${encodeURIComponent('Schedule a Meeting - AI Integration')}&body=${encodeURIComponent(`Hello,\n\nI would like to schedule a meeting to discuss AI integration for my practice.\n\nPlease let me know your availability.\n\nBest regards,`)}`;
                  window.location.href = mailtoLink;
                }}
              >
                Schedule a Meeting
              </Button>
              <Button 
                variant="outline" 
                className="border-healthy-primary text-healthy-primary hover:bg-healthy-primary hover:text-white px-8 py-3"
                onClick={() => {
                  const mailtoLink = `mailto:healthymx.contact@gmail.com?subject=${encodeURIComponent('Custom Quote Request')}&body=${encodeURIComponent(`Hello,\n\nI'm interested in getting a custom quote for your AI services.\n\nPlease provide detailed pricing information for my specific needs.\n\nBest regards,`)}`;
                  window.location.href = mailtoLink;
                }}
              >
                Request Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 