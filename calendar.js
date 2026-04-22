// --------------------------------------------------------------
// SHARED MEAL DATABASES
// --------------------------------------------------------------

const MAIN_DISHES = [
  { name: "Lemon Herb Chicken", meats: ["chicken"] },
  { name: "Chicken Stir Fry", meats: ["chicken"] },
  { name: "Chicken Parmesan", meats: ["chicken"] },
  { name: "Beef Tacos", meats: ["beef"] },
  { name: "Classic Beef Burger", meats: ["beef"] },
  { name: "Beef & Broccoli", meats: ["beef"] },
  { name: "BBQ Pork Ribs", meats: ["pork"] },
  { name: "Pork Schnitzel", meats: ["pork"] },
  { name: "Pork & Pineapple Skewers", meats: ["pork"] },
  { name: "Grilled Salmon", meats: ["fish"] },
  { name: "Shrimp Scampi", meats: ["fish"] },
  { name: "Lemon Dill Cod", meats: ["fish"] },
  { name: "Chicken & Beef Fajita", meats: ["chicken", "beef"] },
  { name: "Meat Feast Pizza", meats: ["chicken", "beef", "pork"] },
  { name: "Surf & Turf", meats: ["beef", "fish"] },
  { name: "Mixed Grill Platter", meats: ["chicken", "pork", "beef"] },
  { name: "Jambalaya (Chicken & Shrimp)", meats: ["chicken", "fish"] },
  { name: "Pork & Shrimp Dumplings", meats: ["pork", "fish"] }
];

const SIDES = [
  "Steamed Jasmine Rice",
  "Garlic Mashed Potatoes",
  "Crispy Sweet Potato Fries",
  "Buttery Dinner Roll",
  "Garlic Noodles",
  "Corn on the Cob",
  "Classic Garden Salad",
  "Roasted Sweet Potatoes",
  "Cilantro Lime Rice",
  "Crusty Baguette"
];

const VEGETABLES = [
  { name: "Sautéed Bell Peppers & Onions", vegTypes: ["peppers"] },
  { name: "Roasted Broccoli with Garlic", vegTypes: ["broccoli"] },
  { name: "Honey Glazed Carrots", vegTypes: ["carrots"] },
  { name: "Lemon String Beans", vegTypes: ["stringbeans"] },
  { name: "Cheesy Broccoli Casserole", vegTypes: ["broccoli"] },
  { name: "Stuffed Bell Peppers", vegTypes: ["peppers"] },
  { name: "Roasted Carrots & Parsnips", vegTypes: ["carrots"] },
  { name: "Szechuan String Beans", vegTypes: ["stringbeans"] },
  { name: "Broccoli & Cauliflower Medley", vegTypes: ["broccoli"] },
  { name: "Ginger Sesame Carrots", vegTypes: ["carrots"] },
  { name: "Fajita Peppers & Onions", vegTypes: ["peppers"] },
  { name: "Almondine String Beans", vegTypes: ["stringbeans"] },
  { name: "Air Fryer Broccoli Bites", vegTypes: ["broccoli"] },
  { name: "Maple Dill Carrots", vegTypes: ["carrots"] }
];

// --------------------------------------------------------------
// RECIPE DATABASE (with fictional ingredients)
// --------------------------------------------------------------
const RECIPES = {};

function createRecipe(name, category, ingredients, instructions) {
  RECIPES[name] = { category, ingredients, instructions };
}

function addRecipes(dishes, category, ingredientGenerator) {
  dishes.forEach(dish => {
    const dishName = typeof dish === 'string' ? dish : dish.name;
    const ingredients = ingredientGenerator(dishName);
    const instructions = `1. Prepare all ingredients.\n2. Cook ${dishName} according to standard method.\n3. Serve hot and enjoy!`;
    createRecipe(dishName, category, ingredients, instructions);
  });
}

