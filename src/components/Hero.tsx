import React from 'react';
import { ArrowRight, Play, Users, Award, Target } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-emerald-50 via-white to-emerald-50 min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content */}
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Transform Your Body with
              <span className="text-emerald-600 block">Smart Nutrition</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Discover the perfect balance of fitness and nutrition. Our comprehensive database 
              helps you make informed decisions about your health journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-emerald-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2">
                <Play className="h-5 w-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-8 w-8 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-8 w-8 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">1M+</div>
                <div className="text-sm text-gray-600">Meals Tracked</div>
              </div>
            </div>
          </div>

          {/* Visual with Fruit Images */}
          <div className="relative">
            {/* Floating Fruit Images */}
            <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full overflow-hidden shadow-lg animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
              <img 
                src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                alt="Apple" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -top-4 -right-12 w-14 h-14 rounded-full overflow-hidden shadow-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '3.5s' }}>
              <img 
                src="https://images.pexels.com/photos/1414130/pexels-photo-1414130.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                alt="Orange" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute top-1/4 -left-12 w-12 h-12 rounded-full overflow-hidden shadow-lg animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}>
              <img 
                src="https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                alt="Banana" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute top-1/3 -right-8 w-10 h-10 rounded-full overflow-hidden shadow-lg animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.2s' }}>
              <img 
                src="https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                alt="Berries" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute bottom-1/4 -left-6 w-14 h-14 rounded-full overflow-hidden shadow-lg animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.8s' }}>
              <img 
                src="https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                alt="Avocado" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -bottom-4 -right-6 w-12 h-12 rounded-full overflow-hidden shadow-lg animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '3.3s' }}>
              <img 
                src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                alt="Kiwi" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Main Nutrition Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                <span className="animate-pulse">✨</span>
                Premium
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Daily Nutrition Goal
                </h3>
                
                {/* Progress Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 flex items-center gap-1">
                        <span className="text-emerald-500">🥩</span>
                        Protein
                      </span>
                      <span className="text-gray-900 font-medium">120g / 150g</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full w-4/5 transition-all duration-500 shadow-sm"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 flex items-center gap-1">
                        <span className="text-blue-500">🌾</span>
                        Carbs
                      </span>
                      <span className="text-gray-900 font-medium">180g / 200g</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full w-5/6 transition-all duration-500 shadow-sm"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 flex items-center gap-1">
                        <span className="text-orange-500">🥑</span>
                        Fat
                      </span>
                      <span className="text-gray-900 font-medium">55g / 70g</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full w-3/4 transition-all duration-500 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-4 border-t border-gray-200">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  1,847
                </div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <span className="text-red-500">🔥</span>
                  Calories consumed
                </div>
              </div>

              {/* Floating Achievement Badge */}
              <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg transform rotate-12 animate-pulse">
                80% Complete! 🎉
              </div>
            </div>

            {/* Additional Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full opacity-20 -z-10 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;