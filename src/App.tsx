import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NutritionSection from './components/NutritionSection';
import MealPlannerSection from './components/MealPlannerSection';
import HabitTrackerSection from './components/HabitTrackerSection';
import WorkoutSection from './components/WorkoutSection';
import ProfileSection from './components/ProfileSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <NutritionSection />
        <MealPlannerSection />
        <HabitTrackerSection />
        <WorkoutSection />
        <ProfileSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;