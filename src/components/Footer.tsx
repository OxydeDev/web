import React from 'react';
import { Heart, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-pink-200">Hope's Services</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Custom Discord art made with care. Professional commissions with quick turnaround and affordable pricing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-200">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/gallery" className="text-gray-300 hover:text-pink-200 transition-colors duration-200">Gallery</a></li>
              <li><a href="/commission" className="text-gray-300 hover:text-pink-200 transition-colors duration-200">Request Commission</a></li>
              <li><a href="/pricing" className="text-gray-300 hover:text-pink-200 transition-colors duration-200">Pricing</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-pink-200 transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-200">Follow Me</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-pink-200 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-200 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Hope's Services. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-2 sm:mt-0">
            Made with <Heart className="h-4 w-4 text-pink-200 mx-1" /> for the Discord community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;