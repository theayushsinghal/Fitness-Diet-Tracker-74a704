import React, { useState, useEffect } from "react";
import { calculateCaloriesFromMacros, analyzeMealBalance } from "../utils/calorieCalculator";

const DietForm = ({ onDietSubmit }) => {
  const initialMealState = { name: "", protein: "", carbs: "", fat: "", portion: "1" };
  const [userProfile, setUserProfile] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "male",
    activityLevel: "moderatelyActive",
    goal: "maintain"
  });

  const [meals, setMeals] = useState([
    { ...initialMealState, mealType: "breakfast" }
  ]);

  const [commonFoods, setCommonFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFoodSuggestions, setShowFoodSuggestions] = useState(false);
  const [activeMealIndex, setActiveMealIndex] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Simulate loading common foods from a database
  useEffect(() => {
    // This would typically come from an API or imported from foodDatabase.js
    setCommonFoods([
      { name: "Chicken Breast (100g)", protein: 31, carbs: 0, fat: 3.6 },
      { name: "Brown Rice (100g, cooked)", protein: 2.6, carbs: 23, fat: 0.9 },
      { name: "Egg (large)", protein: 6, carbs: 0.6, fat: 5 },
      { name: "Salmon (100g)", protein: 20, carbs: 0, fat: 13 },
      { name: "Broccoli (100g)", protein: 2.8, carbs: 6, fat: 0.4 },
      { name: "Greek Yogurt (100g)", protein: 10, carbs: 3.6, fat: 0.4 },
      { name: "Avocado (100g)", protein: 2, carbs: 8.5, fat: 15 },
      { name: "Oatmeal (100g, cooked)", protein: 2.5, carbs: 12, fat: 1.4 },
      { name: "Almonds (30g)", protein: 6, carbs: 3.5, fat: 14 },
      { name: "Banana (medium)", protein: 1.2, carbs: 27, fat: 0.3 }
    ]);
  }, []);

  const filteredFoods = searchTerm 
    ? commonFoods.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const mealTypes = [
    { id: "breakfast", label: "Breakfast" },
    { id: "lunch", label: "Lunch" },
    { id: "dinner", label: "Dinner" },
    { id: "snack", label: "Snack" }
  ];

  const handleUserProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMealChange = (index, field, value) => {
    const updatedMeals = [...meals];
    updatedMeals[index] = {
      ...updatedMeals[index],
      [field]: value
    };
    setMeals(updatedMeals);
  };

  const selectFood = (food, mealIndex) => {
    const updatedMeals = [...meals];
    const portion = parseFloat(updatedMeals[mealIndex].portion) || 1;
    
    updatedMeals[mealIndex] = {
      ...updatedMeals[mealIndex],
      name: food.name,
      protein: (food.protein * portion).toFixed(1),
      carbs: (food.carbs * portion).toFixed(1),
      fat: (food.fat * portion).toFixed(1)
    };
    
    setMeals(updatedMeals);
    setSearchTerm("");
    setShowFoodSuggestions(false);
  };

  const handleSearchFocus = (index) => {
    setActiveMealIndex(index);
    setShowFoodSuggestions(true);
  };

  const addMeal = () => {
    setMeals([...meals, { ...initialMealState, mealType: "snack" }]);
  };

  const removeMeal = (index) => {
    if (meals.length > 1) {
      const updatedMeals = meals.filter((_, i) => i !== index);
      setMeals(updatedMeals);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Profile validation
    if (!userProfile.weight) errors.weight = "Weight is required";
    if (!userProfile.height) errors.height = "Height is required";
    if (!userProfile.age) errors.age = "Age is required";
    
    // Meal validation
    const mealErrors = meals.map(meal => {
      const mealError = {};
      if (!meal.name) mealError.name = "Food name is required";
      if (!meal.protein) mealError.protein = "Protein value is required";
      if (!meal.carbs) mealError.carbs = "Carbs value is required";
      if (!meal.fat) mealError.fat = "Fat value is required";
      return Object.keys(mealError).length ? mealError : null;
    });
    
    if (mealErrors.some(error => error !== null)) {
      errors.meals = mealErrors;
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      // Calculate total nutritional values
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFat = 0;
      
      meals.forEach(meal => {
        totalProtein += parseFloat(meal.protein) || 0;
        totalCarbs += parseFloat(meal.carbs) || 0;
        totalFat += parseFloat(meal.fat) || 0;
      });
      
      const calorieData = calculateCaloriesFromMacros(totalProtein, totalCarbs, totalFat);
      const mealAnalysis = analyzeMealBalance({ protein: totalProtein, carbs: totalCarbs, fat: totalFat });
      
      // Pass the diet data to parent component
      onDietSubmit({
        profile: userProfile,
        meals: meals.map(meal => ({
          ...meal,
          protein: parseFloat(meal.protein) || 0,
          carbs: parseFloat(meal.carbs) || 0,
          fat: parseFloat(meal.fat) || 0,
          portion: parseFloat(meal.portion) || 1
        })),
        totals: {
          protein: totalProtein,
          carbs: totalCarbs,
          fat: totalFat,
          calories: calorieData.totalCalories
        },
        analysis: mealAnalysis
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Track Your Diet</h2>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M48,112a80,80,0,0,1,160,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M89.6,112A80,80,0,0,1,168,48a81.61,81.61,0,0,1,8.61.46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M134.66,112A80.13,80.13,0,0,1,193,65.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M88,199.3A96,96,0,0,1,32,112H224a96,96,0,0,1-56,87.3V208a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* User Profile Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={userProfile.weight}
                onChange={handleUserProfileChange}
                placeholder="Enter weight"
                className={`w-full p-2 border rounded-md ${formSubmitted && formErrors.weight ? "border-red-500" : "border-gray-300"}`}
              />
              {formSubmitted && formErrors.weight && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.weight}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={userProfile.height}
                onChange={handleUserProfileChange}
                placeholder="Enter height"
                className={`w-full p-2 border rounded-md ${formSubmitted && formErrors.height ? "border-red-500" : "border-gray-300"}`}
              />
              {formSubmitted && formErrors.height && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.height}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={userProfile.age}
                onChange={handleUserProfileChange}
                placeholder="Enter age"
                className={`w-full p-2 border rounded-md ${formSubmitted && formErrors.age ? "border-red-500" : "border-gray-300"}`}
              />
              {formSubmitted && formErrors.age && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.age}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={userProfile.gender}
                onChange={handleUserProfileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Activity Level</label>
              <select
                name="activityLevel"
                value={userProfile.activityLevel}
                onChange={handleUserProfileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="sedentary">Sedentary (little/no exercise)</option>
                <option value="lightlyActive">Lightly Active (1-3 days/week)</option>
                <option value="moderatelyActive">Moderately Active (3-5 days/week)</option>
                <option value="veryActive">Very Active (6-7 days/week)</option>
                <option value="extraActive">Extra Active (physical job/training)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Goal</label>
              <select
                name="goal"
                value={userProfile.goal}
                onChange={handleUserProfileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="lose">Weight Loss</option>
                <option value="maintain">Weight Maintenance</option>
                <option value="gain">Weight Gain</option>
              </select>
            </div>
          </div>
        </div>

        {/* Food Intake Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Food Intake</h3>
            <button
              type="button"
              onClick={addMeal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="88" x2="128" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="ml-1">Add Meal</span>
            </button>
          </div>

          <div className="space-y-6">
            {meals.map((meal, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <select
                      value={meal.mealType}
                      onChange={(e) => handleMealChange(index, "mealType", e.target.value)}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      {mealTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                    <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded">
                      Meal {index + 1}
                    </span>
                  </div>
                  
                  {meals.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMeal(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="216" y1="60" x2="40" y2="60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="20" x2="168" y2="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M200,60V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2 relative">
                    <label className="block text-gray-700 mb-1">Food Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm === "" ? meal.name : searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setShowFoodSuggestions(true);
                          setActiveMealIndex(index);
                        }}
                        onFocus={() => handleSearchFocus(index)}
                        placeholder="Search food or enter name"
                        className={`w-full p-2 border rounded-md ${
                          formSubmitted && formErrors.meals?.[index]?.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {formSubmitted && formErrors.meals?.[index]?.name && (
                        <p className="mt-1 text-red-500 text-sm">{formErrors.meals[index].name}</p>
                      )}
                      
                      {/* Food suggestions dropdown */}
                      {showFoodSuggestions && activeMealIndex === index && filteredFoods.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                          {filteredFoods.map((food, foodIndex) => (
                            <div
                              key={foodIndex}
                              className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => selectFood(food, index)}
                            >
                              <div className="font-medium">{food.name}</div>
                              <div className="text-xs text-gray-600">
                                P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Protein (g)</label>
                    <input
                      type="number"
                      value={meal.protein}
                      onChange={(e) => handleMealChange(index, "protein", e.target.value)}
                      placeholder="0"
                      className={`w-full p-2 border rounded-md ${
                        formSubmitted && formErrors.meals?.[index]?.protein ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {formSubmitted && formErrors.meals?.[index]?.protein && (
                      <p className="mt-1 text-red-500 text-sm">{formErrors.meals[index].protein}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Carbs (g)</label>
                    <input
                      type="number"
                      value={meal.carbs}
                      onChange={(e) => handleMealChange(index, "carbs", e.target.value)}
                      placeholder="0"
                      className={`w-full p-2 border rounded-md ${
                        formSubmitted && formErrors.meals?.[index]?.carbs ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {formSubmitted && formErrors.meals?.[index]?.carbs && (
                      <p className="mt-1 text-red-500 text-sm">{formErrors.meals[index].carbs}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Fat (g)</label>
                    <input
                      type="number"
                      value={meal.fat}
                      onChange={(e) => handleMealChange(index, "fat", e.target.value)}
                      placeholder="0"
                      className={`w-full p-2 border rounded-md ${
                        formSubmitted && formErrors.meals?.[index]?.fat ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {formSubmitted && formErrors.meals?.[index]?.fat && (
                      <p className="mt-1 text-red-500 text-sm">{formErrors.meals[index].fat}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-5">
                    <label className="block text-gray-700 mb-1">Portion Size</label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0.25"
                        max="3"
                        step="0.25"
                        value={meal.portion}
                        onChange={(e) => handleMealChange(index, "portion", e.target.value)}
                        className="w-full mr-4"
                      />
                      <div className="w-16 flex items-center">
                        <input
                          type="number"
                          min="0.25"
                          max="10"
                          step="0.25"
                          value={meal.portion}
                          onChange={(e) => handleMealChange(index, "portion", e.target.value)}
                          className="w-16 p-1 border border-gray-300 rounded-md text-center"
                        />
                        <span className="ml-1 text-gray-500">×</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-colors"
          >
            Calculate & Analyze Diet
          </button>
        </div>
      </form>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="32" x2="128" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="44.84" x2="176" y2="211.16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          <h4 className="font-medium ml-2">How to use this form:</h4>
        </div>
        <ol className="ml-8 mt-2 list-decimal space-y-1 text-gray-700">
          <li>Enter your personal details for accurate calorie recommendations.</li>
          <li>Add your meals by searching our food database or entering nutritional info manually.</li>
          <li>Adjust portion sizes if needed.</li>
          <li>Submit to get your analysis and nutritional recommendations.</li>
        </ol>
      </div>
    </div>
  );
};

export default DietForm;