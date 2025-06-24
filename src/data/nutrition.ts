export interface NutritionItem {
  id: string;
  name: string;
  category: string;
  calories: number; // per 100g
  protein: number; // grams per 100g
  carbs: number; // grams per 100g
  fat: number; // grams per 100g
  fiber: number; // grams per 100g
  sugar: number; // grams per 100g
}

export const nutritionData: NutritionItem[] = [
  // Proteins
  {
    id: '1',
    name: 'Chicken Breast',
    category: 'Protein',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0
  },
  {
    id: '2',
    name: 'Salmon',
    category: 'Protein',
    calories: 208,
    protein: 22,
    carbs: 0,
    fat: 13,
    fiber: 0,
    sugar: 0
  },
  {
    id: '3',
    name: 'Greek Yogurt',
    category: 'Protein',
    calories: 97,
    protein: 18,
    carbs: 6,
    fat: 0.4,
    fiber: 0,
    sugar: 6
  },
  {
    id: '4',
    name: 'Eggs',
    category: 'Protein',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    fiber: 0,
    sugar: 1.1
  },
  // Carbohydrates
  {
    id: '5',
    name: 'Brown Rice',
    category: 'Carbohydrate',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    fiber: 1.8,
    sugar: 0.4
  },
  {
    id: '6',
    name: 'Quinoa',
    category: 'Carbohydrate',
    calories: 120,
    protein: 4.4,
    carbs: 22,
    fat: 1.9,
    fiber: 2.8,
    sugar: 0.9
  },
  {
    id: '7',
    name: 'Sweet Potato',
    category: 'Carbohydrate',
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    fiber: 3,
    sugar: 4.2
  },
  {
    id: '8',
    name: 'Oats',
    category: 'Carbohydrate',
    calories: 389,
    protein: 17,
    carbs: 66,
    fat: 7,
    fiber: 11,
    sugar: 0.99
  },
  // Vegetables
  {
    id: '9',
    name: 'Broccoli',
    category: 'Vegetable',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    fiber: 2.6,
    sugar: 1.5
  },
  {
    id: '10',
    name: 'Spinach',
    category: 'Vegetable',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    sugar: 0.4
  },
  {
    id: '11',
    name: 'Avocado',
    category: 'Healthy Fat',
    calories: 160,
    protein: 2,
    carbs: 9,
    fat: 15,
    fiber: 7,
    sugar: 0.7
  },
  // Fruits
  {
    id: '12',
    name: 'Banana',
    category: 'Fruit',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    fiber: 2.6,
    sugar: 12
  },
  {
    id: '13',
    name: 'Apple',
    category: 'Fruit',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    fiber: 2.4,
    sugar: 10
  },
  {
    id: '14',
    name: 'Blueberries',
    category: 'Fruit',
    calories: 57,
    protein: 0.7,
    carbs: 14,
    fat: 0.3,
    fiber: 2.4,
    sugar: 10
  },
  // Nuts & Seeds
  {
    id: '15',
    name: 'Almonds',
    category: 'Healthy Fat',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    fiber: 12,
    sugar: 4.4
  },
  {
    id: '16',
    name: 'Chia Seeds',
    category: 'Healthy Fat',
    calories: 486,
    protein: 17,
    carbs: 42,
    fat: 31,
    fiber: 34,
    sugar: 0
  }
];

export const categories = ['All', 'Protein', 'Carbohydrate', 'Vegetable', 'Fruit', 'Healthy Fat'];