import React from 'react';
import { Dumbbell, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">FitNutrition</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your complete fitness and nutrition companion. Transform your health with 
              science-backed workouts and comprehensive nutritional guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-emerald-500 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-emerald-500 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-emerald-500 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-emerald-500 transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#nutrition" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Nutrition Database
                </a>
              </li>
              <li>
                <a href="#workouts" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Workouts
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">support@fitnutrition.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">123 Fitness St, Health City, HC 12345</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-emerald-500 text-white placeholder-gray-400"
                />
                <button className="bg-emerald-500 px-4 py-2 rounded-r-lg hover:bg-emerald-600 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 FitNutrition. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;