import React, { useState } from "react";
import Header from "./components/Header";
import DietForm from "./components/DietForm";
import CalorieDisplay from "./components/CalorieDisplay";
import DietSuggestions from "./components/DietSuggestions";

function App() {
  const [dietData, setDietData] = useState(null);
  const [calorieData, setCalorieData] = useState(null);

  const handleDietSubmit = (data) => {
    setDietData(data);
    
    // Extract calorie-specific data for the CalorieDisplay component
    const { profile, totals } = data;
    
    // Calculate goal calories based on user profile
    let goalCalories = 2000; // Default value
    
    if (profile.weight && profile.height && profile.age) {
      // Calculate BMR
      let bmr = 10 * parseFloat(profile.weight) + 6.25 * parseFloat(profile.height) - 5 * parseFloat(profile.age);
      bmr = profile.gender === "male" ? bmr + 5 : bmr - 161;
      
      // Apply activity multiplier
      const activityMultipliers = {
        sedentary: 1.2,
        lightlyActive: 1.375,
        moderatelyActive: 1.55,
        veryActive: 1.725,
        extraActive: 1.9
      };
      
      goalCalories = Math.round(bmr * activityMultipliers[profile.activityLevel || "moderatelyActive"]);
      
      // Adjust based on goal
      if (profile.goal === "lose") {
        goalCalories = Math.round(goalCalories * 0.8); // 20% deficit
      } else if (profile.goal === "gain") {
        goalCalories = Math.round(goalCalories * 1.15); // 15% surplus
      }
    }
    
    setCalorieData({
      totalCalories: totals.calories,
      protein: totals.protein,
      carbs: totals.carbs,
      fats: totals.fat,
      goalCalories: goalCalories
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto py-6 px-4">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Track Your Diet & Get Personalized Recommendations
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Log your daily food intake, calculate your caloric needs, and receive customized dietary suggestions
            to help you reach your fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 order-1">
            <DietForm onDietSubmit={handleDietSubmit} />
          </div>

          {calorieData && (
            <div className="lg:col-span-1 order-2">
              <CalorieDisplay calorieData={calorieData} />
            </div>
          )}

          <div className={`${calorieData ? "lg:col-span-2" : "lg:col-span-3"} order-3`}>
            <DietSuggestions dietData={dietData} />
          </div>
        </div>

        {/* Banner with App Screenshot */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Track Your Nutrition Journey
              </h2>
              <p className="text-blue-100 mb-6">
                Get detailed insights about your diet, personalized recommendations, 
                and achieve your health goals with our comprehensive tracking tools.
              </p>
              <button className="bg-white text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
                Learn More
              </button>
            </div>
            <div className="md:w-1/2 p-4">
              <div className="bg-white p-2 rounded-lg shadow-inner">
                <img 
                  src=<img src="https://images.unsplash.com/photo-1528304270437-714a2d6fbb6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4MTN8&ixlib=rb-4.1.0&q=80&w=1080" alt="fitness app dashboard with nutrition charts" />
                  alt="App Dashboard Preview" 
                  className="w-full h-auto rounded shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
            Why Track Your Diet?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="128" x2="128" y2="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="211.14" y1="80" x2="44.86" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Nutritional Intake</h3>
              <p className="text-gray-600">
                Monitor your daily macronutrients and calories to ensure you're meeting your dietary needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="128" y1="128" x2="224" y2="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M195.88,60.12A95.92,95.92,0,1,0,218,94.56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M161.94,94.06a48,48,0,1,0,13.11,43.46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Set Health Goals</h3>
              <p className="text-gray-600">
                Whether you want to lose weight, gain muscle, or maintain your health, we'll help you stay on track.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="88" y1="232" x2="168" y2="232" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M78.7,167A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24a80,80,0,0,1,51.34,142.9A24.3,24.3,0,0,0,168,186v2a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-2A24.11,24.11,0,0,0,78.7,167Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M140,70a36.39,36.39,0,0,1,24,30" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Smart Suggestions</h3>
              <p className="text-gray-600">
                Receive personalized food recommendations based on your goals and current dietary patterns.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Fitness Diet Tracker</h3>
              <p className="text-gray-400 text-sm">
                Track, analyze, and improve your nutrition habits.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">About</a>
              <a href="#" className="text-gray-300 hover:text-white">Terms</a>
              <a href="#" className="text-gray-300 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Fitness Diet Tracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;