function mainIngredients(dishName) {
  if (dishName.includes("Chicken")) return [
    { name: "Chicken breast", quantity: "1.5 lbs" },
    { name: "Olive oil", quantity: "2 tbsp" },
    { name: "Garlic cloves", quantity: "3" },
    { name: "Lemon", quantity: "1" },
    { name: "Fresh herbs (rosemary/thyme)", quantity: "2 sprigs" }
  ];
  if (dishName.includes("Beef")) return [
    { name: "Beef (sirloin/ground)", quantity: "1 lb" },
    { name: "Onion", quantity: "1 medium" },
    { name: "Worcestershire sauce", quantity: "1 tbsp" },
    { name: "Black pepper", quantity: "1 tsp" }
  ];
  if (dishName.includes("Pork")) return [
    { name: "Pork chops/ribs", quantity: "1.5 lbs" },
    { name: "BBQ sauce", quantity: "1/2 cup" },
    { name: "Brown sugar", quantity: "2 tbsp" },
    { name: "Paprika", quantity: "1 tsp" }
  ];
  if (dishName.includes("Salmon") || dishName.includes("Shrimp") || dishName.includes("Cod")) return [
    { name: "Salmon fillet", quantity: "1 lb" },
    { name: "Butter", quantity: "2 tbsp" },
    { name: "Lemon juice", quantity: "2 tbsp" },
    { name: "Dill", quantity: "1 tbsp chopped" }
  ];
  if (dishName.includes("Fajita")) return [
    { name: "Chicken breast", quantity: "0.75 lb" },
    { name: "Beef strips", quantity: "0.75 lb" },
    { name: "Bell peppers", quantity: "2" },
    { name: "Onion", quantity: "1 large" },
    { name: "Fajita seasoning", quantity: "2 tbsp" }
  ];
  if (dishName.includes("Pizza")) return [
    { name: "Pizza dough", quantity: "1 ball" },
    { name: "Tomato sauce", quantity: "1/2 cup" },
    { name: "Mozzarella cheese", quantity: "2 cups shredded" },
    { name: "Pepperoni", quantity: "1/2 cup" },
    { name: "Italian seasoning", quantity: "1 tsp" }
  ];
  if (dishName.includes("Surf & Turf")) return [
    { name: "Beef tenderloin", quantity: "8 oz" },
    { name: "Shrimp", quantity: "6 large" },
    { name: "Butter", quantity: "3 tbsp" },
    { name: "Garlic", quantity: "2 cloves" }
  ];
  if (dishName.includes("Mixed Grill")) return [
    { name: "Chicken thighs", quantity: "2" },
    { name: "Pork sausage", quantity: "2 links" },
    { name: "Beef steak", quantity: "8 oz" },
    { name: "BBQ rub", quantity: "2 tbsp" }
  ];
  if (dishName.includes("Jambalaya")) return [
    { name: "Chicken thighs", quantity: "0.5 lb" },
    { name: "Shrimp", quantity: "0.5 lb" },
    { name: "Andouille sausage", quantity: "0.5 lb" },
    { name: "Rice", quantity: "1 cup" },
    { name: "Creole seasoning", quantity: "1 tbsp" }
  ];
  if (dishName.includes("Dumplings")) return [
    { name: "Ground pork", quantity: "0.5 lb" },
    { name: "Shrimp", quantity: "0.25 lb chopped" },
    { name: "Dumpling wrappers", quantity: "20 pieces" },
    { name: "Soy sauce", quantity: "2 tbsp" },
    { name: "Ginger", quantity: "1 tsp grated" }
  ];
  return [{ name: "Main ingredient", quantity: "1 unit" }];
}

