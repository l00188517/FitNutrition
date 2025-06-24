import React from 'react';
import { Dumbbell, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">FitNutrition</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200">
              Home
            </a>
            <a href="#nutrition" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200">
              Nutrition
            </a>
            <a href="#workouts" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200">
              Workouts
            </a>
            <a href="#about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200">
              About
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200">
                Home
              </a>
              <a href="#nutrition" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200">
                Nutrition
              </a>
              <a href="#workouts" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200">
                Workouts
              </a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200">
                About
              </a>
              <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200 w-full">
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;