import React, { useState, useEffect } from "react";

const DietSuggestions = ({ dietData }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [foodSuggestions, setFoodSuggestions] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  
  useEffect(() => {
    if (dietData) {
      generateSuggestions();
    }
  }, [dietData]);
  
  const generateSuggestions = () => {
    if (!dietData) return;
    
    const { profile, totals, analysis } = dietData;
    const newSuggestions = [];
    
    // Calculate BMR and TDEE
    const weight = parseFloat(profile.weight);
    const height = parseFloat(profile.height);
    const age = parseFloat(profile.age);
    const gender = profile.gender;
    const activityLevel = profile.activityLevel;
    const goal = profile.goal;
    
    if (!weight || !height || !age) {
      newSuggestions.push({
        type: "warning",
        title: "Incomplete Profile",
        content: "Please complete your profile information for personalized recommendations."
      });
      setSuggestions(newSuggestions);
      return;
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr = gender === "male" ? bmr + 5 : bmr - 161;
    
    // Calculate TDEE based on activity level
    const activityMultipliers = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9
    };
    
    const tdee = Math.round(bmr * activityMultipliers[activityLevel]);
    
    // Calculate target calories based on goal
    let targetCalories = tdee;
    let goalDescription = "";
    
    if (goal === "lose") {
      targetCalories = Math.round(tdee * 0.8); // 20% deficit
      goalDescription = "weight loss";
    } else if (goal === "gain") {
      targetCalories = Math.round(tdee * 1.15); // 15% surplus
      goalDescription = "muscle gain";
    } else {
      goalDescription = "maintenance";
    }
    
    // Compare current calories to target
    const currentCalories = totals.calories || 0;
    const caloriesDifference = targetCalories - currentCalories;
    
    // Add calorie-based suggestion
    if (Math.abs(caloriesDifference) > 100) {
      if (caloriesDifference > 0) {
        newSuggestions.push({
          type: "info",
          title: "Increase Your Calorie Intake",
          content: `For your ${goalDescription} goal, consider adding about ${caloriesDifference} more calories daily.`
        });
      } else {
        newSuggestions.push({
          type: "warning",
          title: "Reduce Your Calorie Intake",
          content: `For your ${goalDescription} goal, consider reducing your intake by about ${Math.abs(caloriesDifference)} calories.`
        });
      }
    } else {
      newSuggestions.push({
        type: "success",
        title: "Great Calorie Balance",
        content: `Your current intake is well aligned with your ${goalDescription} goal.`
      });
    }
    
    // Add macro balance suggestions
    if (analysis && analysis.suggestions && analysis.suggestions.length > 0) {
      newSuggestions.push({
        type: "tip",
        title: "Macronutrient Balance",
        content: "Consider adjusting your macronutrients:",
        list: analysis.suggestions
      });
    } else if (analysis && analysis.isBalanced) {
      newSuggestions.push({
        type: "success",
        title: "Balanced Macronutrients",
        content: "Your macronutrient distribution is well balanced."
      });
    }
    
    // Add meal timing suggestion
    newSuggestions.push({
      type: "tip",
      title: "Meal Timing",
      content: "For optimal results, consider spreading your meals throughout the day. Aim for 3-5 meals with protein in each."
    });
    
    // Add water intake suggestion
    newSuggestions.push({
      type: "info",
      title: "Water Intake",
      content: `Aim to drink at least ${Math.round(weight * 0.033)} liters of water daily.`
    });
    
    setSuggestions(newSuggestions);
    generateFoodSuggestions(dietData);
  };
  
  const generateFoodSuggestions = (dietData) => {
    if (!dietData || !dietData.totals) return;
    
    const { totals, analysis, profile } = dietData;
    const goal = profile.goal || "maintain";
    
    // Determine which macronutrients need adjustment
    let needsMoreProtein = false;
    let needsMoreCarbs = false;
    let needsMoreFat = false;
    let needsLessCarbs = false;
    let needsLessFat = false;
    
    if (analysis && analysis.percentages) {
      needsMoreProtein = analysis.percentages.protein < 20;
      needsMoreCarbs = analysis.percentages.carbs < 45;
      needsMoreFat = analysis.percentages.fat < 20;
      needsLessCarbs = analysis.percentages.carbs > 65;
      needsLessFat = analysis.percentages.fat > 35;
    }
    
    const foodGroups = [
      {
        title: "Protein Sources",
        description: needsMoreProtein ? 
          "Increase your protein intake with these foods:" : 
          "Quality protein sources to include in your diet:",
        highlight: needsMoreProtein,
        foods: [
          {
            name: "Chicken Breast",
            nutrition: "31g protein, 165 calories per 100g",
            benefits: "Lean protein source, low in fat, versatile for many recipes",
            image: "https://images.unsplash.com/photo-1480511361210-b1b966c8d614?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3MTR8&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            name: "Greek Yogurt",
            nutrition: "10g protein, 59 calories per 100g",
            benefits: "Rich in probiotics, calcium, and protein; great for breakfast or snacks",
            image: "https://images.unsplash.com/photo-1515376044588-dae543fc2e67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3MTd8&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            name: "Lentils",
            nutrition: "9g protein, 116 calories per 100g",
            benefits: "Plant-based protein with fiber and essential minerals",
            image: "https://images.unsplash.com/photo-1587754998016-a0b90a940370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3MTh8&ixlib=rb-4.1.0&q=80&w=1080"
          }
        ]
      },
      {
        title: "Complex Carbohydrates",
        description: needsMoreCarbs ?
          "Add more of these complex carbs to your diet:" :
          (needsLessCarbs ? "Choose these quality carbs in moderation:" : "Quality carbohydrate sources:"),
        highlight: needsMoreCarbs,
        warning: needsLessCarbs,
        foods: [
          {
            name: "Sweet Potatoes",
            nutrition: "20g carbs, 86 calories per 100g",
            benefits: "Rich in fiber, vitamins, and antioxidants with a lower glycemic impact",
            image: "https://images.unsplash.com/photo-1534119139482-b530a7f9a98b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3MjJ8&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            name: "Quinoa",
            nutrition: "21g carbs, 120 calories per 100g",
            benefits: "Complete protein source with complex carbs and essential amino acids",
            image: "https://images.unsplash.com/photo-1627662055469-179b03a4a763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3MjN8&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            name: "Oats",
            nutrition: "27g carbs, 68 calories per 1/2 cup",
            benefits: "Contains beta-glucan fiber that helps control blood sugar and cholesterol",
            image: "https://images.unsplash.com/photo-1613082410785-22292e8426e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3MjV8&ixlib=rb-4.1.0&q=80&w=1080"
          }
        ]
      },
      {
        title: "Healthy Fats",
        description: needsMoreFat ?
          "Include more of these healthy fats in your meals:" :
          (needsLessFat ? "Choose these healthy fats in moderation:" : "Quality fat sources:"),
        highlight: needsMoreFat,
        warning: needsLessFat,
        foods: [
          {
            name: "Avocados",
            nutrition: "15g fat, 160 calories per 100g",
            benefits: "Rich in monounsaturated fats, potassium, and fiber",
            image: "https://images.unsplash.com/photo-1588144598377-99c36fc4bdf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3Mjl8&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            name: "Olive Oil",
            nutrition: "14g fat, 119 calories per tablespoon",
            benefits: "Contains heart-healthy monounsaturated fats and antioxidants",
            image: "https://images.unsplash.com/photo-1532275996311-accf93a01552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3MzB8&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            name: "Walnuts",
            nutrition: "65g fat, 654 calories per 100g",
            benefits: "Excellent source of omega-3 fatty acids and antioxidants",
            image: "https://images.unsplash.com/photo-1482508809494-03688cd42e7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3MzJ8&ixlib=rb-4.1.0&q=80&w=1080"
          }
        ]
      }
    ];
    
    // Add goal-specific recommendations
    if (goal === "lose") {
      foodGroups.push({
        title: "Weight Loss Friendly Foods",
        description: "These foods can help with your weight loss goals:",
        highlight: true,
        foods: [
          {
            name: "Leafy Greens",
            nutrition: "Low calorie, high volume foods",
            benefits: "Rich in fiber and nutrients, helps create fullness with fewer calories",
            image: "https://images.unsplash.com/photo-1443734276910-ba691f3f7f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3MzZ8&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            name: "Berries",
            nutrition: "Low in sugar compared to other fruits",
            benefits: "High in antioxidants and fiber, can satisfy sweet cravings",
            image: "https://images.unsplash.com/photo-1707007264848-0e23b4c02aeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3Mzl8&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            name: "Cottage Cheese",
            nutrition: "11g protein, 98 calories per 100g",
            benefits: "High protein content helps preserve muscle mass during weight loss",
            image: "https://images.unsplash.com/photo-1687273195751-14befe467d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3NDB8&ixlib=rb-4.1.0&q=80&w=1080"
          }
        ]
      });
    } else if (goal === "gain") {
      foodGroups.push({
        title: "Muscle Building Foods",
        description: "These foods can support your muscle gain goals:",
        highlight: true,
        foods: [
          {
            name: "Lean Red Meat",
            nutrition: "26g protein, 250 calories per 100g",
            benefits: "Rich in protein, iron, zinc and B vitamins for muscle growth",
            image: "https://images.unsplash.com/photo-1729934318691-e8996b902a56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3NDN8&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            name: "Eggs",
            nutrition: "6g protein per egg",
            benefits: "Complete protein with essential amino acids and choline",
            image: "https://images.unsplash.com/photo-1631117886343-8332d7452e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3NDZ8&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            name: "Salmon",
            nutrition: "25g protein, 208 calories per 100g",
            benefits: "Quality protein with omega-3 fatty acids for recovery and inflammation",
            image: "https://images.unsplash.com/photo-1432457990754-c8b5f21448de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE3NDd8&ixlib=rb-4.1.0&q=80&w=1080"
          }
        ]
      });
    }
    
    setFoodSuggestions(foodGroups);
  };
  
  const toggleDetails = (index) => {
    setShowDetails(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  if (!dietData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="88" y1="232" x2="168" y2="232" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M78.7,167A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24a80,80,0,0,1,51.34,142.9A24.3,24.3,0,0,0,168,186v2a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-2A24.11,24.11,0,0,0,78.7,167Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M140,70a36.39,36.39,0,0,1,24,30" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          <h2 className="text-2xl font-bold text-gray-800">Dietary Suggestions</h2>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-500">Submit your diet information to receive personalized suggestions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="88" y1="232" x2="168" y2="232" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M78.7,167A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24a80,80,0,0,1,51.34,142.9A24.3,24.3,0,0,0,168,186v2a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-2A24.11,24.11,0,0,0,78.7,167Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M140,70a36.39,36.39,0,0,1,24,30" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
        <h2 className="text-2xl font-bold text-gray-800">Your Diet Recommendations</h2>
      </div>

      {/* General Suggestions */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Daily Recommendations</h3>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg ${
                suggestion.type === "success" ? "bg-green-50 border-l-4 border-green-500" :
                suggestion.type === "info" ? "bg-blue-50 border-l-4 border-blue-500" :
                suggestion.type === "warning" ? "bg-yellow-50 border-l-4 border-yellow-500" :
                "bg-purple-50 border-l-4 border-purple-500"
              }`}
            >
              <div className="flex items-start">
                {suggestion.type === "success" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                )}
                {suggestion.type === "info" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="32" x2="128" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="44.84" x2="176" y2="211.16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                )}
                {suggestion.type === "warning" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="132" x2="128" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="172" r="16"/></svg>
                )}
                {suggestion.type === "tip" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="88" y1="232" x2="168" y2="232" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M78.7,167A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24a80,80,0,0,1,51.34,142.9A24.3,24.3,0,0,0,168,186v2a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-2A24.11,24.11,0,0,0,78.7,167Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M140,70a36.39,36.39,0,0,1,24,30" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                )}
                
                <div className="ml-3">
                  <h4 className="font-medium text-gray-800">{suggestion.title}</h4>
                  <p className="text-gray-600 mt-1">{suggestion.content}</p>
                  
                  {suggestion.list && suggestion.list.length > 0 && (
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      {suggestion.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Recommendations */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Foods</h3>
        
        <div className="space-y-6">
          {foodSuggestions.map((group, groupIndex) => (
            <div 
              key={groupIndex} 
              className={`p-5 rounded-lg ${
                group.highlight ? "bg-green-50 border border-green-200" : 
                group.warning ? "bg-yellow-50 border border-yellow-200" : 
                "bg-gray-50 border border-gray-200"
              }`}
            >
              <h4 className="text-lg font-medium text-gray-800 mb-2">{group.title}</h4>
              <p className="text-gray-600 mb-4">{group.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {group.foods.map((food, foodIndex) => (
                  <div key={foodIndex} className="bg-white rounded-lg shadow-sm p-4">
                    <div className="w-full h-32 mb-3 rounded-md overflow-hidden">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h5 className="font-medium text-gray-800">{food.name}</h5>
                    <p className="text-sm text-gray-500 mb-2">{food.nutrition}</p>
                    
                    <button
                      onClick={() => toggleDetails(`${groupIndex}-${foodIndex}`)}
                      className="text-blue-600 text-sm hover:text-blue-800 flex items-center"
                    >
                      {showDetails[`${groupIndex}-${foodIndex}`] ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                          <span className="ml-1">Hide Details</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="88" x2="128" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                          <span className="ml-1">Show Benefits</span>
                        </>
                      )}
                    </button>
                    
                    {showDetails[`${groupIndex}-${foodIndex}`] && (
                      <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {food.benefits}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="32" x2="128" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="44.84" x2="176" y2="211.16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          <p className="ml-2 text-gray-500 text-sm">
            These recommendations are based on your provided nutritional intake and goals. 
            For personalized medical advice, please consult with a healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DietSuggestions;