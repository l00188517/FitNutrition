import React, { useState, useEffect } from 'react';
import { Plus, Minus, Target, Trash2, ChefHat, Clock, Calculator, AlertTriangle, TrendingUp, Trophy, Star, Zap, Award, Crown, Flame, Shield } from 'lucide-react';
import { nutritionData, NutritionItem } from '../data/nutrition';

interface MealItem {
  id: string;
  food: NutritionItem;
  servingSize: number;
}

interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UserStats {
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  totalMealsLogged: number;
  perfectDays: number;
}

// Daily recommended values
const DAILY_TARGETS = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fat: 65,
  fiber: 25,
  sugar: 50,
};

const MealPlannerSection: React.FC = () => {
  const [selectedMeals, setSelectedMeals] = useState<MealItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFoodSelector, setShowFoodSelector] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    streak: 7,
    totalMealsLogged: 156,
    perfectDays: 23
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_meal',
      title: 'First Steps',
      description: 'Log your first meal',
      icon: <ChefHat className="h-6 w-6" />,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      rarity: 'common'
    },
    {
      id: 'protein_master',
      title: 'Protein Master',
      description: 'Hit your protein goal 5 days in a row',
      icon: <Trophy className="h-6 w-6" />,
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      rarity: 'rare'
    },
    {
      id: 'balanced_warrior',
      title: 'Balanced Warrior',
      description: 'Achieve perfect macro balance',
      icon: <Shield className="h-6 w-6" />,
      unlocked: false,
      progress: 2,
      maxProgress: 3,
      rarity: 'epic'
    },
    {
      id: 'streak_legend',
      title: 'Streak Legend',
      description: 'Maintain a 30-day logging streak',
      icon: <Flame className="h-6 w-6" />,
      unlocked: false,
      progress: 7,
      maxProgress: 30,
      rarity: 'legendary'
    },
    {
      id: 'nutrition_guru',
      title: 'Nutrition Guru',
      description: 'Reach level 25',
      icon: <Crown className="h-6 w-6" />,
      unlocked: false,
      progress: 12,
      maxProgress: 25,
      rarity: 'legendary'
    }
  ]);

  const filteredFoods = nutritionData.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addFood = (food: NutritionItem) => {
    const newMeal: MealItem = {
      id: `${food.id}-${Date.now()}`,
      food,
      servingSize: 100,
    };
    setSelectedMeals([...selectedMeals, newMeal]);
    setShowFoodSelector(false);
    setSearchTerm('');
    
    // Award XP for adding food
    awardXP(10);
  };

  const updateServingSize = (mealId: string, newSize: number) => {
    setSelectedMeals(meals =>
      meals.map(meal =>
        meal.id === mealId ? { ...meal, servingSize: Math.max(1, newSize) } : meal
      )
    );
  };

  const removeMeal = (mealId: string) => {
    setSelectedMeals(meals => meals.filter(meal => meal.id !== mealId));
  };

  const calculateNutrition = (food: NutritionItem, servingSize: number): NutritionTotals => {
    const factor = servingSize / 100;
    return {
      calories: Math.round(food.calories * factor),
      protein: Math.round(food.protein * factor * 10) / 10,
      carbs: Math.round(food.carbs * factor * 10) / 10,
      fat: Math.round(food.fat * factor * 10) / 10,
      fiber: Math.round(food.fiber * factor * 10) / 10,
      sugar: Math.round(food.sugar * factor * 10) / 10,
    };
  };

  const getTotalNutrition = (): NutritionTotals => {
    return selectedMeals.reduce(
      (totals, meal) => {
        const nutrition = calculateNutrition(meal.food, meal.servingSize);
        return {
          calories: totals.calories + nutrition.calories,
          protein: Math.round((totals.protein + nutrition.protein) * 10) / 10,
          carbs: Math.round((totals.carbs + nutrition.carbs) * 10) / 10,
          fat: Math.round((totals.fat + nutrition.fat) * 10) / 10,
          fiber: Math.round((totals.fiber + nutrition.fiber) * 10) / 10,
          sugar: Math.round((totals.sugar + nutrition.sugar) * 10) / 10,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
    );
  };

  const getProgressPercentage = (current: number, target: number) => {
    return (current / target) * 100;
  };

  const getExcessAmount = (current: number, target: number) => {
    return Math.max(0, current - target);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'from-red-400 to-red-600';
    if (percentage < 80) return 'from-yellow-400 to-orange-500';
    if (percentage <= 100) return 'from-green-400 to-emerald-600';
    return 'from-orange-500 to-red-500';
  };

  const getProgressBarWidth = (percentage: number) => {
    return Math.min(percentage, 100);
  };

  const isOverTarget = (current: number, target: number) => {
    return current > target;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const awardXP = (amount: number) => {
    setUserStats(prev => {
      const newXP = prev.xp + amount;
      let newLevel = prev.level;
      let newXPToNext = prev.xpToNext;
      
      // Level up logic
      while (newXP >= newXPToNext) {
        newLevel++;
        newXPToNext = newLevel * 250; // Each level requires more XP
      }
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNext: newXPToNext
      };
    });
  };

  const checkAchievements = () => {
    const totals = getTotalNutrition();
    const perfectMacros = Object.keys(DAILY_TARGETS).every(key => {
      const current = totals[key as keyof NutritionTotals];
      const target = DAILY_TARGETS[key as keyof typeof DAILY_TARGETS];
      return current >= target * 0.9 && current <= target * 1.1;
    });

    if (perfectMacros) {
      awardXP(100);
    }
  };

  useEffect(() => {
    checkAchievements();
  }, [selectedMeals]);

  const totals = getTotalNutrition();
  const hasExcess = Object.keys(DAILY_TARGETS).some(key => 
    totals[key as keyof NutritionTotals] > DAILY_TARGETS[key as keyof typeof DAILY_TARGETS]
  );

  const overallProgress = Math.round(
    (getProgressPercentage(totals.calories, DAILY_TARGETS.calories) +
      getProgressPercentage(totals.protein, DAILY_TARGETS.protein) +
      getProgressPercentage(totals.carbs, DAILY_TARGETS.carbs) +
      getProgressPercentage(totals.fat, DAILY_TARGETS.fat)) / 4
  );

  const NutrientProgressBar = ({ 
    label, 
    current, 
    target, 
    unit = 'g',
    isCalories = false 
  }: { 
    label: string; 
    current: number; 
    target: number; 
    unit?: string;
    isCalories?: boolean;
  }) => {
    const percentage = getProgressPercentage(current, target);
    const excess = getExcessAmount(current, target);
    const isOver = isOverTarget(current, target);
    const isComplete = percentage >= 100;

    return (
      <div className={`p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
        isOver ? 'border-red-300 bg-gradient-to-br from-red-50 to-red-100' : 
        isComplete ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-100' :
        'border-gray-200 bg-gradient-to-br from-white to-gray-50'
      }`}>
        {/* Completion sparkles */}
        {isComplete && !isOver && (
          <div className="absolute top-2 right-2 animate-pulse">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
          </div>
        )}
        
        <div className="flex justify-between items-center mb-3">
          <span className={`font-semibold flex items-center gap-2 ${
            isOver ? 'text-red-700' : isComplete ? 'text-green-700' : 'text-gray-900'
          }`}>
            {isOver && <AlertTriangle className="h-4 w-4 text-red-500" />}
            {isComplete && !isOver && <Trophy className="h-4 w-4 text-yellow-500" />}
            {label}
          </span>
          <div className="text-right">
            <span className={`text-sm font-bold ${
              isOver ? 'text-red-700' : isComplete ? 'text-green-700' : 'text-gray-600'
            }`}>
              {current}{isCalories ? '' : unit} / {target}{isCalories ? '' : unit}
            </span>
            {isOver && (
              <div className="text-xs text-red-600 font-medium">
                +{excess.toFixed(isCalories ? 0 : 1)}{isCalories ? '' : unit} over
              </div>
            )}
          </div>
        </div>
        
        <div className="relative bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          {/* Animated progress bar */}
          <div
            className={`h-4 rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${getProgressColor(percentage)} relative overflow-hidden`}
            style={{
              width: `${getProgressBarWidth(percentage)}%`,
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
          
          {/* Excess visualization */}
          {isOver && (
            <div className="absolute top-0 right-0 h-4 bg-gradient-to-l from-red-600 to-red-500 rounded-r-full flex items-center justify-end pr-2">
              <TrendingUp className="h-3 w-3 text-white animate-bounce" />
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className={`text-xs font-medium ${
            isOver ? 'text-red-600' : isComplete ? 'text-green-600' : 'text-gray-500'
          }`}>
            {Math.round(percentage)}% of goal
            {isComplete && !isOver && ' ✨'}
          </div>
          {isOver && (
            <div className="text-xs text-red-600 font-bold bg-red-200 px-2 py-1 rounded-full animate-pulse">
              {Math.round(percentage - 100)}% excess
            </div>
          )}
          {isComplete && !isOver && (
            <div className="text-xs text-green-600 font-bold bg-green-200 px-2 py-1 rounded-full">
              Goal Achieved! 🎉
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Gamification */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Daily Meal Quest
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Level up your nutrition game! Track your meals, complete daily challenges, and unlock achievements 
            as you build the perfect meal plan.
          </p>

          {/* User Stats Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Level & XP */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">Level {userStats.level}</div>
                <div className="text-sm text-gray-600">{userStats.xp} / {userStats.xpToNext} XP</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(userStats.xp / userStats.xpToNext) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Streak */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Flame className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{userStats.streak} Days</div>
                <div className="text-sm text-gray-600">Current Streak</div>
              </div>

              {/* Total Progress */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{overallProgress}%</div>
                <div className="text-sm text-gray-600">Today's Progress</div>
              </div>

              {/* Achievements */}
              <div className="text-center">
                <button
                  onClick={() => setShowAchievements(true)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 hover:scale-110 transition-transform duration-200"
                >
                  <Award className="h-8 w-8 text-white" />
                </button>
                <div className="text-2xl font-bold text-gray-900">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </div>
                <div className="text-sm text-gray-600">Achievements</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Overview */}
        {selectedMeals.length > 0 && (
          <div className={`mb-8 rounded-2xl p-8 shadow-lg ${
            hasExcess 
              ? 'bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 border-2 border-orange-300' 
              : overallProgress >= 80
              ? 'bg-gradient-to-r from-green-100 via-emerald-100 to-blue-100 border-2 border-green-300'
              : 'bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-2 border-blue-300'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${
                  hasExcess ? 'bg-orange-500' : overallProgress >= 80 ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {hasExcess ? <AlertTriangle className="h-6 w-6 text-white" /> :
                   overallProgress >= 80 ? <Trophy className="h-6 w-6 text-white" /> :
                   <Target className="h-6 w-6 text-white" />}
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    hasExcess ? 'text-orange-800' : overallProgress >= 80 ? 'text-green-800' : 'text-blue-800'
                  }`}>
                    {hasExcess ? 'Nutrition Limits Exceeded!' : 
                     overallProgress >= 80 ? 'Excellent Progress!' : 
                     'Keep Going!'}
                  </h3>
                  <p className={`${
                    hasExcess ? 'text-orange-700' : overallProgress >= 80 ? 'text-green-700' : 'text-blue-700'
                  }`}>
                    {hasExcess ? 'Some nutrients are over your daily targets' :
                     overallProgress >= 80 ? 'You\'re crushing your nutrition goals today!' :
                     'You\'re making great progress on your daily goals'}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-4xl font-bold ${
                  hasExcess ? 'text-orange-700' : overallProgress >= 80 ? 'text-green-700' : 'text-blue-700'
                }`}>
                  {overallProgress}%
                </div>
                <div className="text-sm opacity-75">Overall Progress</div>
              </div>
            </div>

            {hasExcess && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {Object.entries(DAILY_TARGETS).map(([key, target]) => {
                  const current = totals[key as keyof NutritionTotals];
                  const excess = getExcessAmount(current, target);
                  if (excess > 0) {
                    return (
                      <div key={key} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-orange-200">
                        <div className="text-sm font-medium text-orange-800 capitalize mb-1">{key}</div>
                        <div className="text-xl font-bold text-red-600">
                          +{excess.toFixed(key === 'calories' ? 0 : 1)}{key === 'calories' ? '' : 'g'}
                        </div>
                        <div className="text-xs text-orange-600">over limit</div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}

            {/* XP Reward Display */}
            <div className="flex justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 shadow-lg">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="font-medium text-gray-700">
                  {overallProgress >= 100 ? '+100 XP for perfect day!' : 
                   overallProgress >= 80 ? '+50 XP bonus!' : 
                   '+10 XP per meal logged'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Meal Builder */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ChefHat className="h-6 w-6 text-emerald-500" />
                  Your Meal Plan
                  {selectedMeals.length > 0 && (
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm font-medium">
                      {selectedMeals.length} items
                    </span>
                  )}
                </h3>
                <button
                  onClick={() => setShowFoodSelector(true)}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-green-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Plus className="h-4 w-4" />
                  Add Food
                </button>
              </div>

              {selectedMeals.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6 animate-bounce">🍽️</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Ready to start your quest?</h4>
                  <p className="text-gray-600 mb-6">Add your first meal to begin earning XP and unlocking achievements!</p>
                  <button
                    onClick={() => setShowFoodSelector(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Start Your Journey
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedMeals.map((meal, index) => {
                    const nutrition = calculateNutrition(meal.food, meal.servingSize);
                    return (
                      <div key={meal.id} className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-emerald-300 transition-all duration-300 bg-gradient-to-r from-white to-gray-50">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">{meal.food.name}</h4>
                              <span className="text-sm text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full font-medium">
                                {meal.food.category}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeMeal(meal.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all duration-200 hover:scale-110"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateServingSize(meal.id, meal.servingSize - 10)}
                              className="bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={meal.servingSize}
                                onChange={(e) => updateServingSize(meal.id, Number(e.target.value))}
                                className="w-20 text-center border-2 border-gray-300 rounded-lg px-3 py-2 font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                min="1"
                              />
                              <span className="text-sm text-gray-600 font-medium">g</span>
                            </div>
                            <button
                              onClick={() => updateServingSize(meal.id, meal.servingSize + 10)}
                              className="bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="text-xl font-bold text-gray-900 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-lg">
                            {nutrition.calories} cal
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                          <div className="text-center bg-emerald-50 rounded-lg p-3">
                            <div className="font-bold text-emerald-600 text-lg">{nutrition.protein}g</div>
                            <div className="text-gray-600 font-medium">Protein</div>
                          </div>
                          <div className="text-center bg-blue-50 rounded-lg p-3">
                            <div className="font-bold text-blue-600 text-lg">{nutrition.carbs}g</div>
                            <div className="text-gray-600 font-medium">Carbs</div>
                          </div>
                          <div className="text-center bg-orange-50 rounded-lg p-3">
                            <div className="font-bold text-orange-600 text-lg">{nutrition.fat}g</div>
                            <div className="text-gray-600 font-medium">Fat</div>
                          </div>
                          <div className="text-center bg-purple-50 rounded-lg p-3">
                            <div className="font-bold text-purple-600 text-lg">{nutrition.fiber}g</div>
                            <div className="text-gray-600 font-medium">Fiber</div>
                          </div>
                          <div className="text-center bg-pink-50 rounded-lg p-3">
                            <div className="font-bold text-pink-600 text-lg">{nutrition.sugar}g</div>
                            <div className="text-gray-600 font-medium">Sugar</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Gamified Progress Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="h-6 w-6 text-emerald-500" />
                Daily Quest Progress
                {hasExcess && (
                  <div className="bg-red-100 p-1 rounded-full animate-pulse">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                )}
              </h3>

              <div className="space-y-5">
                <NutrientProgressBar
                  label="Calories"
                  current={totals.calories}
                  target={DAILY_TARGETS.calories}
                  unit=""
                  isCalories={true}
                />

                <NutrientProgressBar
                  label="Protein"
                  current={totals.protein}
                  target={DAILY_TARGETS.protein}
                />

                <NutrientProgressBar
                  label="Carbs"
                  current={totals.carbs}
                  target={DAILY_TARGETS.carbs}
                />

                <NutrientProgressBar
                  label="Fat"
                  current={totals.fat}
                  target={DAILY_TARGETS.fat}
                />

                {/* Additional nutrients with gamification */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className={`text-center p-4 rounded-xl transition-all duration-300 ${
                      isOverTarget(totals.fiber, DAILY_TARGETS.fiber) 
                        ? 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200' 
                        : getProgressPercentage(totals.fiber, DAILY_TARGETS.fiber) >= 100
                        ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200'
                        : 'bg-gradient-to-br from-gray-50 to-gray-100'
                    }`}>
                      <div className={`font-bold text-xl mb-1 ${
                        isOverTarget(totals.fiber, DAILY_TARGETS.fiber) 
                          ? 'text-red-600' 
                          : getProgressPercentage(totals.fiber, DAILY_TARGETS.fiber) >= 100
                          ? 'text-green-600'
                          : 'text-purple-600'
                      }`}>
                        {totals.fiber}g
                      </div>
                      <div className="text-gray-600 font-medium">Fiber</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round(getProgressPercentage(totals.fiber, DAILY_TARGETS.fiber))}% DV
                      </div>
                      {getProgressPercentage(totals.fiber, DAILY_TARGETS.fiber) >= 100 && !isOverTarget(totals.fiber, DAILY_TARGETS.fiber) && (
                        <div className="text-xs text-green-600 font-bold mt-1">Complete! ⭐</div>
                      )}
                    </div>
                    
                    <div className={`text-center p-4 rounded-xl transition-all duration-300 ${
                      isOverTarget(totals.sugar, DAILY_TARGETS.sugar) 
                        ? 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200' 
                        : 'bg-gradient-to-br from-gray-50 to-gray-100'
                    }`}>
                      <div className={`font-bold text-xl mb-1 ${
                        isOverTarget(totals.sugar, DAILY_TARGETS.sugar) 
                          ? 'text-red-600' 
                          : 'text-pink-600'
                      }`}>
                        {totals.sugar}g
                      </div>
                      <div className="text-gray-600 font-medium">Sugar</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round(getProgressPercentage(totals.sugar, DAILY_TARGETS.sugar))}% limit
                      </div>
                      {isOverTarget(totals.sugar, DAILY_TARGETS.sugar) && (
                        <div className="text-xs text-red-600 font-bold mt-1 animate-pulse">
                          Over limit! ⚠️
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced Summary with Rewards */}
                <div className={`rounded-xl p-6 transition-all duration-300 ${
                  hasExcess 
                    ? 'bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 border-2 border-orange-300' 
                    : overallProgress >= 100
                    ? 'bg-gradient-to-br from-green-100 via-emerald-100 to-blue-100 border-2 border-green-300'
                    : overallProgress >= 80
                    ? 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border-2 border-blue-300'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}>
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${
                      hasExcess ? 'text-orange-700' : 
                      overallProgress >= 100 ? 'text-green-700' :
                      overallProgress >= 80 ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {overallProgress}%
                    </div>
                    <div className={`text-sm font-medium mb-3 ${
                      hasExcess ? 'text-orange-600' : 
                      overallProgress >= 100 ? 'text-green-600' :
                      overallProgress >= 80 ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {hasExcess ? 'Targets Exceeded' : 
                       overallProgress >= 100 ? 'Perfect Day!' :
                       overallProgress >= 80 ? 'Almost There!' : 'Daily Progress'}
                    </div>
                    
                    {/* Reward indicators */}
                    <div className="flex justify-center gap-2 mb-3">
                      {overallProgress >= 100 && !hasExcess && (
                        <>
                          <Star className="h-5 w-5 text-yellow-500 fill-current animate-pulse" />
                          <Trophy className="h-5 w-5 text-yellow-600 fill-current animate-bounce" />
                          <Star className="h-5 w-5 text-yellow-500 fill-current animate-pulse" />
                        </>
                      )}
                      {overallProgress >= 80 && overallProgress < 100 && (
                        <Zap className="h-5 w-5 text-blue-500 animate-pulse" />
                      )}
                    </div>

                    {hasExcess && (
                      <div className="text-xs text-orange-700 bg-orange-200 px-3 py-2 rounded-full inline-block font-medium">
                        Review portion sizes 📊
                      </div>
                    )}
                    {overallProgress >= 100 && !hasExcess && (
                      <div className="text-xs text-green-700 bg-green-200 px-3 py-2 rounded-full inline-block font-bold">
                        Perfect nutrition! +100 XP 🎉
                      </div>
                    )}
                    {overallProgress >= 80 && overallProgress < 100 && (
                      <div className="text-xs text-blue-700 bg-blue-200 px-3 py-2 rounded-full inline-block font-medium">
                        Great progress! +50 XP ⚡
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Food Selector Modal */}
        {showFoodSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-blue-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Plus className="h-6 w-6 text-emerald-500" />
                    Add Food to Quest
                  </h3>
                  <button
                    onClick={() => {
                      setShowFoodSelector(false);
                      setSearchTerm('');
                    }}
                    className="text-gray-400 hover:text-gray-600 text-2xl hover:scale-110 transition-transform duration-200"
                  >
                    ×
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search for foods to add to your quest..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="p-6 overflow-y-auto max-h-96">
                <div className="grid grid-cols-1 gap-3">
                  {filteredFoods.map((food) => (
                    <button
                      key={food.id}
                      onClick={() => addFood(food)}
                      className="text-left p-4 border-2 border-gray-200 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 hover:border-emerald-300 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">{food.name}</h4>
                          <span className="text-sm text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full font-medium">
                            {food.category}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900 text-xl">{food.calories} cal</div>
                          <div className="text-sm text-gray-600">per 100g</div>
                          <div className="text-xs text-emerald-600 font-medium">+10 XP</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Modal */}
        {showAchievements && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                    Achievements
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      {achievements.filter(a => a.unlocked).length}/{achievements.length}
                    </span>
                  </h3>
                  <button
                    onClick={() => setShowAchievements(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl hover:scale-110 transition-transform duration-200"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-96">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        achievement.unlocked
                          ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} text-white shadow-lg`
                          : 'bg-gray-50 border-gray-200 text-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-full ${
                          achievement.unlocked ? 'bg-white/20' : 'bg-gray-200'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className={`font-bold text-lg ${
                            achievement.unlocked ? 'text-white' : 'text-gray-900'
                          }`}>
                            {achievement.title}
                          </h4>
                          <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                            achievement.unlocked ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {achievement.rarity.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      
                      <p className={`text-sm mb-4 ${
                        achievement.unlocked ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {achievement.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <div className={`w-full rounded-full h-2 ${
                          achievement.unlocked ? 'bg-white/20' : 'bg-gray-200'
                        }`}>
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              achievement.unlocked ? 'bg-white' : 'bg-gray-400'
                            }`}
                            style={{
                              width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      {achievement.unlocked && (
                        <div className="mt-4 text-center">
                          <div className="text-white font-bold text-sm bg-white/20 px-3 py-1 rounded-full inline-block">
                            ✨ UNLOCKED ✨
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MealPlannerSection;