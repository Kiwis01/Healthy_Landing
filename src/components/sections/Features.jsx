import { Brain, Heart, Activity, Users, Shield, Zap, BarChart, Target } from "lucide-react";
import FeatureCard from "../ui/FeatureCard";

const Features = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Insights",
      description: "Advanced artificial intelligence provides accurate medical diagnosis and treatment recommendations based on comprehensive data analysis."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy & Security",
      description: "Your medical data is protected with enterprise-grade security."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Automatic Segmentation",
      description: "AI-powered image segmentation automatically identifies and analyzes anatomical structures in medical scans with precision."
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Volume Rendering with AI",
      description: "Advanced 3D volume rendering technology enhanced with AI for detailed visualization of complex medical structures."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Analytics",
      description: "Instant processing and analysis of medical data with real-time insights for faster diagnosis and treatment decisions."
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Fast Service",
      description: "Lightning-fast processing times ensure quick diagnosis results, reducing wait times for patients and healthcare providers."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Cross-platform",
      description: "Seamless integration across all devices and platforms, accessible from desktop, tablet, and mobile devices."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Data Treatment",
      description: "Comprehensive data processing and treatment algorithms ensure accurate analysis and reliable diagnostic results."
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="features">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-healthy-primary/10 text-healthy-primary text-sm font-medium mb-4">
            Powerful Features
          </div>
          <h2 className="heading-lg mb-4">Advanced AI Medical Diagnosis Features</h2>
          <p className="text-gray-600 text-lg">
            Our cutting-edge AI platform combines advanced medical imaging technology with artificial intelligence 
            to provide accurate, fast, and reliable diagnostic solutions for healthcare professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 