function sideIngredients(sideName) {
  if (sideName.includes("Rice")) return [
    { name: "Jasmine rice", quantity: "1 cup" },
    { name: "Water", quantity: "2 cups" },
    { name: "Salt", quantity: "1/2 tsp" }
  ];
  if (sideName.includes("Mashed Potatoes")) return [
    { name: "Potatoes", quantity: "2 lbs" },
    { name: "Butter", quantity: "4 tbsp" },
    { name: "Milk", quantity: "1/2 cup" },
    { name: "Garlic", quantity: "2 cloves" }
  ];
  if (sideName.includes("Sweet Potato Fries")) return [
    { name: "Sweet potatoes", quantity: "2 large" },
    { name: "Olive oil", quantity: "2 tbsp" },
    { name: "Paprika", quantity: "1 tsp" },
    { name: "Salt", quantity: "1/2 tsp" }
  ];
  if (sideName.includes("Dinner Roll")) return [
    { name: "Dinner rolls", quantity: "4 pieces" },
    { name: "Butter", quantity: "2 tbsp" }
  ];
  if (sideName.includes("Garlic Noodles")) return [
    { name: "Egg noodles", quantity: "8 oz" },
    { name: "Butter", quantity: "3 tbsp" },
    { name: "Garlic", quantity: "4 cloves minced" },
    { name: "Parmesan cheese", quantity: "1/4 cup" }
  ];
  if (sideName.includes("Corn on the Cob")) return [
    { name: "Corn ears", quantity: "4" },
    { name: "Butter", quantity: "2 tbsp" },
    { name: "Salt", quantity: "to taste" }
  ];
  if (sideName.includes("Garden Salad")) return [
    { name: "Mixed greens", quantity: "4 cups" },
    { name: "Cherry tomatoes", quantity: "1 cup" },
    { name: "Cucumber", quantity: "1/2" },
    { name: "Vinaigrette", quantity: "1/4 cup" }
  ];
  if (sideName.includes("Roasted Sweet Potatoes")) return [
    { name: "Sweet potatoes", quantity: "2 large cubed" },
    { name: "Olive oil", quantity: "2 tbsp" },
    { name: "Maple syrup", quantity: "1 tbsp" },
    { name: "Cinnamon", quantity: "1/2 tsp" }
  ];
  if (sideName.includes("Cilantro Lime Rice")) return [
    { name: "White rice", quantity: "1 cup" },
    { name: "Lime juice", quantity: "2 tbsp" },
    { name: "Cilantro", quantity: "1/4 cup chopped" }
  ];
  if (sideName.includes("Baguette")) return [
    { name: "Baguette", quantity: "1 loaf" },
    { name: "Butter", quantity: "2 tbsp" }
  ];
  return [{ name: "Side ingredient", quantity: "1 serving" }];
}

