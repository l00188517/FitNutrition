import React from 'react';
import { Clock, Flame, Users, ChevronRight } from 'lucide-react';

interface WorkoutCard {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  calories: string;
  category: string;
  imageUrl: string;
}

const workouts: WorkoutCard[] = [
  {
    id: '1',
    title: 'HIIT Cardio Blast',
    description: 'High-intensity interval training to boost your metabolism and burn fat quickly.',
    duration: '20 min',
    difficulty: 'Intermediate',
    calories: '300-400',
    category: 'Cardio',
    imageUrl: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Full Body Strength',
    description: 'Complete strength training routine targeting all major muscle groups.',
    duration: '45 min',
    difficulty: 'Intermediate',
    calories: '250-350',
    category: 'Strength',
    imageUrl: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'Beginner Yoga Flow',
    description: 'Gentle yoga sequence perfect for beginners to improve flexibility and mindfulness.',
    duration: '30 min',
    difficulty: 'Beginner',
    calories: '150-200',
    category: 'Flexibility',
    imageUrl: 'https://images.pexels.com/photos/3822142/pexels-photo-3822142.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    title: 'Core Power',
    description: 'Targeted core workout to strengthen your abs and improve stability.',
    duration: '25 min',
    difficulty: 'Intermediate',
    calories: '200-250',
    category: 'Core',
    imageUrl: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    title: 'Pilates Fundamentals',
    description: 'Master the basics of Pilates with controlled movements and breathing techniques.',
    duration: '35 min',
    difficulty: 'Beginner',
    calories: '180-230',
    category: 'Pilates',
    imageUrl: 'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    title: 'Advanced Circuit',
    description: 'Challenging circuit training combining strength, cardio, and agility exercises.',
    duration: '50 min',
    difficulty: 'Advanced',
    calories: '450-550',
    category: 'Circuit',
    imageUrl: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'Advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const WorkoutSection: React.FC = () => {
  return (
    <section id="workouts" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Workouts
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover effective workout routines designed by fitness experts. From beginner-friendly 
            sessions to advanced challenges, find the perfect workout for your fitness level.
          </p>
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={workout.imageUrl}
                  alt={workout.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(workout.difficulty)}`}>
                    {workout.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">{workout.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{workout.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{workout.description}</p>

                {/* Workout Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{workout.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4" />
                    <span>{workout.calories} cal</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center gap-2 group">
                  Start Workout
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Fitness Journey?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of users who have transformed their lives with our comprehensive 
              fitness and nutrition programs. Get personalized workout plans and meal guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2">
                <Users className="h-5 w-5" />
                Join Community
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors duration-200">
                View All Workouts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutSection;