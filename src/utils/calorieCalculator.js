// Calorie calculation constants
const PROTEIN_CALORIES_PER_GRAM = 4;
const CARBS_CALORIES_PER_GRAM = 4;
const FAT_CALORIES_PER_GRAM = 9;

// Activity level multipliers
const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  lightlyActive: 1.375,
  moderatelyActive: 1.55,
  veryActive: 1.725,
  extraActive: 1.9
};

/**
 * Calculate Basal Metabolic Rate (BMR) using the Mifflin-St Jeor Equation
 * @param {number} weight - Weight in kilograms
 * @param {number} height - Height in centimeters
 * @param {number} age - Age in years
 * @param {string} gender - "male" or "female"
 * @returns {number} BMR in calories
 */
export const calculateBMR = (weight, height, age, gender) => {
  const baseBMR = 10 * weight + 6.25 * height - 5 * age;
  return gender.toLowerCase() === "male" ? baseBMR + 5 : baseBMR - 161;
};

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - Activity level key from ACTIVITY_MULTIPLIERS
 * @returns {number} TDEE in calories
 */
export const calculateTDEE = (bmr, activityLevel) => {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
};

/**
 * Calculate calories from macronutrients
 * @param {number} protein - Protein in grams
 * @param {number} carbs - Carbohydrates in grams
 * @param {number} fat - Fat in grams
 * @returns {Object} Calorie breakdown and total
 */
export const calculateCaloriesFromMacros = (protein, carbs, fat) => {
  const proteinCalories = protein * PROTEIN_CALORIES_PER_GRAM;
  const carbCalories = carbs * CARBS_CALORIES_PER_GRAM;
  const fatCalories = fat * FAT_CALORIES_PER_GRAM;
  
  return {
    proteinCalories,
    carbCalories,
    fatCalories,
    totalCalories: proteinCalories + carbCalories + fatCalories
  };
};

/**
 * Calculate recommended macronutrient distribution
 * @param {number} totalCalories - Total daily calories
 * @param {string} goal - "maintain", "lose", or "gain"
 * @returns {Object} Recommended macros in grams
 */
export const calculateMacroDistribution = (totalCalories, goal) => {
  let proteinPercentage, carbsPercentage, fatPercentage;

  switch(goal) {
    case "lose":
      proteinPercentage = 0.40; // Higher protein for muscle preservation
      carbsPercentage = 0.35;
      fatPercentage = 0.25;
      break;
    case "gain":
      proteinPercentage = 0.30;
      carbsPercentage = 0.50; // Higher carbs for energy
      fatPercentage = 0.20;
      break;
    default: // maintain
      proteinPercentage = 0.30;
      carbsPercentage = 0.40;
      fatPercentage = 0.30;
  }

  const proteinCalories = totalCalories * proteinPercentage;
  const carbCalories = totalCalories * carbsPercentage;
  const fatCalories = totalCalories * fatPercentage;

  return {
    protein: Math.round(proteinCalories / PROTEIN_CALORIES_PER_GRAM),
    carbs: Math.round(carbCalories / CARBS_CALORIES_PER_GRAM),
    fat: Math.round(fatCalories / FAT_CALORIES_PER_GRAM)
  };
};

/**
 * Analyze meal nutritional balance
 * @param {Object} macros - Object containing protein, carbs, and fat in grams
 * @returns {Object} Analysis results
 */
export const analyzeMealBalance = (macros) => {
  const { protein, carbs, fat } = macros;
  const totalGrams = protein + carbs + fat;
  
  const proteinPercentage = (protein / totalGrams) * 100;
  const carbsPercentage = (carbs / totalGrams) * 100;
  const fatPercentage = (fat / totalGrams) * 100;

  return {
    isBalanced: (
      proteinPercentage >= 20 && 
      proteinPercentage <= 35 &&
      carbsPercentage >= 45 &&
      carbsPercentage <= 65 &&
      fatPercentage >= 20 &&
      fatPercentage <= 35
    ),
    percentages: {
      protein: Math.round(proteinPercentage),
      carbs: Math.round(carbsPercentage),
      fat: Math.round(fatPercentage)
    },
    suggestions: generateNutritionalSuggestions(proteinPercentage, carbsPercentage, fatPercentage)
  };
};

/**
 * Generate nutritional suggestions based on macro percentages
 * @param {number} proteinPercentage
 * @param {number} carbsPercentage
 * @param {number} fatPercentage
 * @returns {Array} Array of suggestion strings
 */
const generateNutritionalSuggestions = (proteinPercentage, carbsPercentage, fatPercentage) => {
  const suggestions = [];

  if (proteinPercentage < 20) {
    suggestions.push("Consider adding more lean protein sources like chicken, fish, or legumes");
  }
  if (carbsPercentage < 45) {
    suggestions.push("Include more complex carbohydrates from whole grains and vegetables");
  }
  if (carbsPercentage > 65) {
    suggestions.push("Reduce refined carbohydrates and balance with more protein and healthy fats");
  }
  if (fatPercentage < 20) {
    suggestions.push("Add healthy fats from sources like avocados, nuts, and olive oil");
  }
  if (fatPercentage > 35) {
    suggestions.push("Reduce fat intake and focus on leaner protein sources");
  }

  return suggestions;
};