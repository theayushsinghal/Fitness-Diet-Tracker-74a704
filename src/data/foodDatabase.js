const foodDatabase = {
  // Protein-Rich Foods
  proteins: [
    {
      id: "p1",
      name: "Chicken Breast",
      category: "Protein",
      serving: "100g",
      nutrition: {
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        fiber: 0
      },
      tags: ["lean meat", "poultry"],
      image: "https://images.unsplash.com/photo-1661362290679-c7da7ff5ee5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4NDR8&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "p2",
      name: "Salmon",
      category: "Protein",
      serving: "100g",
      nutrition: {
        calories: 208,
        protein: 20,
        carbs: 0,
        fat: 13,
        fiber: 0
      },
      tags: ["fish", "omega-3"],
      image: "https://images.unsplash.com/photo-1721904817610-47c197a7e0b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4NDV8&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "p3",
      name: "Greek Yogurt",
      category: "Protein",
      serving: "100g",
      nutrition: {
        calories: 59,
        protein: 10,
        carbs: 3.6,
        fat: 0.4,
        fiber: 0
      },
      tags: ["dairy", "breakfast"],
      image: "https://images.unsplash.com/photo-1723389045909-ac392e0a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4NDd8&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ],

  // Carbohydrate-Rich Foods
  carbohydrates: [
    {
      id: "c1",
      name: "Brown Rice",
      category: "Carbs",
      serving: "100g cooked",
      nutrition: {
        calories: 112,
        protein: 2.6,
        carbs: 23,
        fat: 0.9,
        fiber: 1.8
      },
      tags: ["whole grain", "complex carbs"],
      image: "https://images.unsplash.com/photo-1692499090949-7325f5042064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4NTB8&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "c2",
      name: "Sweet Potato",
      category: "Carbs",
      serving: "100g",
      nutrition: {
        calories: 86,
        protein: 1.6,
        carbs: 20,
        fat: 0.1,
        fiber: 3
      },
      tags: ["vegetables", "complex carbs"],
      image: "https://images.unsplash.com/photo-1529589510304-b7e994a92f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4NTJ8&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "c3",
      name: "Oatmeal",
      category: "Carbs",
      serving: "100g cooked",
      nutrition: {
        calories: 68,
        protein: 2.5,
        carbs: 12,
        fat: 1.4,
        fiber: 1.7
      },
      tags: ["breakfast", "whole grain"],
      image: "https://images.unsplash.com/photo-1527811727417-db03805bb4af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4NTR8&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ],

  // Healthy Fats
  fats: [
    {
      id: "f1",
      name: "Avocado",
      category: "Fats",
      serving: "100g",
      nutrition: {
        calories: 160,
        protein: 2,
        carbs: 8.5,
        fat: 14.7,
        fiber: 6.7
      },
      tags: ["healthy fats", "fruits"],
      image: "https://images.unsplash.com/photo-1704960961297-3e65f2f2a5db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4NTZ8&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "f2",
      name: "Almonds",
      category: "Fats",
      serving: "30g",
      nutrition: {
        calories: 164,
        protein: 6,
        carbs: 6.1,
        fat: 14,
        fiber: 3.5
      },
      tags: ["nuts", "snacks"],
      image: "https://images.unsplash.com/photo-1512454049206-bf6d9e5ccc97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4NTh8&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "f3",
      name: "Olive Oil",
      category: "Fats",
      serving: "1 tbsp",
      nutrition: {
        calories: 119,
        protein: 0,
        carbs: 0,
        fat: 13.5,
        fiber: 0
      },
      tags: ["oils", "cooking"],
      image: "https://images.unsplash.com/photo-1620905969432-df04fca19ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4NjB8&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ],

  // Vegetables
  vegetables: [
    {
      id: "v1",
      name: "Broccoli",
      category: "Vegetables",
      serving: "100g",
      nutrition: {
        calories: 34,
        protein: 2.8,
        carbs: 6.6,
        fat: 0.4,
        fiber: 2.6
      },
      tags: ["vegetables", "greens"],
      image: "https://images.unsplash.com/photo-1478900160460-2bfa23c92a4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4NjJ8&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "v2",
      name: "Spinach",
      category: "Vegetables",
      serving: "100g",
      nutrition: {
        calories: 23,
        protein: 2.9,
        carbs: 3.6,
        fat: 0.4,
        fiber: 2.2
      },
      tags: ["leafy greens", "vegetables"],
      image: "https://images.unsplash.com/photo-1507688270584-0566e2c493f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4NjR8&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ],

  // Fruits
  fruits: [
    {
      id: "fr1",
      name: "Banana",
      category: "Fruits",
      serving: "1 medium",
      nutrition: {
        calories: 105,
        protein: 1.3,
        carbs: 27,
        fat: 0.3,
        fiber: 3.1
      },
      tags: ["fruits", "snacks"],
      image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4NjZ8&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "fr2",
      name: "Blueberries",
      category: "Fruits",
      serving: "100g",
      nutrition: {
        calories: 57,
        protein: 0.7,
        carbs: 14.5,
        fat: 0.3,
        fiber: 2.4
      },
      tags: ["fruits", "berries", "antioxidants"],
      image: "https://images.unsplash.com/photo-1719487218767-9baad225115e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDg2ODE4Njh8&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ]
};

// Helper function to search foods by name
export const searchFoods = (query) => {
  const searchTerm = query.toLowerCase();
  const allFoods = [
    ...foodDatabase.proteins,
    ...foodDatabase.carbohydrates,
    ...foodDatabase.fats,
    ...foodDatabase.vegetables,
    ...foodDatabase.fruits
  ];
  
  return allFoods.filter(food => 
    food.name.toLowerCase().includes(searchTerm) ||
    food.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

// Helper function to get food by category
export const getFoodsByCategory = (category) => {
  return foodDatabase[category.toLowerCase()] || [];
};

// Helper function to get food by ID
export const getFoodById = (id) => {
  const allFoods = [
    ...foodDatabase.proteins,
    ...foodDatabase.carbohydrates,
    ...foodDatabase.fats,
    ...foodDatabase.vegetables,
    ...foodDatabase.fruits
  ];
  
  return allFoods.find(food => food.id === id);
};

export default foodDatabase;