function vegIngredients(vegName) {
  if (vegName.includes("Bell Peppers")) return [
    { name: "Bell peppers", quantity: "2" },
    { name: "Onion", quantity: "1" },
    { name: "Olive oil", quantity: "1 tbsp" }
  ];
  if (vegName.includes("Broccoli")) return [
    { name: "Broccoli florets", quantity: "1 head" },
    { name: "Garlic", quantity: "2 cloves" },
    { name: "Olive oil", quantity: "1 tbsp" },
    { name: "Salt", quantity: "1/2 tsp" }
  ];
  if (vegName.includes("Carrots")) return [
    { name: "Carrots", quantity: "1 lb" },
    { name: "Honey", quantity: "2 tbsp" },
    { name: "Butter", quantity: "1 tbsp" }
  ];
  if (vegName.includes("String Beans")) return [
    { name: "String beans", quantity: "1 lb" },
    { name: "Lemon zest", quantity: "1 tsp" },
    { name: "Almonds", quantity: "1/4 cup sliced" }
  ];
  if (vegName.includes("Cheesy Broccoli")) return [
    { name: "Broccoli", quantity: "1 head" },
    { name: "Cheddar cheese", quantity: "1 cup shredded" },
    { name: "Cream of mushroom soup", quantity: "1 can" }
  ];
  if (vegName.includes("Stuffed Bell Peppers")) return [
    { name: "Bell peppers", quantity: "4" },
    { name: "Ground beef", quantity: "1 lb" },
    { name: "Rice", quantity: "1 cup cooked" },
    { name: "Tomato sauce", quantity: "1 cup" }
  ];
  if (vegName.includes("Parsnips")) return [
    { name: "Carrots", quantity: "0.5 lb" },
    { name: "Parsnips", quantity: "0.5 lb" },
    { name: "Olive oil", quantity: "1 tbsp" }
  ];
  if (vegName.includes("Szechuan String Beans")) return [
    { name: "String beans", quantity: "1 lb" },
    { name: "Soy sauce", quantity: "2 tbsp" },
    { name: "Chili paste", quantity: "1 tsp" },
    { name: "Garlic", quantity: "2 cloves" }
  ];
  if (vegName.includes("Cauliflower")) return [
    { name: "Broccoli", quantity: "1/2 head" },
    { name: "Cauliflower", quantity: "1/2 head" },
    { name: "Olive oil", quantity: "1 tbsp" }
  ];
  if (vegName.includes("Ginger Sesame Carrots")) return [
    { name: "Carrots", quantity: "1 lb" },
    { name: "Sesame oil", quantity: "1 tsp" },
    { name: "Ginger", quantity: "1 tsp grated" }
  ];
  if (vegName.includes("Fajita Peppers")) return [
    { name: "Bell peppers", quantity: "2" },
    { name: "Onion", quantity: "1" },
    { name: "Fajita seasoning", quantity: "1 tsp" }
  ];
  if (vegName.includes("Almondine")) return [
    { name: "String beans", quantity: "1 lb" },
    { name: "Almonds", quantity: "1/4 cup" },
    { name: "Butter", quantity: "1 tbsp" }
  ];
  if (vegName.includes("Air Fryer Broccoli")) return [
    { name: "Broccoli", quantity: "1 head" },
    { name: "Olive oil spray", quantity: "as needed" },
    { name: "Parmesan", quantity: "2 tbsp" }
  ];
  if (vegName.includes("Maple Dill Carrots")) return [
    { name: "Carrots", quantity: "1 lb" },
    { name: "Maple syrup", quantity: "2 tbsp" },
    { name: "Fresh dill", quantity: "1 tbsp chopped" }
  ];
  return [{ name: "Vegetable", quantity: "1 bunch" }];
}

addRecipes(MAIN_DISHES, 'Main Dish', mainIngredients);
addRecipes(SIDES, 'Side', sideIngredients);
addRecipes(VEGETABLES, 'Vegetable', vegIngredients);

function getRecipeText(dishName) {
  const recipe = RECIPES[dishName];
  if (!recipe) return `Recipe for "${dishName}" is not yet available.`;
  let text = `📋 **${dishName}** (${recipe.category})\n\n**Ingredients:**\n`;
  recipe.ingredients.forEach(ing => text += `- ${ing.quantity} ${ing.name}\n`);
  text += `\n**Instructions:**\n${recipe.instructions}`;
  return text;
}

// --------------------------------------------------------------
// GROCERY LIST CATEGORIZATION & PARSING
// --------------------------------------------------------------
const CATEGORY_KEYWORDS = {
  'Meat & Seafood': ['chicken', 'beef', 'pork', 'salmon', 'shrimp', 'cod', 'sausage', 'tenderloin', 'steak', 'ground', 'thighs', 'breast', 'pepperoni', 'dumpling', 'andouille'],
  'Produce': ['onion', 'garlic', 'lemon', 'herbs', 'rosemary', 'thyme', 'bell pepper', 'carrot', 'broccoli', 'cauliflower', 'string bean', 'parsnip', 'ginger', 'cilantro', 'lime', 'corn', 'mixed greens', 'tomato', 'cucumber', 'dill', 'potato', 'sweet potato'],
  'Dairy & Eggs': ['butter', 'milk', 'cheese', 'mozzarella', 'parmesan', 'cheddar', 'cream', 'egg'],
  'Pantry': ['oil', 'olive oil', 'sauce', 'worcestershire', 'bbq sauce', 'soy sauce', 'vinegar', 'salt', 'pepper', 'sugar', 'brown sugar', 'flour', 'rice', 'noodle', 'pasta', 'bread', 'baguette', 'roll', 'pizza dough', 'seasoning', 'paprika', 'cumin', 'chili', 'spice', 'maple syrup', 'honey', 'vinaigrette', 'canned', 'soup', 'dumpling wrapper']
};

