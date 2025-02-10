
import { Mail, FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Find Stores", path: "/stores" },
    { name: "Compare Prices", path: "/compare" },
    { name: "Search Medicines", path: "/search" },
    { name: "Contact", path: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy", icon: Shield },
    { name: "Terms of Use", path: "/terms", icon: FileText },
    { name: "Refund & Cancellation Policy", path: "/refund", icon: FileText },
  ];

  return (
    <footer className="bg-[#1A1F2C] text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">Genmeds</span>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted partner in finding affordable generic medicines across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={index}>
                    <Link 
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">GET IN TOUCH</h3>
            <div className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
              <a href="mailto:support@genmeds.in">support@genmeds.in</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-400 text-sm">
            Copyright © {new Date().getFullYear()} Genmeds Technologies Pvt Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
