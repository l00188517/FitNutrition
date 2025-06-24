// Nutrition Data
const nutritionData = [
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

const categories = ['All', 'Protein', 'Carbohydrate', 'Vegetable', 'Fruit', 'Healthy Fat'];

// Daily recommended values
const DAILY_TARGETS = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
    fiber: 25,
    sugar: 50,
};

// Global state
let selectedMeals = [];
let filteredFoods = [...nutritionData];
let selectedFood = null;

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const nutritionSearch = document.getElementById('nutritionSearch');
const categoryFilter = document.getElementById('categoryFilter');
const foodGrid = document.getElementById('foodGrid');
const nutritionModal = document.getElementById('nutritionModal');
const closeModal = document.getElementById('closeModal');
const closeCalculator = document.getElementById('closeCalculator');
const servingSize = document.getElementById('servingSize');
const calculatorFoodName = document.getElementById('calculatorFoodName');
const nutritionCircles = document.getElementById('nutritionCircles');
const nutritionDetails = document.getElementById('nutritionDetails');

// Meal Planner Elements
const addFoodBtn = document.getElementById('addFoodBtn');
const startJourneyBtn = document.getElementById('startJourneyBtn');
const mealCount = document.getElementById('mealCount');
const mealList = document.getElementById('mealList');
const nutritionProgress = document.getElementById('nutritionProgress');
const foodSelectorModal = document.getElementById('foodSelectorModal');
const closeFoodSelector = document.getElementById('closeFoodSelector');
const foodSearch = document.getElementById('foodSearch');
const foodSelectorGrid = document.getElementById('foodSelectorGrid');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    renderFoodGrid();
    updateMealPlanner();
    setupSmoothScrolling();
}

function setupEventListeners() {
    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Nutrition search and filter
    nutritionSearch.addEventListener('input', handleNutritionSearch);
    categoryFilter.addEventListener('change', handleCategoryFilter);
    
    // Modal events
    closeModal.addEventListener('click', closeNutritionModal);
    closeCalculator.addEventListener('click', closeNutritionModal);
    nutritionModal.addEventListener('click', handleModalBackdropClick);
    
    // Serving size change
    servingSize.addEventListener('input', updateNutritionCalculation);
    
    // Meal planner events
    addFoodBtn.addEventListener('click', openFoodSelector);
    startJourneyBtn.addEventListener('click', openFoodSelector);
    closeFoodSelector.addEventListener('click', closeFoodSelectorModal);
    foodSelectorModal.addEventListener('click', handleFoodSelectorBackdropClick);
    foodSearch.addEventListener('input', handleFoodSearch);
}

function setupSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (!mobileNav.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

function toggleMobileMenu() {
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    
    mobileNav.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

function handleNutritionSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    filterFoods(searchTerm, categoryFilter.value);
}

function handleCategoryFilter(e) {
    const category = e.target.value;
    filterFoods(nutritionSearch.value.toLowerCase(), category);
}

function filterFoods(searchTerm, category) {
    filteredFoods = nutritionData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'All' || item.category === category;
        return matchesSearch && matchesCategory;
    });
    renderFoodGrid();
}

function renderFoodGrid() {
    foodGrid.innerHTML = '';
    
    filteredFoods.forEach(food => {
        const foodCard = createFoodCard(food);
        foodGrid.appendChild(foodCard);
    });
}

function createFoodCard(food) {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.addEventListener('click', () => openNutritionCalculator(food));
    
    card.innerHTML = `
        <div class="food-card-header">
            <div class="food-info">
                <h3>${food.name}</h3>
                <span class="food-category">${food.category}</span>
            </div>
            <div class="food-calories">
                <div class="calories-value">${food.calories}</div>
                <div class="calories-unit">calories</div>
            </div>
        </div>

        <div class="nutrition-circles">
            ${createCircularProgress('Protein', food.protein, 'g', getPercentageOfDailyValue('protein', food.protein), '#10b981')}
            ${createCircularProgress('Carbs', food.carbs, 'g', getPercentageOfDailyValue('carbs', food.carbs), '#3b82f6')}
            ${createCircularProgress('Fat', food.fat, 'g', getPercentageOfDailyValue('fat', food.fat), '#f59e0b')}
        </div>

        <div class="nutrition-details">
            <div class="nutrition-detail">
                <span>Fiber</span>
                <span>${food.fiber}g</span>
            </div>
            <div class="nutrition-detail">
                <span>Sugar</span>
                <span>${food.sugar}g</span>
            </div>
        </div>

        <div class="food-info-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            Per 100g serving • % of daily values shown
        </div>
    `;
    
    return card;
}

