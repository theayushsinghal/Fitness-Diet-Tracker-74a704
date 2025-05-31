import React from "react";

const CalorieDisplay = ({ calorieData }) => {
  // Default values if no data is provided
  const {
    totalCalories = 0,
    protein = 0,
    carbs = 0,
    fats = 0,
    goalCalories = 2000
  } = calorieData || {};

  // Calculate percentage of goal reached
  const goalPercentage = Math.min((totalCalories / goalCalories) * 100, 100);

  // Calculate macronutrient percentages
  const totalMacros = protein + carbs + fats;
  const proteinPercentage = totalMacros ? ((protein / totalMacros) * 100).toFixed(1) : 0;
  const carbsPercentage = totalMacros ? ((carbs / totalMacros) * 100).toFixed(1) : 0;
  const fatsPercentage = totalMacros ? ((fats / totalMacros) * 100).toFixed(1) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Daily Nutrition Summary</h2>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="128" x2="128" y2="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="211.14" y1="80" x2="44.86" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
      </div>

      {/* Calorie Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Daily Goal Progress</span>
          <span className="font-semibold">{totalCalories} / {goalCalories} kcal</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="h-4 rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${goalPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Macronutrient Breakdown */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="32" y1="216" x2="224" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="72" y1="176" x2="136" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="72" y="24" width="64" height="112" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M136,72a80,80,0,0,1,48,144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            <h3 className="font-semibold">Protein</h3>
          </div>
          <p className="text-xl font-bold mt-2">{protein}g</p>
          <p className="text-sm text-gray-600">{proteinPercentage}%</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M128,224h0a80,80,0,0,1-80-80V120h0a80,80,0,0,1,80,80Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,120h0a0,0,0,0,1,0,0v24a80,80,0,0,1-80,80h0a0,0,0,0,1,0,0V200a80,80,0,0,1,80-80Z" transform="translate(336 344) rotate(180)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,120V64h0a80,80,0,0,0-80,80v56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,120V64h0a80,80,0,0,1,80,80v56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M84.05,72.57C95.62,40.19,128,24,128,24S160.38,40.19,172,72.58" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            <h3 className="font-semibold">Carbs</h3>
          </div>
          <p className="text-xl font-bold mt-2">{carbs}g</p>
          <p className="text-sm text-gray-600">{carbsPercentage}%</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M104,147.43l98.34-97.09a8,8,0,0,1,11.32,0l24,23.6a8,8,0,0,1,0,11.32l-128.4,128.4a8,8,0,0,1-11.32,0l-71.6-72a8,8,0,0,1,0-11.31l24-24a8,8,0,0,1,11.32,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            <h3 className="font-semibold">Fats</h3>
          </div>
          <p className="text-xl font-bold mt-2">{fats}g</p>
          <p className="text-sm text-gray-600">{fatsPercentage}%</p>
        </div>
      </div>

      {/* Calorie Quality Indicator */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Calorie Quality</h3>
            <p className="text-sm text-gray-600 mt-1">
              {totalCalories < goalCalories ? "You still have calories remaining for today" : "You've reached your calorie goal"}
            </p>
          </div>
          {totalCalories < goalCalories ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="132" x2="128" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="172" r="16"/></svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalorieDisplay;