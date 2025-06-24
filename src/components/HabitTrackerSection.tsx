import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Check, 
  X, 
  Target, 
  Calendar, 
  Flame, 
  Trophy, 
  Star, 
  Zap, 
  Clock, 
  TrendingUp,
  Award,
  Crown,
  Shield,
  Heart,
  Droplets,
  Moon,
  Book,
  Dumbbell,
  Apple,
  Coffee,
  Smile,
  Edit3,
  Trash2,
  BarChart3
} from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  streak: number;
  bestStreak: number;
  completedToday: boolean;
  weeklyProgress: boolean[];
  totalCompletions: number;
  createdDate: string;
  category: 'health' | 'fitness' | 'mindfulness' | 'productivity' | 'nutrition';
}

interface HabitStats {
  totalHabits: number;
  completedToday: number;
  longestStreak: number;
  perfectDays: number;
  weeklyCompletion: number;
}

const HabitTrackerSection: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Drink 8 Glasses of Water',
      description: 'Stay hydrated throughout the day',
      icon: <Droplets className="h-5 w-5" />,
      color: 'from-blue-400 to-blue-600',
      streak: 12,
      bestStreak: 15,
      completedToday: true,
      weeklyProgress: [true, true, false, true, true, true, true],
      totalCompletions: 45,
      createdDate: '2024-01-15',
      category: 'health'
    },
    {
      id: '2',
      name: 'Morning Workout',
      description: 'Exercise for at least 30 minutes',
      icon: <Dumbbell className="h-5 w-5" />,
      color: 'from-red-400 to-red-600',
      streak: 7,
      bestStreak: 21,
      completedToday: false,
      weeklyProgress: [true, false, true, true, false, true, false],
      totalCompletions: 38,
      createdDate: '2024-01-10',
      category: 'fitness'
    },
    {
      id: '3',
      name: 'Meditation',
      description: '10 minutes of mindfulness',
      icon: <Heart className="h-5 w-5" />,
      color: 'from-purple-400 to-purple-600',
      streak: 5,
      bestStreak: 14,
      completedToday: true,
      weeklyProgress: [true, true, true, false, true, true, false],
      totalCompletions: 28,
      createdDate: '2024-01-20',
      category: 'mindfulness'
    },
    {
      id: '4',
      name: 'Read for 30 Minutes',
      description: 'Daily reading habit',
      icon: <Book className="h-5 w-5" />,
      color: 'from-green-400 to-green-600',
      streak: 3,
      bestStreak: 9,
      completedToday: false,
      weeklyProgress: [false, true, true, true, false, false, false],
      totalCompletions: 22,
      createdDate: '2024-01-25',
      category: 'productivity'
    },
    {
      id: '5',
      name: 'Healthy Breakfast',
      description: 'Start the day with nutritious food',
      icon: <Apple className="h-5 w-5" />,
      color: 'from-orange-400 to-orange-600',
      streak: 9,
      bestStreak: 18,
      completedToday: true,
      weeklyProgress: [true, true, true, true, false, true, true],
      totalCompletions: 41,
      createdDate: '2024-01-12',
      category: 'nutrition'
    },
    {
      id: '6',
      name: 'Sleep 8 Hours',
      description: 'Get quality rest every night',
      icon: <Moon className="h-5 w-5" />,
      color: 'from-indigo-400 to-indigo-600',
      streak: 4,
      bestStreak: 11,
      completedToday: false,
      weeklyProgress: [true, false, true, true, true, false, false],
      totalCompletions: 31,
      createdDate: '2024-01-18',
      category: 'health'
    }
  ]);

  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    category: 'health' as const,
    icon: 'heart'
  });

  const habitIcons = {
    heart: <Heart className="h-5 w-5" />,
    droplets: <Droplets className="h-5 w-5" />,
    dumbbell: <Dumbbell className="h-5 w-5" />,
    book: <Book className="h-5 w-5" />,
    apple: <Apple className="h-5 w-5" />,
    moon: <Moon className="h-5 w-5" />,
    coffee: <Coffee className="h-5 w-5" />,
    smile: <Smile className="h-5 w-5" />
  };

  const categoryColors = {
    health: 'from-blue-400 to-blue-600',
    fitness: 'from-red-400 to-red-600',
    mindfulness: 'from-purple-400 to-purple-600',
    productivity: 'from-green-400 to-green-600',
    nutrition: 'from-orange-400 to-orange-600'
  };

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newCompletedToday = !habit.completedToday;
        const newStreak = newCompletedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1);
        const newBestStreak = Math.max(habit.bestStreak, newStreak);
        const newTotalCompletions = newCompletedToday ? habit.totalCompletions + 1 : Math.max(0, habit.totalCompletions - 1);
        
        return {
          ...habit,
          completedToday: newCompletedToday,
          streak: newStreak,
          bestStreak: newBestStreak,
          totalCompletions: newTotalCompletions
        };
      }
      return habit;
    }));
  };

  const addHabit = () => {
    if (newHabit.name.trim()) {
      const habit: Habit = {
        id: Date.now().toString(),
        name: newHabit.name,
        description: newHabit.description,
        icon: habitIcons[newHabit.icon as keyof typeof habitIcons],
        color: categoryColors[newHabit.category],
        streak: 0,
        bestStreak: 0,
        completedToday: false,
        weeklyProgress: [false, false, false, false, false, false, false],
        totalCompletions: 0,
        createdDate: new Date().toISOString().split('T')[0],
        category: newHabit.category
      };
      
      setHabits([...habits, habit]);
      setNewHabit({ name: '', description: '', category: 'health', icon: 'heart' });
      setShowAddHabit(false);
    }
  };

  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  const calculateStats = (): HabitStats => {
    const totalHabits = habits.length;
    const completedToday = habits.filter(h => h.completedToday).length;
    const longestStreak = Math.max(...habits.map(h => h.bestStreak), 0);
    const perfectDays = habits.filter(h => h.weeklyProgress.every(day => day)).length;
    const weeklyCompletion = habits.length > 0 
      ? Math.round((habits.reduce((sum, h) => sum + h.weeklyProgress.filter(Boolean).length, 0) / (habits.length * 7)) * 100)
      : 0;

    return { totalHabits, completedToday, longestStreak, perfectDays, weeklyCompletion };
  };

  const stats = calculateStats();
  const completionPercentage = stats.totalHabits > 0 ? Math.round((stats.completedToday / stats.totalHabits) * 100) : 0;

  const StatCard = ({ icon, title, value, subtitle, color = 'emerald' }: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    subtitle?: string;
    color?: string;
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full bg-gradient-to-r from-${color}-400 to-${color}-600`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
        <TrendingUp className="h-5 w-5 text-green-500" />
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-gray-600 font-medium mb-1">{title}</div>
      {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Habit Quest
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Build lasting habits and transform your life one day at a time. Track your progress, 
            maintain streaks, and unlock achievements as you develop positive routines.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <StatCard
            icon={<Target className="h-6 w-6" />}
            title="Total Habits"
            value={stats.totalHabits}
            subtitle="Active habits"
            color="purple"
          />
          <StatCard
            icon={<Check className="h-6 w-6" />}
            title="Completed Today"
            value={`${stats.completedToday}/${stats.totalHabits}`}
            subtitle={`${completionPercentage}% complete`}
            color="green"
          />
          <StatCard
            icon={<Flame className="h-6 w-6" />}
            title="Longest Streak"
            value={`${stats.longestStreak} days`}
            subtitle="Personal best"
            color="orange"
          />
          <StatCard
            icon={<Trophy className="h-6 w-6" />}
            title="Perfect Days"
            value={stats.perfectDays}
            subtitle="All habits completed"
            color="yellow"
          />
          <StatCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="Weekly Rate"
            value={`${stats.weeklyCompletion}%`}
            subtitle="This week"
            color="blue"
          />
        </div>

        {/* Daily Progress Overview */}
        {habits.length > 0 && (
          <div className={`mb-8 rounded-2xl p-8 shadow-lg border-2 ${
            completionPercentage === 100 
              ? 'bg-gradient-to-r from-green-100 via-emerald-100 to-blue-100 border-green-300' 
              : completionPercentage >= 75
              ? 'bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-blue-300'
              : 'bg-gradient-to-r from-orange-100 via-yellow-100 to-red-100 border-orange-300'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${
                  completionPercentage === 100 ? 'bg-green-500' : 
                  completionPercentage >= 75 ? 'bg-blue-500' : 'bg-orange-500'
                }`}>
                  {completionPercentage === 100 ? <Trophy className="h-6 w-6 text-white" /> :
                   completionPercentage >= 75 ? <Star className="h-6 w-6 text-white" /> :
                   <Target className="h-6 w-6 text-white" />}
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    completionPercentage === 100 ? 'text-green-800' : 
                    completionPercentage >= 75 ? 'text-blue-800' : 'text-orange-800'
                  }`}>
                    {completionPercentage === 100 ? 'Perfect Day Achieved!' : 
                     completionPercentage >= 75 ? 'Great Progress!' : 
                     'Keep Building!'}
                  </h3>
                  <p className={`${
                    completionPercentage === 100 ? 'text-green-700' : 
                    completionPercentage >= 75 ? 'text-blue-700' : 'text-orange-700'
                  }`}>
                    {completionPercentage === 100 ? 'All habits completed today! You\'re crushing it!' :
                     completionPercentage >= 75 ? 'You\'re doing amazing with your habits today!' :
                     'Every small step counts towards building lasting habits'}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-4xl font-bold ${
                  completionPercentage === 100 ? 'text-green-700' : 
                  completionPercentage >= 75 ? 'text-blue-700' : 'text-orange-700'
                }`}>
                  {completionPercentage}%
                </div>
                <div className="text-sm opacity-75">Daily Progress</div>
              </div>
            </div>

            {/* XP Reward Display */}
            <div className="flex justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 shadow-lg">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="font-medium text-gray-700">
                  {completionPercentage === 100 ? '+200 XP for perfect day!' : 
                   completionPercentage >= 75 ? '+100 XP bonus!' : 
                   '+25 XP per habit completed'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Habits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 ${
                habit.completedToday ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50' : 'border-gray-200'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${habit.color}`}>
                    <div className="text-white">
                      {habit.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{habit.name}</h4>
                    <p className="text-sm text-gray-600">{habit.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className={`text-xl font-bold ${habit.streak > 0 ? 'text-orange-600' : 'text-gray-400'}`}>
                    {habit.streak}
                  </div>
                  <div className="text-xs text-gray-500">Current Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">{habit.bestStreak}</div>
                  <div className="text-xs text-gray-500">Best Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{habit.totalCompletions}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
              </div>

              {/* Weekly Progress */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">This Week</div>
                <div className="flex gap-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        habit.weeklyProgress[index]
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {habit.weeklyProgress[index] ? <Check className="h-3 w-3" /> : day}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  habit.completedToday
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {habit.completedToday ? (
                  <>
                    <Check className="h-5 w-5" />
                    Completed Today!
                  </>
                ) : (
                  <>
                    <Target className="h-5 w-5" />
                    Mark Complete
                  </>
                )}
              </button>

              {/* Streak Indicator */}
              {habit.streak > 0 && (
                <div className="mt-3 text-center">
                  <div className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Flame className="h-4 w-4" />
                    {habit.streak} day streak! 🔥
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Habit Card */}
          <div
            onClick={() => setShowAddHabit(true)}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 border-dashed border-gray-300 hover:border-purple-400 cursor-pointer flex flex-col items-center justify-center text-center min-h-[300px] group"
          >
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Add New Habit</h4>
            <p className="text-gray-600 text-sm">Start building a new positive routine</p>
          </div>
        </div>

        {/* Add Habit Modal */}
        {showAddHabit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Plus className="h-6 w-6 text-purple-500" />
                  Add New Habit
                </h3>
                <button
                  onClick={() => setShowAddHabit(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Habit Name</label>
                  <input
                    type="text"
                    value={newHabit.name}
                    onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., Drink 8 glasses of water"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={newHabit.description}
                    onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Brief description of your habit"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newHabit.category}
                    onChange={(e) => setNewHabit({...newHabit, category: e.target.value as any})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="health">Health</option>
                    <option value="fitness">Fitness</option>
                    <option value="mindfulness">Mindfulness</option>
                    <option value="productivity">Productivity</option>
                    <option value="nutrition">Nutrition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(habitIcons).map(([key, icon]) => (
                      <button
                        key={key}
                        onClick={() => setNewHabit({...newHabit, icon: key})}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          newHabit.icon === key
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddHabit(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={addHabit}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  Add Habit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HabitTrackerSection;