function getCategory(ingredientName) {
  const lowerName = ingredientName.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => lowerName.includes(kw))) return category;
  }
  return 'Other';
}

function parseQuantity(qtyStr) {
  const match = qtyStr.match(/^([\d./]+)\s*([a-zA-Z]*)$/);
  if (!match) return null;
  let value = match[1];
  const unit = match[2] || '';
  if (value.includes('/')) {
    const parts = value.split('/');
    if (parts.length === 2) value = parseFloat(parts[0]) / parseFloat(parts[1]);
    else value = parseFloat(value);
  } else {
    value = parseFloat(value);
  }
  return isNaN(value) ? null : { value, unit: unit.trim() };
}

function formatQuantity(value, unit) {
  const rounded = Math.round(value * 100) / 100;
  return `${rounded} ${unit}`.trim();
}

// --------------------------------------------------------------
// CALENDAR STATE
// --------------------------------------------------------------
let currentDate = new Date();
let selectedDate = null;
let mealPlans = {};
let selectMode = false;
let selectedDates = new Set();

// Grocery state
let currentGroceryItems = [];

function loadMealPlans() {
  const saved = localStorage.getItem('realMealPlan_calendar');
  if (saved) {
    try { mealPlans = JSON.parse(saved); } catch(e) { mealPlans = {}; }
  }
}
function saveMealPlans() {
  localStorage.setItem('realMealPlan_calendar', JSON.stringify(mealPlans));
}
loadMealPlans();

// DOM Elements
const calendarGrid = document.getElementById('calendarGrid');
const currentMonthDisplay = document.getElementById('currentMonthDisplay');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const todayBtn = document.getElementById('todayBtn');
const dayDetailPanel = document.getElementById('dayDetailPanel');
const selectedDateDisplay = document.getElementById('selectedDateDisplay');
const closeDayDetailBtn = document.getElementById('closeDayDetailBtn');
const mainSelect = document.getElementById('mainSelect');
const sideSelect = document.getElementById('sideSelect');
const vegSelect = document.getElementById('vegSelect');
const saveMealBtn = document.getElementById('saveMealBtn');
const clearMealBtn = document.getElementById('clearMealBtn');
const fillWeekBtn = document.getElementById('fillWeekBtn');
const recipePanel = document.getElementById('recipePanel');
const recipeTitle = document.getElementById('recipeTitle');
const recipeContent = document.getElementById('recipeContent');
const closeRecipeBtn = document.getElementById('closeRecipeBtn');
const selectModeToggle = document.getElementById('selectModeToggle');
const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
const clearAllCalendarBtn = document.getElementById('clearAllCalendarBtn');
const selectionStatus = document.getElementById('selectionStatus');
const selectedCountSpan = document.getElementById('selectedCount');
const clearSelectionBtn = document.getElementById('clearSelectionBtn');
const groceryForWeekBtn = document.getElementById('groceryForWeekBtn');

// Grocery panel elements
const groceryToggleBtn = document.getElementById('groceryToggleBtn');
const groceryPanel = document.getElementById('groceryPanel');
const groceryItemCount = document.getElementById('groceryItemCount');
const clearGroceryBtn = document.getElementById('clearGroceryBtn');
const groceryCategoriesContainer = document.getElementById('groceryCategoriesContainer');

groceryToggleBtn.addEventListener('click', () => {
  groceryPanel.classList.toggle('show');
});

// Populate dropdowns
function populateDropdowns() {
  mainSelect.innerHTML = '<option value="">— Select Main —</option>';
  MAIN_DISHES.forEach(d => { mainSelect.innerHTML += `<option value="${d.name}">${d.name}</option>`; });
  sideSelect.innerHTML = '<option value="">— Select Side —</option>';
  SIDES.forEach(s => { sideSelect.innerHTML += `<option value="${s}">${s}</option>`; });
  vegSelect.innerHTML = '<option value="">— Select Vegetable —</option>';
  VEGETABLES.forEach(v => { vegSelect.innerHTML += `<option value="${v.name}">${v.name}</option>`; });
}
populateDropdowns();

