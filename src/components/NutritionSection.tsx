import React, { useState, useMemo } from 'react';
import { Search, Filter, Calculator, Info } from 'lucide-react';
import { nutritionData, categories, NutritionItem } from '../data/nutrition';

// Daily recommended values (approximate for average adult)
const DAILY_VALUES = {
  calories: 2000,
  protein: 50, // grams
  carbs: 300, // grams
  fat: 65, // grams
  fiber: 25, // grams
  sugar: 50, // grams (max recommended)
};

interface CircularProgressProps {
  percentage: number;
  size: number;
  strokeWidth: number;
  color: string;
  label: string;
  value: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size,
  strokeWidth,
  color,
  label,
  value
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs font-bold text-gray-900">{Math.round(percentage)}%</div>
          </div>
        </div>
      </div>
      <div className="mt-1 text-center">
        <div className="text-xs font-medium text-gray-900">{label}</div>
        <div className="text-xs text-gray-600">{value}</div>
      </div>
    </div>
  );
};

const NutritionSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedFood, setSelectedFood] = useState<NutritionItem | null>(null);
  const [servingSize, setServingSize] = useState(100);

  const filteredData = useMemo(() => {
    return nutritionData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const calculateNutrition = (item: NutritionItem, serving: number) => {
    const factor = serving / 100;
    return {
      calories: Math.round(item.calories * factor),
      protein: Math.round(item.protein * factor * 10) / 10,
      carbs: Math.round(item.carbs * factor * 10) / 10,
      fat: Math.round(item.fat * factor * 10) / 10,
      fiber: Math.round(item.fiber * factor * 10) / 10,
      sugar: Math.round(item.sugar * factor * 10) / 10,
    };
  };

  const getPercentageOfDailyValue = (nutrient: keyof typeof DAILY_VALUES, value: number) => {
    return Math.min((value / DAILY_VALUES[nutrient]) * 100, 100);
  };

  const getNutrientColor = (nutrient: string) => {
    switch (nutrient) {
      case 'calories': return '#ef4444'; // red
      case 'protein': return '#10b981'; // emerald
      case 'carbs': return '#3b82f6'; // blue
      case 'fat': return '#f59e0b'; // amber
      case 'fiber': return '#8b5cf6'; // violet
      case 'sugar': return '#ec4899'; // pink
      default: return '#6b7280'; // gray
    }
  };

  return (
    <section id="nutrition" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nutrition Database
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive nutrition database to make informed decisions about your diet. 
            Find detailed nutritional information for hundreds of foods with visual daily value indicators.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for foods..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white min-w-40"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Food Grid - Updated to show 3 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-1"
              onClick={() => {
                setSelectedFood(item);
                setShowCalculator(true);
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <span className="text-sm bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{item.calories}</div>
                  <div className="text-sm text-gray-600">calories</div>
                </div>
              </div>

              {/* Circular Progress Indicators */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <CircularProgress
                  percentage={getPercentageOfDailyValue('protein', item.protein)}
                  size={60}
                  strokeWidth={4}
                  color={getNutrientColor('protein')}
                  label="Protein"
                  value={`${item.protein}g`}
                />
                <CircularProgress
                  percentage={getPercentageOfDailyValue('carbs', item.carbs)}
                  size={60}
                  strokeWidth={4}
                  color={getNutrientColor('carbs')}
                  label="Carbs"
                  value={`${item.carbs}g`}
                />
                <CircularProgress
                  percentage={getPercentageOfDailyValue('fat', item.fat)}
                  size={60}
                  strokeWidth={4}
                  color={getNutrientColor('fat')}
                  label="Fat"
                  value={`${item.fat}g`}
                />
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fiber</span>
                  <span className="font-medium">{item.fiber}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sugar</span>
                  <span className="font-medium">{item.sugar}g</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-500">
                  <Info className="h-4 w-4 mr-1" />
                  Per 100g serving • % of daily values shown
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calculator Modal */}
        {showCalculator && selectedFood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-emerald-500" />
                  Nutrition Calculator
                </h3>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{selectedFood.name}</h4>
                <div className="flex items-center gap-2 mb-4">
                  <label className="text-gray-600">Serving size:</label>
                  <input
                    type="number"
                    value={servingSize}
                    onChange={(e) => setServingSize(Number(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-2 w-24 text-center"
                    min="1"
                  />
                  <span className="text-gray-600">grams</span>
                </div>
              </div>

              {/* Circular Progress for Calculator */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {(() => {
                  const nutrition = calculateNutrition(selectedFood, servingSize);
                  return (
                    <>
                      <CircularProgress
                        percentage={getPercentageOfDailyValue('calories', nutrition.calories)}
                        size={80}
                        strokeWidth={6}
                        color={getNutrientColor('calories')}
                        label="Calories"
                        value={`${nutrition.calories}`}
                      />
                      <CircularProgress
                        percentage={getPercentageOfDailyValue('protein', nutrition.protein)}
                        size={80}
                        strokeWidth={6}
                        color={getNutrientColor('protein')}
                        label="Protein"
                        value={`${nutrition.protein}g`}
                      />
                      <CircularProgress
                        percentage={getPercentageOfDailyValue('carbs', nutrition.carbs)}
                        size={80}
                        strokeWidth={6}
                        color={getNutrientColor('carbs')}
                        label="Carbs"
                        value={`${nutrition.carbs}g`}
                      />
                      <CircularProgress
                        percentage={getPercentageOfDailyValue('fat', nutrition.fat)}
                        size={80}
                        strokeWidth={6}
                        color={getNutrientColor('fat')}
                        label="Fat"
                        value={`${nutrition.fat}g`}
                      />
                    </>
                  );
                })()}
              </div>

              {/* Additional Details */}
              <div className="space-y-3 mb-6">
                {(() => {
                  const nutrition = calculateNutrition(selectedFood, servingSize);
                  return (
                    <>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Fiber</span>
                        <div className="text-right">
                          <span className="font-medium">{nutrition.fiber}g</span>
                          <div className="text-xs text-gray-500">
                            {Math.round(getPercentageOfDailyValue('fiber', nutrition.fiber))}% DV
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Sugar</span>
                        <div className="text-right">
                          <span className="font-medium">{nutrition.sugar}g</span>
                          <div className="text-xs text-gray-500">
                            {Math.round(getPercentageOfDailyValue('sugar', nutrition.sugar))}% DV
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>

              <button
                onClick={() => setShowCalculator(false)}
                className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NutritionSection;