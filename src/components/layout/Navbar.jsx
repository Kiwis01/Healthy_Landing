import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoUrl from "@/components/resources/logo/logo.svg";
import { throttle } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 10);
    }, 100); // Throttle to 100ms

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <a href="#hero">
              <img src={logoUrl} alt="Healthy Logo" className="navbar-logo h-14 w-auto" />
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-healthy-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="#contact">
              <Button className="bg-healthy-primary hover:bg-healthy-secondary text-white">
                Request a Demo
              </Button>
            </a>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-healthy-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-gray-700 hover:text-healthy-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4">
                <a href="#contact" className="block">
                  <Button className="w-full bg-healthy-primary hover:bg-healthy-secondary text-white">
                    Request a Demo
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;