// Recipe panel
function showRecipe(dishName) {
  recipeTitle.textContent = dishName;
  recipeContent.textContent = getRecipeText(dishName);
  recipePanel.classList.add('show');
}
closeRecipeBtn.addEventListener('click', () => recipePanel.classList.remove('show'));

// Calendar rendering
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  currentMonthDisplay.textContent = `${monthNames[month]} ${year}`;
  
  let gridHtml = '';
  let dayCount = 0;
  const totalCells = 42;
  
  for (let i = 0; i < totalCells; i++) {
    if (i < startDay || dayCount >= daysInMonth) {
      const d = new Date(year, month, i - startDay + 1);
      const isOtherMonth = i < startDay ? d.getMonth() !== month : true;
      const dateStr = formatDate(d);
      const meal = mealPlans[dateStr];
      const isSelected = selectedDates.has(dateStr);
      gridHtml += `<div class="calendar-day other-month ${isSelected ? 'selected' : ''}" data-date="${dateStr}">
        <div class="day-number">${d.getDate()}</div>
        ${meal ? `<div class="day-meal-preview">${formatMealPreview(meal)}</div>` : ''}
      </div>`;
    } else {
      dayCount++;
      const d = new Date(year, month, dayCount);
      const dateStr = formatDate(d);
      const meal = mealPlans[dateStr];
      const today = new Date();
      const isToday = d.toDateString() === today.toDateString();
      const isSelected = selectedDates.has(dateStr);
      gridHtml += `<div class="calendar-day ${isToday ? 'today' : ''} ${meal ? 'has-meal' : ''} ${isSelected ? 'selected' : ''}" data-date="${dateStr}">
        <div class="day-number">${dayCount}</div>
        ${meal ? `<div class="day-meal-preview">${formatMealPreview(meal)}</div>` : ''}
      </div>`;
    }
  }
  calendarGrid.innerHTML = gridHtml;
  
  document.querySelectorAll('.calendar-day').forEach(el => {
    el.addEventListener('click', (e) => {
      const dateStr = el.dataset.date;
      handleDayClick(dateStr, el);
    });
  });
  
  updateSelectionUI();
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatMealPreview(meal) {
  if (!meal) return '';
  const parts = [];
  if (meal.main) parts.push(`🍖 ${abbreviate(meal.main, 12)}`);
  if (meal.side) parts.push(`🍚 ${abbreviate(meal.side, 12)}`);
  if (meal.veg) parts.push(`🥬 ${abbreviate(meal.veg, 12)}`);
  return parts.map(p => `<span>${p}</span>`).join('');
}

function abbreviate(str, maxLen) {
  if (str.length <= maxLen) return str;
  return str.substring(0, maxLen-3) + '...';
}

function handleDayClick(dateStr, element) {
  if (selectMode) {
    if (selectedDates.has(dateStr)) {
      selectedDates.delete(dateStr);
    } else {
      selectedDates.add(dateStr);
    }
    renderCalendar();
  } else {
    openDayDetail(dateStr);
  }
}

function openDayDetail(dateStr) {
  selectedDate = dateStr;
  const d = new Date(dateStr + 'T12:00:00');
  selectedDateDisplay.textContent = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const meal = mealPlans[dateStr] || { main: '', side: '', veg: '' };
  mainSelect.value = meal.main;
  sideSelect.value = meal.side;
  vegSelect.value = meal.veg;
  
  dayDetailPanel.classList.add('show');
}

function closeDayDetail() {
  dayDetailPanel.classList.remove('show');
  selectedDate = null;
}
closeDayDetailBtn.addEventListener('click', closeDayDetail);

