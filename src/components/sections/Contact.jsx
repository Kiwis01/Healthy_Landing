import { useState, memo } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [formData, setFormData] = useState({
    workEmail: "",
    organization: "",
    specialty: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create mailto link with form data
    const subject = `Request Early Access`;
    const body = `Work Email: ${formData.workEmail}\nClinic/Organization: ${formData.organization}\nSpecialty: ${formData.specialty}`;
    const mailtoLink = `mailto:healthymx.contact@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({ workEmail: "", organization: "", specialty: "" });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["healthymx.contact@gmail.com"],
      description: "We'll respond within 24 hours"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-2 rounded-full bg-healthy-primary/10 text-healthy-primary text-sm font-semibold mb-6">
            Get Started
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Contact Us
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            Join innovative clinics pioneering the next generation of patient care.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="workEmail" className="block text-sm font-semibold text-gray-900 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="workEmail"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthy-primary focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    placeholder="you@clinic.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-semibold text-gray-900 mb-2">
                    Organization *
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthy-primary focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    placeholder="Healthy Clinic"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="specialty" className="block text-sm font-semibold text-gray-900 mb-2">
                    Specialty *
                  </label>
                  <input
                    type="text"
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthy-primary focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    placeholder="Radiology, Oncology, etc."
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-healthy-primary hover:bg-healthy-secondary text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                <Send className="h-5 w-5 mr-2" />
                Request Early Access
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-full">
              <Mail className="h-5 w-5 text-healthy-primary" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">healthymx.contact@gmail.com</p>
                <p className="text-xs text-gray-500">Response within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact); 