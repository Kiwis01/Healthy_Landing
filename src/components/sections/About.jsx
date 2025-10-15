import { CheckCircle, Users, Award, Globe, Play, Pause, MessageSquare, Brain, Shield, Zap, Eye, Bot, BarChart3, Lightbulb } from "lucide-react";
import { useState, useRef } from "react";

const About = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("diagnosis-platform");
  const videoRef = useRef(null);



  const tabs = [
    {
      id: "diagnosis-platform",
      label: "Diagnosis Platform",
      icon: <Brain className="h-4 w-4" />,
      video: {
        title: "AI Medical Diagnosis Platform",
        description: "Advanced AI-powered medical diagnosis with real-time analysis and reporting",
        src: "/videos/optimizado/healthy-ingles.mp4",
        thumbnail: "https://via.placeholder.com/400x225/26bade/ffffff?text=Diagnosis+Platform"
      }
    },
    {
      id: "vr-ar",
      label: "VR/AR",
      icon: <Eye className="h-4 w-4" />,
      video: {
        title: "VR & AR Medical Diagnosis",
        description: "3D reconstruction of the patient's body being used to diagnose the patient",
        src: "/videos/optimizado/enactus-presentation.mp4",
        thumbnail: "https://via.placeholder.com/400x225/26bade/ffffff?text=VR+AR+Medical"
      }
    },
    {
      id: "ai-bot",
      label: "AI BOT",
      icon: <Bot className="h-4 w-4" />,
      video: {
        title: "AI Medical Assistant Bot",
        description: "Intelligent medical assistant providing 24/7 support and guidance",
        src: "/videos/optimizado/healthy-bot-2.mp4",
        thumbnail: "https://via.placeholder.com/400x225/26bade/ffffff?text=AI+Medical+Bot"
      }
    },
    {
      id: "data-analytics",
      label: "Data Analytics",
      icon: <BarChart3 className="h-4 w-4" />,
      video: {
        title: "Medical Data Analytics Platform",
        description: "Comprehensive data analysis and insights for healthcare optimization",
        src: "/videos/optimizado/data-analytics.png",
        thumbnail: "/videos/optimizado/data-analytics.png",
        isImage: true
      }
    },
    {
      id: "ai-insights",
      label: "AI Insights",
      icon: <Lightbulb className="h-4 w-4" />,
      video: {
        title: "AI-Powered Medical Insights",
        description: "Deep learning insights for predictive medicine and personalized care",
        src: "/videos/optimizado/ai-video-healthy.mp4",
        thumbnail: "https://via.placeholder.com/400x225/26bade/ffffff?text=AI+Insights"
      }
    }
  ];



  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];

  // Reset video when tab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsPlaying(false);
    const newTabData = tabs.find(tab => tab.id === tabId);
    
    if (videoRef.current && !newTabData.video.isImage) {
      videoRef.current.load();
      videoRef.current.currentTime = 0; // Reset to beginning
      // Auto-play the video after a short delay to ensure it's loaded
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch((error) => {
            console.log('Auto-play prevented by browser:', error);
          });
        }
      }, 100);
    }
  };

  const handleVideoChange = (index) => {
    setActiveVideo(index);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.load();
      // Auto-play the video after loading
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch((error) => {
            console.log('Auto-play prevented by browser:', error);
          });
        }
      }, 100);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="about">
      {/* Floating Bubble Animations */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-healthy-primary/10 rounded-full animate-float"></div>
      <div className="absolute top-40 left-20 w-24 h-24 bg-healthy-secondary/10 rounded-full animate-float animation-delay-200"></div>
      <div className="absolute bottom-40 right-40 w-28 h-28 bg-healthy-accent/10 rounded-full animate-float animation-delay-400"></div>
      <div className="absolute bottom-20 left-40 w-20 h-20 bg-healthy-primary/15 rounded-full animate-float animation-delay-600"></div>
      <div className="absolute top-60 right-60 w-16 h-16 bg-healthy-secondary/10 rounded-full animate-float animation-delay-800"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-healthy-primary/10 text-healthy-primary text-sm font-medium mb-4">
            Technical Design
          </div>
          <h2 className="heading-lg mb-4">Advanced Medical AI Architecture</h2>
          <p className="text-gray-600 text-lg">
            Our cutting-edge AI platform combines advanced medical imaging technology with artificial intelligence 
            to provide accurate, fast, and reliable diagnostic solutions for healthcare professionals.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Content Header */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTabData.video.title}
              </h3>
              <p className="text-gray-600">
                {activeTabData.video.description}
              </p>
            </div>

            {/* Video/Image Section */}
            <div className="p-6">
              <div className="relative max-w-4xl mx-auto">
                {activeTabData.video.isImage ? (
                  // Render image for data analytics
                  <img
                    src={activeTabData.video.src}
                    alt={activeTabData.video.title}
                    className="w-full h-96 object-contain rounded-lg bg-gray-50"
                  />
                ) : (
                  // Render video for other tabs
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-96 object-contain rounded-lg brightness-110 bg-gray-900"
                      poster={activeTabData.video.thumbnail}
                      muted
                      preload="metadata"
                      playsInline
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                      onLoadedData={() => {
                        // Auto-play when video is loaded
                        if (videoRef.current && !isPlaying) {
                          videoRef.current.play().then(() => {
                            setIsPlaying(true);
                          }).catch((error) => {
                            console.log('Auto-play prevented by browser:', error);
                          });
                        }
                      }}
                    >
                      <source src={activeTabData.video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Play/Pause Overlay */}
                    <button
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors rounded-lg"
                    >
                      {!isPlaying && (
                        <div className="bg-white/90 p-4 rounded-full">
                          <Play className="h-8 w-8 text-healthy-primary" fill="currentColor" />
                        </div>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default About; 