function saveCurrentMeal() {
  if (!selectedDate) return;
  const main = mainSelect.value;
  const side = sideSelect.value;
  const veg = vegSelect.value;
  if (!main && !side && !veg) {
    delete mealPlans[selectedDate];
  } else {
    mealPlans[selectedDate] = { main, side, veg };
  }
  saveMealPlans();
  renderCalendar();
  closeDayDetail();
}
saveMealBtn.addEventListener('click', saveCurrentMeal);
clearMealBtn.addEventListener('click', () => {
  mainSelect.value = '';
  sideSelect.value = '';
  vegSelect.value = '';
  saveCurrentMeal();
});

fillWeekBtn.addEventListener('click', () => {
  if (!selectedDate) {
    alert('Please select a date first.');
    return;
  }
  const start = new Date(selectedDate + 'T12:00:00');
  const dayOfWeek = start.getDay();
  const daysUntilSaturday = 6 - dayOfWeek;
  
  for (let i = 0; i <= daysUntilSaturday; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dateStr = formatDate(d);
    const randomMain = MAIN_DISHES[Math.floor(Math.random() * MAIN_DISHES.length)].name;
    const randomSide = SIDES[Math.floor(Math.random() * SIDES.length)];
    const randomVeg = VEGETABLES[Math.floor(Math.random() * VEGETABLES.length)].name;
    mealPlans[dateStr] = { main: randomMain, side: randomSide, veg: randomVeg };
  }
  saveMealPlans();
  renderCalendar();
  closeDayDetail();
});

// Selection mode
function setSelectMode(enabled) {
  selectMode = enabled;
  selectModeToggle.classList.toggle('active', enabled);
  if (!enabled) {
    selectedDates.clear();
    renderCalendar();
  }
  updateSelectionUI();
}
selectModeToggle.addEventListener('click', () => setSelectMode(!selectMode));

function updateSelectionUI() {
  const count = selectedDates.size;
  selectedCountSpan.textContent = count;
  selectionStatus.style.display = count > 0 ? 'flex' : 'none';
  deleteSelectedBtn.disabled = count === 0;
}
clearSelectionBtn.addEventListener('click', () => {
  selectedDates.clear();
  renderCalendar();
});

deleteSelectedBtn.addEventListener('click', () => {
  if (selectedDates.size === 0) return;
  if (!confirm(`Delete meals for ${selectedDates.size} selected day(s)?`)) return;
  selectedDates.forEach(dateStr => delete mealPlans[dateStr]);
  saveMealPlans();
  selectedDates.clear();
  setSelectMode(false);
  renderCalendar();
});

clearAllCalendarBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear ALL calendar meal plans? This cannot be undone.')) {
    mealPlans = {};
    saveMealPlans();
    selectedDates.clear();
    setSelectMode(false);
    renderCalendar();
    closeDayDetail();
  }
});

// --------------------------------------------------------------
// GROCERY LIST FROM SELECTED DAYS
// --------------------------------------------------------------
function generateGroceryListFromSelected() {
  if (selectedDates.size === 0) {
    alert('Please select at least one day using Select Mode first.');
    return;
  }
  
  const ingredientMap = new Map();
  
  selectedDates.forEach(dateStr => {
    const meal = mealPlans[dateStr];
    if (!meal) return;
    
    const dishes = [
      { name: meal.main, blocked: !meal.main },
      { name: meal.side, blocked: !meal.side },
      { name: meal.veg, blocked: !meal.veg }
    ];
    dishes.forEach(dish => {
      if (dish.blocked || !dish.name) return;
      const recipe = RECIPES[dish.name];
      if (!recipe) return;
      recipe.ingredients.forEach(ing => {
        const parsed = parseQuantity(ing.quantity);
        if (!parsed) return;
        const key = `${ing.name.toLowerCase()}|${parsed.unit}`;
        if (ingredientMap.has(key)) {
          const existing = ingredientMap.get(key);
          existing.quantityValue += parsed.value;
        } else {
          ingredientMap.set(key, {
            name: ing.name,
            quantityValue: parsed.value,
            unit: parsed.unit,
            category: getCategory(ing.name)
          });
        }
      });
    });
  });
  
  const items = Array.from(ingredientMap.values()).map((item, index) => ({
    id: `selgroc-${Date.now()}-${index}`,
    name: item.name,
    quantity: formatQuantity(item.quantityValue, item.unit),
    category: item.category
  }));
  
  currentGroceryItems = items;
  renderGroceryList();
  groceryPanel.classList.add('show');
}