function createCircularProgress(label, value, unit, percentage, color) {
    const size = 60;
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return `
        <div class="circular-progress">
            <svg width="${size}" height="${size}">
                <circle
                    cx="${size / 2}"
                    cy="${size / 2}"
                    r="${radius}"
                    class="progress-circle progress-bg"
                />
                <circle
                    cx="${size / 2}"
                    cy="${size / 2}"
                    r="${radius}"
                    class="progress-circle"
                    stroke="${color}"
                    stroke-width="${strokeWidth}"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${strokeDashoffset}"
                />
            </svg>
            <div class="progress-text">
                <div class="progress-percentage">${Math.round(percentage)}%</div>
            </div>
            <div class="progress-label">${label}</div>
            <div class="progress-value">${value}${unit}</div>
        </div>
    `;
}

function getPercentageOfDailyValue(nutrient, value) {
    return Math.min((value / DAILY_TARGETS[nutrient]) * 100, 100);
}

function openNutritionCalculator(food) {
    selectedFood = food;
    calculatorFoodName.textContent = food.name;
    servingSize.value = 100;
    updateNutritionCalculation();
    nutritionModal.classList.remove('hidden');
}

function updateNutritionCalculation() {
    if (!selectedFood) return;
    
    const serving = parseInt(servingSize.value) || 100;
    const nutrition = calculateNutrition(selectedFood, serving);
    
    // Update circular progress indicators
    nutritionCircles.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
            ${createCircularProgress('Calories', nutrition.calories, '', getPercentageOfDailyValue('calories', nutrition.calories), '#ef4444')}
            ${createCircularProgress('Protein', nutrition.protein, 'g', getPercentageOfDailyValue('protein', nutrition.protein), '#10b981')}
            ${createCircularProgress('Carbs', nutrition.carbs, 'g', getPercentageOfDailyValue('carbs', nutrition.carbs), '#3b82f6')}
            ${createCircularProgress('Fat', nutrition.fat, 'g', getPercentageOfDailyValue('fat', nutrition.fat), '#f59e0b')}
        </div>
    `;
    
    // Update additional details
    nutritionDetails.innerHTML = `
        <div class="nutrition-detail">
            <span>Fiber</span>
            <div style="text-align: right;">
                <span style="font-weight: 500;">${nutrition.fiber}g</span>
                <div style="font-size: 0.75rem; color: #6b7280;">
                    ${Math.round(getPercentageOfDailyValue('fiber', nutrition.fiber))}% DV
                </div>
            </div>
        </div>
        <div class="nutrition-detail">
            <span>Sugar</span>
            <div style="text-align: right;">
                <span style="font-weight: 500;">${nutrition.sugar}g</span>
                <div style="font-size: 0.75rem; color: #6b7280;">
                    ${Math.round(getPercentageOfDailyValue('sugar', nutrition.sugar))}% DV
                </div>
            </div>
        </div>
    `;
}

function calculateNutrition(food, serving) {
    const factor = serving / 100;
    return {
        calories: Math.round(food.calories * factor),
        protein: Math.round(food.protein * factor * 10) / 10,
        carbs: Math.round(food.carbs * factor * 10) / 10,
        fat: Math.round(food.fat * factor * 10) / 10,
        fiber: Math.round(food.fiber * factor * 10) / 10,
        sugar: Math.round(food.sugar * factor * 10) / 10,
    };
}

function closeNutritionModal() {
    nutritionModal.classList.add('hidden');
    selectedFood = null;
}

function handleModalBackdropClick(e) {
    if (e.target === nutritionModal) {
        closeNutritionModal();
    }
}

// Meal Planner Functions
function openFoodSelector() {
    renderFoodSelectorGrid();
    foodSelectorModal.classList.remove('hidden');
}

function closeFoodSelectorModal() {
    foodSelectorModal.classList.add('hidden');
    foodSearch.value = '';
}

function handleFoodSelectorBackdropClick(e) {
    if (e.target === foodSelectorModal) {
        closeFoodSelectorModal();
    }
}

function handleFoodSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = nutritionData.filter(food =>
        food.name.toLowerCase().includes(searchTerm)
    );
    renderFoodSelectorGrid(filtered);
}

function renderFoodSelectorGrid(foods = nutritionData) {
    foodSelectorGrid.innerHTML = '';
    
    foods.forEach(food => {
        const item = document.createElement('button');
        item.className = 'food-selector-item';
        item.addEventListener('click', () => addFoodToMeal(food));
        
        item.innerHTML = `
            <div class="food-selector-header">
                <div class="food-selector-info">
                    <h4>${food.name}</h4>
                    <span class="food-category">${food.category}</span>
                </div>
                <div class="food-selector-calories">
                    <div class="calories-value">${food.calories} cal</div>
                    <div class="calories-unit">per 100g</div>
                    <div class="xp-reward">+10 XP</div>
                </div>
            </div>
        `;
        
        foodSelectorGrid.appendChild(item);
    });
}

function addFoodToMeal(food) {
    const mealItem = {
        id: `${food.id}-${Date.now()}`,
        food: food,
        servingSize: 100
    };
    
    selectedMeals.push(mealItem);
    updateMealPlanner();
    closeFoodSelectorModal();
}

function removeMealItem(mealId) {
    selectedMeals = selectedMeals.filter(meal => meal.id !== mealId);
    updateMealPlanner();
}

function updateServingSize(mealId, newSize) {
    const meal = selectedMeals.find(m => m.id === mealId);
    if (meal) {
        meal.servingSize = Math.max(1, newSize);
        updateMealPlanner();
    }
}

function updateMealPlanner() {
    updateMealCount();
    renderMealList();
    updateNutritionProgress();
}

function updateMealCount() {
    mealCount.textContent = `${selectedMeals.length} items`;
}

function renderMealList() {
    if (selectedMeals.length === 0) {
        mealList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🍽️</div>
                <h4>Ready to start your quest?</h4>
                <p>Add your first meal to begin earning XP and unlocking achievements!</p>
                <button class="btn-primary" id="startJourneyBtn">Start Your Journey</button>
            </div>
        `;
        
        // Re-attach event listener
        document.getElementById('startJourneyBtn').addEventListener('click', openFoodSelector);
        return;
    }
    
    mealList.innerHTML = selectedMeals.map((meal, index) => {
        const nutrition = calculateNutrition(meal.food, meal.servingSize);
        return `
            <div class="meal-item" style="border: 2px solid #e5e7eb; border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1rem; background: linear-gradient(to right, #ffffff, #f9fafb);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="background: linear-gradient(to right, #10b981, #3b82f6); color: white; width: 2rem; height: 2rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; font-weight: 700;">
                            ${index + 1}
                        </div>
                        <div>
                            <h4 style="font-weight: 700; color: #1f2937; font-size: 1.125rem;">${meal.food.name}</h4>
                            <span style="font-size: 0.875rem; color: #10b981; background: #d1fae5; padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 500;">
                                ${meal.food.category}
                            </span>
                        </div>
                    </div>
                    <button onclick="removeMealItem('${meal.id}')" style="color: #ef4444; background: none; border: none; padding: 0.5rem; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='none'">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                            <line x1="10" y1="11" x2="10" y2="17"/>
                            <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                    </button>
                </div>

                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <button onclick="updateServingSize('${meal.id}', ${meal.servingSize - 10})" style="background: linear-gradient(to right, #e5e7eb, #d1d5db); border: none; padding: 0.5rem; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='linear-gradient(to right, #d1d5db, #9ca3af)'" onmouseout="this.style.background='linear-gradient(to right, #e5e7eb, #d1d5db)'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                        </button>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="number" value="${meal.servingSize}" onchange="updateServingSize('${meal.id}', parseInt(this.value))" style="width: 5rem; text-align: center; border: 2px solid #d1d5db; border-radius: 0.5rem; padding: 0.5rem 0.75rem; font-weight: 500;" min="1">
                            <span style="font-size: 0.875rem; color: #6b7280; font-weight: 500;">g</span>
                        </div>
                        <button onclick="updateServingSize('${meal.id}', ${meal.servingSize + 10})" style="background: linear-gradient(to right, #e5e7eb, #d1d5db); border: none; padding: 0.5rem; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='linear-gradient(to right, #d1d5db, #9ca3af)'" onmouseout="this.style.background='linear-gradient(to right, #e5e7eb, #d1d5db)'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                        </button>
                    </div>
                    <div style="font-size: 1.25rem; font-weight: 700; color: #1f2937; background: linear-gradient(to right, #fed7aa, #fecaca); padding: 0.5rem 1rem; border-radius: 0.5rem;">
                        ${nutrition.calories} cal
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.75rem; font-size: 0.875rem;">
                    <div style="text-align: center; background: #ecfdf5; border-radius: 0.5rem; padding: 0.75rem;">
                        <div style="font-weight: 700; color: #059669; font-size: 1.125rem;">${nutrition.protein}g</div>
                        <div style="color: #6b7280; font-weight: 500;">Protein</div>
                    </div>
                    <div style="text-align: center; background: #dbeafe; border-radius: 0.5rem; padding: 0.75rem;">
                        <div style="font-weight: 700; color: #1d4ed8; font-size: 1.125rem;">${nutrition.carbs}g</div>
                        <div style="color: #6b7280; font-weight: 500;">Carbs</div>
                    </div>
                    <div style="text-align: center; background: #fed7aa; border-radius: 0.5rem; padding: 0.75rem;">
                        <div style="font-weight: 700; color: #c2410c; font-size: 1.125rem;">${nutrition.fat}g</div>
                        <div style="color: #6b7280; font-weight: 500;">Fat</div>
                    </div>
                    <div style="text-align: center; background: #f3e8ff; border-radius: 0.5rem; padding: 0.75rem;">
                        <div style="font-weight: 700; color: #7c3aed; font-size: 1.125rem;">${nutrition.fiber}g</div>
                        <div style="color: #6b7280; font-weight: 500;">Fiber</div>
                    </div>
                    <div style="text-align: center; background: #fce7f3; border-radius: 0.5rem; padding: 0.75rem;">
                        <div style="font-weight: 700; color: #be185d; font-size: 1.125rem;">${nutrition.sugar}g</div>
                        <div style="color: #6b7280; font-weight: 500;">Sugar</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function updateNutritionProgress() {
    const totals = getTotalNutrition();
    
    nutritionProgress.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            ${createNutrientProgressBar('Calories', totals.calories, DAILY_TARGETS.calories, '', true)}
            ${createNutrientProgressBar('Protein', totals.protein, DAILY_TARGETS.protein)}
            ${createNutrientProgressBar('Carbs', totals.carbs, DAILY_TARGETS.carbs)}
            ${createNutrientProgressBar('Fat', totals.fat, DAILY_TARGETS.fat)}
            
            <div style="padding-top: 1rem; border-top: 1px solid #e5e7eb;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; font-size: 0.875rem;">
                    <div style="text-align: center; padding: 1rem; border-radius: 0.75rem; transition: all 0.3s; ${getProgressPercentage(totals.fiber, DAILY_TARGETS.fiber) >= 100 ? 'background: linear-gradient(135deg, #ecfdf5, #d1fae5); border: 2px solid #10b981;' : 'background: linear-gradient(135deg, #f9fafb, #f3f4f6);'}">
                        <div style="font-weight: 700; font-size: 1.25rem; margin-bottom: 0.25rem; ${getProgressPercentage(totals.fiber, DAILY_TARGETS.fiber) >= 100 ? 'color: #059669;' : 'color: #7c3aed;'}">${totals.fiber}g</div>
                        <div style="color: #6b7280; font-weight: 500;">Fiber</div>
                        <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">${Math.round(getProgressPercentage(totals.fiber, DAILY_TARGETS.fiber))}% DV</div>
                        ${getProgressPercentage(totals.fiber, DAILY_TARGETS.fiber) >= 100 ? '<div style="font-size: 0.75rem; color: #059669; font-weight: 700; margin-top: 0.25rem;">Complete! ⭐</div>' : ''}
                    </div>
                    
                    <div style="text-align: center; padding: 1rem; border-radius: 0.75rem; transition: all 0.3s; ${isOverTarget(totals.sugar, DAILY_TARGETS.sugar) ? 'background: linear-gradient(135deg, #fef2f2, #fee2e2); border: 2px solid #ef4444;' : 'background: linear-gradient(135deg, #f9fafb, #f3f4f6);'}">
                        <div style="font-weight: 700; font-size: 1.25rem; margin-bottom: 0.25rem; ${isOverTarget(totals.sugar, DAILY_TARGETS.sugar) ? 'color: #dc2626;' : 'color: #ec4899;'}">${totals.sugar}g</div>
                        <div style="color: #6b7280; font-weight: 500;">Sugar</div>
                        <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">${Math.round(getProgressPercentage(totals.sugar, DAILY_TARGETS.sugar))}% limit</div>
                        ${isOverTarget(totals.sugar, DAILY_TARGETS.sugar) ? '<div style="font-size: 0.75rem; color: #dc2626; font-weight: 700; margin-top: 0.25rem; animation: pulse 2s infinite;">Over limit! ⚠️</div>' : ''}
                    </div>
                </div>
            </div>

            <div style="border-radius: 0.75rem; padding: 1.5rem; transition: all 0.3s; text-align: center; ${getOverallProgress() >= 100 ? 'background: linear-gradient(135deg, #ecfdf5, #d1fae5, #dbeafe); border: 2px solid #10b981;' : getOverallProgress() >= 80 ? 'background: linear-gradient(135deg, #dbeafe, #e0e7ff, #fce7f3); border: 2px solid #3b82f6;' : 'background: linear-gradient(135deg, #f3f4f6, #e5e7eb);'}">
                <div style="font-size: 1.875rem; font-weight: 700; margin-bottom: 0.5rem; ${getOverallProgress() >= 100 ? 'color: #059669;' : getOverallProgress() >= 80 ? 'color: #1d4ed8;' : 'color: #374151;'}">${getOverallProgress()}%</div>
                <div style="font-size: 0.875rem; font-weight: 500; margin-bottom: 0.75rem; ${getOverallProgress() >= 100 ? 'color: #059669;' : getOverallProgress() >= 80 ? 'color: #1d4ed8;' : 'color: #6b7280;'}">${getOverallProgress() >= 100 ? 'Perfect Day!' : getOverallProgress() >= 80 ? 'Almost There!' : 'Daily Progress'}</div>
                
                <div style="display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                    ${getOverallProgress() >= 100 ? '<span style="font-size: 1.25rem; animation: pulse 2s infinite;">⭐</span><span style="font-size: 1.25rem; animation: bounce 2s infinite;">🏆</span><span style="font-size: 1.25rem; animation: pulse 2s infinite;">⭐</span>' : getOverallProgress() >= 80 ? '<span style="font-size: 1.25rem; animation: pulse 2s infinite;">⚡</span>' : ''}
                </div>

                <div style="font-size: 0.75rem; font-weight: 700; padding: 0.5rem 0.75rem; border-radius: 9999px; display: inline-block; ${getOverallProgress() >= 100 ? 'color: #059669; background: #d1fae5;' : getOverallProgress() >= 80 ? 'color: #1d4ed8; background: #dbeafe;' : 'color: #6b7280; background: #f3f4f6;'}">
                    ${getOverallProgress() >= 100 ? 'Perfect nutrition! +100 XP 🎉' : getOverallProgress() >= 80 ? 'Great progress! +50 XP ⚡' : '+25 XP per meal logged'}
                </div>
            </div>
        </div>
    `;
}

function createNutrientProgressBar(label, current, target, unit = 'g', isCalories = false) {
    const percentage = getProgressPercentage(current, target);
    const excess = getExcessAmount(current, target);
    const isOver = isOverTarget(current, target);
    const isComplete = percentage >= 100;
    
    return `
        <div style="padding: 1rem; border-radius: 0.75rem; border: 2px solid; transition: all 0.3s; position: relative; overflow: hidden; ${
            isOver ? 'border-color: #fca5a5; background: linear-gradient(135deg, #fef2f2, #fee2e2);' : 
            isComplete ? 'border-color: #86efac; background: linear-gradient(135deg, #ecfdf5, #d1fae5);' :
            'border-color: #e5e7eb; background: linear-gradient(135deg, #ffffff, #f9fafb);'
        }">
            ${isComplete && !isOver ? '<div style="position: absolute; top: 0.5rem; right: 0.5rem; animation: pulse 2s infinite;"><span style="color: #eab308;">⭐</span></div>' : ''}
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span style="font-weight: 600; display: flex; align-items: center; gap: 0.5rem; ${
                    isOver ? 'color: #b91c1c;' : isComplete ? 'color: #059669;' : 'color: #1f2937;'
                }">
                    ${isOver ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' : ''}
                    ${isComplete && !isOver ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>' : ''}
                    ${label}
                </span>
                <div style="text-align: right;">
                    <span style="font-size: 0.875rem; font-weight: 700; ${
                        isOver ? 'color: #b91c1c;' : isComplete ? 'color: #059669;' : 'color: #6b7280;'
                    }">
                        ${current}${isCalories ? '' : unit} / ${target}${isCalories ? '' : unit}
                    </span>
                    ${isOver ? `<div style="font-size: 0.75rem; color: #dc2626; font-weight: 500;">+${excess.toFixed(isCalories ? 0 : 1)}${isCalories ? '' : unit} over</div>` : ''}
                </div>
            </div>
            
            <div style="position: relative; background: #e5e7eb; border-radius: 9999px; height: 1rem; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
                <div style="height: 1rem; border-radius: 9999px; transition: all 0.7s ease-out; background: ${getProgressColor(percentage)}; position: relative; overflow: hidden; width: ${Math.min(percentage, 100)}%;">
                    <div style="position: absolute; inset: 0; background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent); animation: pulse 2s infinite;"></div>
                </div>
                
                ${isOver ? '<div style="position: absolute; top: 0; right: 0; height: 1rem; background: linear-gradient(to left, #dc2626, #ef4444); border-radius: 0 9999px 9999px 0; display: flex; align-items: center; justify-content: end; padding-right: 0.5rem;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg></div>' : ''}
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem;">
                <div style="font-size: 0.75rem; font-weight: 500; ${
                    isOver ? 'color: #dc2626;' : isComplete ? 'color: #059669;' : 'color: #6b7280;'
                }">
                    ${Math.round(percentage)}% of goal${isComplete && !isOver ? ' ✨' : ''}
                </div>
                ${isOver ? `<div style="font-size: 0.75rem; color: #dc2626; font-weight: 700; background: #fee2e2; padding: 0.25rem 0.5rem; border-radius: 9999px; animation: pulse 2s infinite;">${Math.round(percentage - 100)}% excess</div>` : ''}
                ${isComplete && !isOver ? '<div style="font-size: 0.75rem; color: #059669; font-weight: 700; background: #d1fae5; padding: 0.25rem 0.5rem; border-radius: 9999px;">Goal Achieved! 🎉</div>' : ''}
            </div>
        </div>
    `;
}

function getTotalNutrition() {
    return selectedMeals.reduce(
        (totals, meal) => {
            const nutrition = calculateNutrition(meal.food, meal.servingSize);
            return {
                calories: totals.calories + nutrition.calories,
                protein: Math.round((totals.protein + nutrition.protein) * 10) / 10,
                carbs: Math.round((totals.carbs + nutrition.carbs) * 10) / 10,
                fat: Math.round((totals.fat + nutrition.fat) * 10) / 10,
                fiber: Math.round((totals.fiber + nutrition.fiber) * 10) / 10,
                sugar: Math.round((totals.sugar + nutrition.sugar) * 10) / 10,
            };
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
    );
}

function getProgressPercentage(current, target) {
    return (current / target) * 100;
}

function getExcessAmount(current, target) {
    return Math.max(0, current - target);
}

function isOverTarget(current, target) {
    return current > target;
}

function getProgressColor(percentage) {
    if (percentage < 50) return 'linear-gradient(to right, #ef4444, #dc2626)';
    if (percentage < 80) return 'linear-gradient(to right, #f59e0b, #d97706)';
    if (percentage <= 100) return 'linear-gradient(to right, #10b981, #059669)';
    return 'linear-gradient(to right, #f97316, #dc2626)';
}

function getOverallProgress() {
    const totals = getTotalNutrition();
    return Math.round(
        (getProgressPercentage(totals.calories, DAILY_TARGETS.calories) +
         getProgressPercentage(totals.protein, DAILY_TARGETS.protein) +
         getProgressPercentage(totals.carbs, DAILY_TARGETS.carbs) +
         getProgressPercentage(totals.fat, DAILY_TARGETS.fat)) / 4
    );
}

// Make functions globally available for inline event handlers
window.removeMealItem = removeMealItem;
window.updateServingSize = updateServingSize;