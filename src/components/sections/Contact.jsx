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
    <section className="py-20 bg-white" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">See the Future of Clinical Practice.</h2>
          <p className="text-gray-600 text-lg">
            We are currently onboarding innovative clinics and forward-thinking specialists. If you are ready to move beyond the limitations of legacy systems and pioneer the next generation of patient care, let's connect.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="heading-md mb-6 text-center">Request Early Access</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="workEmail"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-healthy-primary focus:border-transparent"
                    placeholder="you@clinic.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                    Clinic/Organization Name
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-healthy-primary focus:border-transparent"
                    placeholder="Healthy Clinic"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <input
                    type="text"
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-healthy-primary focus:border-transparent"
                    placeholder="Radiology, Oncology, Cardiology, etc."
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-healthy-primary hover:bg-healthy-secondary text-white py-3"
              >
                <Send className="h-4 w-4 mr-2" />
                Request Early Access
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-healthy-primary/10 rounded-lg">
                <div className="text-healthy-primary">
                  <Mail className="h-6 w-6" />
                </div>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Email</h4>
                <p className="text-gray-600">healthymx.contact@gmail.com</p>
                <p className="text-gray-500 text-sm">We'll respond within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact); 