function renderGroceryList() {
  if (currentGroceryItems.length === 0) {
    groceryCategoriesContainer.innerHTML = '<div class="empty-grocery-message">No ingredients for selected days.</div>';
    groceryItemCount.textContent = '0';
    return;
  }
  
  const categories = {};
  currentGroceryItems.forEach(item => {
    if (!categories[item.category]) categories[item.category] = [];
    categories[item.category].push(item);
  });
  
  const categoryOrder = ['Meat & Seafood', 'Produce', 'Dairy & Eggs', 'Pantry', 'Other'];
  let html = '';
  for (const cat of categoryOrder) {
    if (categories[cat] && categories[cat].length > 0) {
      html += `<div class="grocery-category"><div class="grocery-category-title">${cat}</div><ul class="grocery-list">`;
      categories[cat].forEach(item => {
        html += `<li class="grocery-item" data-id="${item.id}">
          <div class="grocery-item-info">
            <span class="grocery-item-name">${item.name}</span>
            <span class="grocery-item-quantity" data-id="${item.id}">${item.quantity}</span>
          </div>
          <div class="grocery-item-actions">
            <button class="grocery-remove-btn" data-id="${item.id}" title="Remove item">✕</button>
          </div>
        </li>`;
      });
      html += `</ul></div>`;
    }
  }
  Object.keys(categories).forEach(cat => {
    if (!categoryOrder.includes(cat) && categories[cat].length > 0) {
      html += `<div class="grocery-category"><div class="grocery-category-title">${cat}</div><ul class="grocery-list">`;
      categories[cat].forEach(item => {
        html += `<li class="grocery-item" data-id="${item.id}">
          <div class="grocery-item-info">
            <span class="grocery-item-name">${item.name}</span>
            <span class="grocery-item-quantity" data-id="${item.id}">${item.quantity}</span>
          </div>
          <div class="grocery-item-actions">
            <button class="grocery-remove-btn" data-id="${item.id}" title="Remove item">✕</button>
          </div>
        </li>`;
      });
      html += `</ul></div>`;
    }
  });
  
  groceryCategoriesContainer.innerHTML = html;
  groceryItemCount.textContent = currentGroceryItems.length;
  
  document.querySelectorAll('.grocery-remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      removeGroceryItem(id);
    });
  });
  document.querySelectorAll('.grocery-item-quantity').forEach(span => {
    span.addEventListener('click', (e) => {
      const id = span.dataset.id;
      makeQuantityEditable(span, id);
    });
  });
}

function removeGroceryItem(id) {
  currentGroceryItems = currentGroceryItems.filter(item => item.id !== id);
  renderGroceryList();
}

function makeQuantityEditable(span, id) {
  const currentQuantity = span.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentQuantity;
  input.addEventListener('blur', () => updateQuantity(id, input.value));
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') updateQuantity(id, input.value);
  });
  span.innerHTML = '';
  span.appendChild(input);
  input.focus();
}

function updateQuantity(id, newQuantity) {
  const item = currentGroceryItems.find(i => i.id === id);
  if (item) item.quantity = newQuantity;
  renderGroceryList();
}

function clearGroceryList() {
  currentGroceryItems = [];
  renderGroceryList();
}

groceryForWeekBtn.addEventListener('click', generateGroceryListFromSelected);
clearGroceryBtn.addEventListener('click', clearGroceryList);

// Navigation
prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});
nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});
todayBtn.addEventListener('click', () => {
  currentDate = new Date();
  renderCalendar();
});

// Logo fallback
document.getElementById('logoImage').onerror = function() { this.style.display = 'none'; };

renderCalendar();