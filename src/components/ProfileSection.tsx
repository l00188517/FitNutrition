import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Trophy, 
  Target, 
  Calendar, 
  TrendingUp, 
  Award, 
  Crown, 
  Flame, 
  Heart, 
  Activity, 
  Edit3,
  Camera,
  Mail,
  Phone,
  MapPin,
  Clock,
  Zap,
  Star,
  ChevronRight,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  avatar: string;
  bio: string;
  goals: {
    weightGoal: string;
    activityLevel: string;
    dietType: string;
  };
}

interface UserStats {
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  totalMealsLogged: number;
  perfectDays: number;
  workoutsCompleted: number;
  caloriesBurned: number;
  achievementsUnlocked: number;
  totalAchievements: number;
}

interface WeeklyProgress {
  day: string;
  calories: number;
  protein: number;
  workouts: number;
  completed: boolean;
}

const ProfileSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'achievements' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Fitness enthusiast on a journey to better health. Love trying new recipes and challenging workouts!',
    goals: {
      weightGoal: 'Lose 10 lbs',
      activityLevel: 'Moderately Active',
      dietType: 'Balanced'
    }
  });

  const userStats: UserStats = {
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    streak: 7,
    totalMealsLogged: 156,
    perfectDays: 23,
    workoutsCompleted: 45,
    caloriesBurned: 12500,
    achievementsUnlocked: 8,
    totalAchievements: 15
  };

  const weeklyProgress: WeeklyProgress[] = [
    { day: 'Mon', calories: 1850, protein: 140, workouts: 1, completed: true },
    { day: 'Tue', calories: 2100, protein: 155, workouts: 0, completed: true },
    { day: 'Wed', calories: 1950, protein: 145, workouts: 1, completed: true },
    { day: 'Thu', calories: 2200, protein: 160, workouts: 1, completed: true },
    { day: 'Fri', calories: 1800, protein: 135, workouts: 0, completed: true },
    { day: 'Sat', calories: 2300, protein: 170, workouts: 1, completed: true },
    { day: 'Sun', calories: 1900, protein: 150, workouts: 1, completed: true }
  ];

  const recentAchievements = [
    { title: 'Protein Master', icon: <Trophy className="h-5 w-5" />, date: '2 days ago', rarity: 'rare' },
    { title: 'Week Warrior', icon: <Flame className="h-5 w-5" />, date: '5 days ago', rarity: 'epic' },
    { title: 'Consistency King', icon: <Crown className="h-5 w-5" />, date: '1 week ago', rarity: 'legendary' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

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
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Your Profile
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Track your progress, manage your goals, and celebrate your achievements on your fitness journey.
          </p>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-400 to-pink-400 shadow-lg">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 bg-emerald-500 p-2 rounded-full text-white hover:bg-emerald-600 transition-colors duration-200 shadow-lg">
                <Camera className="h-4 w-4" />
              </button>
              
              {/* Level Badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                Lv.{userStats.level}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{userProfile.name}</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-gray-400 hover:text-emerald-500 transition-colors duration-200"
                >
                  <Edit3 className="h-5 w-5" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-4 max-w-md">{userProfile.bio}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {userProfile.joinDate}</span>
                </div>
              </div>

              {/* XP Progress */}
              <div className="bg-gray-100 rounded-full p-1 mb-4">
                <div className="flex justify-between text-sm mb-1 px-2">
                  <span className="text-gray-600">Level {userStats.level}</span>
                  <span className="text-gray-600">{userStats.xp} / {userStats.xpToNext} XP</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(userStats.xp / userStats.xpToNext) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex justify-center md:justify-start gap-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-emerald-600">{userStats.streak}</div>
                  <div className="text-xs text-gray-500">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{userStats.perfectDays}</div>
                  <div className="text-xs text-gray-500">Perfect Days</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">{userStats.achievementsUnlocked}</div>
                  <div className="text-xs text-gray-500">Achievements</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 border border-gray-200">
          <div className="flex flex-wrap border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: <User className="h-5 w-5" /> },
              { id: 'stats', label: 'Statistics', icon: <BarChart3 className="h-5 w-5" /> },
              { id: 'achievements', label: 'Achievements', icon: <Trophy className="h-5 w-5" /> },
              { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Goals Section */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Target className="h-6 w-6 text-emerald-500" />
                    Current Goals
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-xl border border-emerald-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-emerald-500 p-2 rounded-full">
                          <Target className="h-5 w-5 text-white" />
                        </div>
                        <h5 className="font-semibold text-gray-900">Weight Goal</h5>
                      </div>
                      <p className="text-emerald-700 font-medium">{userProfile.goals.weightGoal}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-500 p-2 rounded-full">
                          <Activity className="h-5 w-5 text-white" />
                        </div>
                        <h5 className="font-semibold text-gray-900">Activity Level</h5>
                      </div>
                      <p className="text-blue-700 font-medium">{userProfile.goals.activityLevel}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-purple-500 p-2 rounded-full">
                          <Heart className="h-5 w-5 text-white" />
                        </div>
                        <h5 className="font-semibold text-gray-900">Diet Type</h5>
                      </div>
                      <p className="text-purple-700 font-medium">{userProfile.goals.dietType}</p>
                    </div>
                  </div>
                </div>

                {/* Weekly Progress */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-emerald-500" />
                    This Week's Progress
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="grid grid-cols-7 gap-4">
                      {weeklyProgress.map((day, index) => (
                        <div key={index} className="text-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 mx-auto ${
                            day.completed ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {day.completed ? <Star className="h-5 w-5 fill-current" /> : day.day[0]}
                          </div>
                          <div className="text-xs font-medium text-gray-900">{day.day}</div>
                          <div className="text-xs text-gray-500">{day.calories} cal</div>
                          <div className="text-xs text-gray-500">{day.protein}g protein</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Achievements */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Award className="h-6 w-6 text-emerald-500" />
                    Recent Achievements
                  </h4>
                  <div className="space-y-4">
                    {recentAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}>
                          <div className="text-white">
                            {achievement.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{achievement.title}</h5>
                          <p className="text-sm text-gray-500">{achievement.date}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          achievement.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                          achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                          achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {achievement.rarity.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-8">
                {/* Key Metrics */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6">Key Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                      icon={<Flame className="h-6 w-6" />}
                      title="Total Calories Burned"
                      value={userStats.caloriesBurned.toLocaleString()}
                      subtitle="This month"
                      color="red"
                    />
                    <StatCard
                      icon={<Activity className="h-6 w-6" />}
                      title="Workouts Completed"
                      value={userStats.workoutsCompleted}
                      subtitle="All time"
                      color="blue"
                    />
                    <StatCard
                      icon={<Target className="h-6 w-6" />}
                      title="Perfect Days"
                      value={userStats.perfectDays}
                      subtitle="Goals achieved"
                      color="green"
                    />
                    <StatCard
                      icon={<Clock className="h-6 w-6" />}
                      title="Current Streak"
                      value={`${userStats.streak} days`}
                      subtitle="Keep it up!"
                      color="purple"
                    />
                  </div>
                </div>

                {/* Progress Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-emerald-500" />
                      Weekly Calories
                    </h5>
                    <div className="h-48 flex items-end justify-between gap-2">
                      {weeklyProgress.map((day, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="bg-gradient-to-t from-emerald-400 to-emerald-600 rounded-t w-full transition-all duration-500 hover:from-emerald-500 hover:to-emerald-700"
                            style={{ height: `${(day.calories / 2500) * 100}%` }}
                          ></div>
                          <div className="text-xs text-gray-600 mt-2">{day.day}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-blue-500" />
                      Protein Intake
                    </h5>
                    <div className="h-48 flex items-end justify-between gap-2">
                      {weeklyProgress.map((day, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="bg-gradient-to-t from-blue-400 to-blue-600 rounded-t w-full transition-all duration-500 hover:from-blue-500 hover:to-blue-700"
                            style={{ height: `${(day.protein / 200) * 100}%` }}
                          ></div>
                          <div className="text-xs text-gray-600 mt-2">{day.day}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {userStats.achievementsUnlocked} / {userStats.totalAchievements}
                  </div>
                  <p className="text-gray-600">Achievements Unlocked</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-4 max-w-md mx-auto">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(userStats.achievementsUnlocked / userStats.totalAchievements) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Achievement cards would go here - using placeholder data */}
                  {[
                    { title: 'First Steps', desc: 'Log your first meal', unlocked: true, rarity: 'common' },
                    { title: 'Protein Master', desc: 'Hit protein goal 5 days', unlocked: true, rarity: 'rare' },
                    { title: 'Week Warrior', desc: 'Complete 7 perfect days', unlocked: true, rarity: 'epic' },
                    { title: 'Consistency King', desc: '30-day streak', unlocked: false, rarity: 'legendary' },
                    { title: 'Workout Beast', desc: '50 workouts completed', unlocked: true, rarity: 'rare' },
                    { title: 'Nutrition Guru', desc: 'Reach level 25', unlocked: false, rarity: 'legendary' }
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        achievement.unlocked
                          ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} text-white shadow-lg`
                          : 'bg-gray-50 border-gray-200 text-gray-400'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          achievement.unlocked ? 'bg-white/20' : 'bg-gray-200'
                        }`}>
                          <Trophy className="h-8 w-8" />
                        </div>
                        <h5 className={`font-bold text-lg mb-2 ${
                          achievement.unlocked ? 'text-white' : 'text-gray-600'
                        }`}>
                          {achievement.title}
                        </h5>
                        <p className={`text-sm mb-4 ${
                          achievement.unlocked ? 'text-white/90' : 'text-gray-500'
                        }`}>
                          {achievement.desc}
                        </p>
                        <div className={`text-xs font-medium px-3 py-1 rounded-full ${
                          achievement.unlocked ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {achievement.rarity.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h4>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={userProfile.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={userProfile.email}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        value={userProfile.bio}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6">Goals & Preferences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Weight Goal</label>
                      <select
                        value={userProfile.goals.weightGoal}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setUserProfile({
                          ...userProfile,
                          goals: {...userProfile.goals, weightGoal: e.target.value}
                        })}
                      >
                        <option>Lose 10 lbs</option>
                        <option>Lose 20 lbs</option>
                        <option>Maintain Weight</option>
                        <option>Gain 10 lbs</option>
                        <option>Gain 20 lbs</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                      <select
                        value={userProfile.goals.activityLevel}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setUserProfile({
                          ...userProfile,
                          goals: {...userProfile.goals, activityLevel: e.target.value}
                        })}
                      >
                        <option>Sedentary</option>
                        <option>Lightly Active</option>
                        <option>Moderately Active</option>
                        <option>Very Active</option>
                        <option>Extremely Active</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Diet Type</label>
                      <select
                        value={userProfile.goals.dietType}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        onChange={(e) => setUserProfile({
                          ...userProfile,
                          goals: {...userProfile.goals, dietType: e.target.value}
                        })}
                      >
                        <option>Balanced</option>
                        <option>Low Carb</option>
                        <option>High Protein</option>
                        <option>Vegetarian</option>
                        <option>Vegan</option>
                        <option>Keto</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;