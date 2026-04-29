// --------------------------------------------------------------
// MEAL DATABASES
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
    value = parts.length === 2 ? parseFloat(parts[0]) / parseFloat(parts[1]) : parseFloat(value);
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
// WEEKLY PLAN & STATE
// --------------------------------------------------------------
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TOTAL_DAYS = 7;

let weeklyPlan = new Array(TOTAL_DAYS).fill(null);
let nextFillIndex = 0;
let dayCells = { main: [], side: [], veg: [] };
let blockerCheckboxes = [];
let currentGroceryItems = [];

const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");
const feedbackDiv = document.getElementById("feedbackMsg");

const filterChicken = document.getElementById("filterChicken");
const filterBeef = document.getElementById("filterBeef");
const filterPork = document.getElementById("filterPork");
const filterFish = document.getElementById("filterFish");

const filterPeppers = document.getElementById("filterPeppers");
const filterBroccoli = document.getElementById("filterBroccoli");
const filterCarrots = document.getElementById("filterCarrots");
const filterStringBeans = document.getElementById("filterStringBeans");

const filterToggleBtn = document.getElementById("filterToggleBtn");
const filtersCard = document.getElementById("filtersCard");

filterToggleBtn.addEventListener("click", () => {
  filtersCard.classList.toggle("show");
  filterToggleBtn.classList.toggle("open");
  filterToggleBtn.querySelector(".toggle-icon").textContent =
    filtersCard.classList.contains("show") ? "▲" : "▼";
});

const recipePanel = document.getElementById('recipePanel');
const recipeTitle = document.getElementById('recipeTitle');
const recipeContent = document.getElementById('recipeContent');
document.getElementById('closeRecipeBtn').addEventListener('click', () => recipePanel.classList.remove('show'));

function showRecipe(dishName, category) {
  recipeTitle.textContent = `${dishName} (${category})`;
  recipeContent.textContent = getRecipeText(dishName);
  recipePanel.classList.add('show');
  recipePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

const groceryToggleBtn = document.getElementById('groceryToggleBtn');
const groceryPanel = document.getElementById('groceryPanel');
const groceryItemCount = document.getElementById('groceryItemCount');
const generateGroceryBtn = document.getElementById('generateGroceryBtn');
const clearGroceryBtn = document.getElementById('clearGroceryBtn');
const groceryCategoriesContainer = document.getElementById('groceryCategoriesContainer');

groceryToggleBtn.addEventListener('click', () => groceryPanel.classList.toggle('show'));

function generateGroceryList() {
  const ingredientMap = new Map();
  weeklyPlan.forEach(meal => {
    if (!meal) return;
    const dishes = [
      { name: meal.main, blocked: meal.main === "[Blocked]" },
      { name: meal.side, blocked: meal.side === "[Blocked]" },
      { name: meal.veg, blocked: meal.veg === "[Blocked]" }
    ];
    dishes.forEach(dish => {
      if (dish.blocked) return;
      const recipe = RECIPES[dish.name];
      if (!recipe) return;
      recipe.ingredients.forEach(ing => {
        const parsed = parseQuantity(ing.quantity);
        if (!parsed) return;
        const key = `${ing.name.toLowerCase()}|${parsed.unit}`;
        if (ingredientMap.has(key)) {
          ingredientMap.get(key).quantityValue += parsed.value;
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
  currentGroceryItems = Array.from(ingredientMap.values()).map((item, index) => ({
    id: `groc-${Date.now()}-${index}`,
    name: item.name,
    quantity: formatQuantity(item.quantityValue, item.unit),
    category: item.category
  }));
  renderGroceryList();
}

function renderGroceryList() {
  if (currentGroceryItems.length === 0) {
    groceryCategoriesContainer.innerHTML = '<div class="empty-grocery-message">No ingredients yet. Click "Generate List from Plan" after filling your week.</div>';
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
    if (categories[cat]) {
      html += `<div class="grocery-category"><div class="grocery-category-title">${cat}</div><ul class="grocery-list">`;
      categories[cat].forEach(item => {
        html += `<li class="grocery-item" data-id="${item.id}">
          <div class="grocery-item-info"><span class="grocery-item-name">${item.name}</span><span class="grocery-item-quantity" data-id="${item.id}">${item.quantity}</span></div>
          <div class="grocery-item-actions"><button class="grocery-remove-btn" data-id="${item.id}" title="Remove item">✕</button></div>
        </li>`;
      });
      html += '</ul></div>';
      delete categories[cat];
    }
  }
  Object.keys(categories).forEach(cat => {
    html += `<div class="grocery-category"><div class="grocery-category-title">${cat}</div><ul class="grocery-list">`;
    categories[cat].forEach(item => {
      html += `<li class="grocery-item" data-id="${item.id}">
        <div class="grocery-item-info"><span class="grocery-item-name">${item.name}</span><span class="grocery-item-quantity" data-id="${item.id}">${item.quantity}</span></div>
        <div class="grocery-item-actions"><button class="grocery-remove-btn" data-id="${item.id}" title="Remove item">✕</button></div>
      </li>`;
    });
    html += '</ul></div>';
  });
  groceryCategoriesContainer.innerHTML = html;
  groceryItemCount.textContent = currentGroceryItems.length;

  document.querySelectorAll('.grocery-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => removeGroceryItem(btn.dataset.id));
  });
  document.querySelectorAll('.grocery-item-quantity').forEach(span => {
    span.addEventListener('click', () => makeQuantityEditable(span, span.dataset.id));
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
  input.addEventListener('keypress', e => { if (e.key === 'Enter') updateQuantity(id, input.value); });
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

generateGroceryBtn.addEventListener('click', generateGroceryList);
clearGroceryBtn.addEventListener('click', clearGroceryList);

// --------------------------------------------------------------
// FILTER & RANDOMIZATION
// --------------------------------------------------------------
function getSelectedMeats() {
  const selected = [];
  if (filterChicken.checked) selected.push("chicken");
  if (filterBeef.checked) selected.push("beef");
  if (filterPork.checked) selected.push("pork");
  if (filterFish.checked) selected.push("fish");
  return selected;
}

function getFilteredMains(selectedMeats) {
  if (selectedMeats.length === 0) return MAIN_DISHES.filter(d => d.meats.length > 0);
  return MAIN_DISHES.filter(d => d.meats.some(m => selectedMeats.includes(m)));
}

function getSelectedVeggies() {
  const selected = [];
  if (filterPeppers.checked) selected.push("peppers");
  if (filterBroccoli.checked) selected.push("broccoli");
  if (filterCarrots.checked) selected.push("carrots");
  if (filterStringBeans.checked) selected.push("stringbeans");
  return selected;
}

function getFilteredVeggies(selectedVeggies) {
  if (selectedVeggies.length === 0) return [...VEGETABLES];
  return VEGETABLES.filter(v => v.vegTypes.some(t => selectedVeggies.includes(t)));
}

function getRandomMain() {
  const eligible = getFilteredMains(getSelectedMeats());
  return eligible.length ? eligible[Math.floor(Math.random() * eligible.length)].name : null;
}
function getRandomSide() {
  return SIDES[Math.floor(Math.random() * SIDES.length)];
}
function getRandomVeg() {
  const eligible = getFilteredVeggies(getSelectedVeggies());
  return eligible.length ? eligible[Math.floor(Math.random() * eligible.length)].name : null;
}

function checkEligibility() {
  return {
    meatOk: getFilteredMains(getSelectedMeats()).length > 0,
    vegOk: getFilteredVeggies(getSelectedVeggies()).length > 0
  };
}

// --------------------------------------------------------------
// TABLE BUILDING & SYNC
// --------------------------------------------------------------
function buildTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
  dayCells = { main: [], side: [], veg: [] };
  blockerCheckboxes = [];

  for (let i = 0; i < WEEKDAYS.length; i++) {
    const row = document.createElement("tr");
    const dayCell = document.createElement("td");
    dayCell.className = "day-name";
    dayCell.textContent = WEEKDAYS[i];
    row.appendChild(dayCell);

    const mainTd = document.createElement("td");
    mainTd.className = "meal-cell";
    const sideTd = document.createElement("td");
    sideTd.className = "side-cell";
    const vegTd = document.createElement("td");
    vegTd.className = "veg-cell";

    const blockerTd = document.createElement("td");
    blockerTd.className = "blocker-cell";
    const blockerDiv = document.createElement("div");
    blockerDiv.className = "blocker-checkbox-group";

    const mainCheck = document.createElement("input");
    mainCheck.type = "checkbox";
    mainCheck.id = `blockMain_${i}`;
    const mainLabel = document.createElement("label");
    mainLabel.htmlFor = mainCheck.id;
    mainLabel.innerHTML = "Block Main Dish";
    mainLabel.prepend(mainCheck);

    const sideCheck = document.createElement("input");
    sideCheck.type = "checkbox";
    sideCheck.id = `blockSide_${i}`;
    const sideLabel = document.createElement("label");
    sideLabel.htmlFor = sideCheck.id;
    sideLabel.innerHTML = "Block Side";
    sideLabel.prepend(sideCheck);

    const vegCheck = document.createElement("input");
    vegCheck.type = "checkbox";
    vegCheck.id = `blockVeg_${i}`;
    const vegLabel = document.createElement("label");
    vegLabel.htmlFor = vegCheck.id;
    vegLabel.innerHTML = "Block Vegetable";
    vegLabel.prepend(vegCheck);

    blockerDiv.appendChild(mainLabel);
    blockerDiv.appendChild(sideLabel);
    blockerDiv.appendChild(vegLabel);
    blockerTd.appendChild(blockerDiv);

    const actionTd = document.createElement("td");
    actionTd.className = "action-cell";
    const clearBtn = document.createElement("button");
    clearBtn.className = "clear-day-btn";
    clearBtn.textContent = "Clear Day";
    clearBtn.addEventListener('click', () => clearSpecificDay(i));
    actionTd.appendChild(clearBtn);

    row.appendChild(mainTd);
    row.appendChild(sideTd);
    row.appendChild(vegTd);
    row.appendChild(blockerTd);
    row.appendChild(actionTd);
    tbody.appendChild(row);

    dayCells.main.push(mainTd);
    dayCells.side.push(sideTd);
    dayCells.veg.push(vegTd);
    blockerCheckboxes.push({ main: mainCheck, side: sideCheck, veg: vegCheck });
  }
  syncTableFromPlan();
}

function clearSpecificDay(index) {
  if (weeklyPlan[index] !== null) {
    weeklyPlan[index] = null;
    blockerCheckboxes[index].main.checked = false;
    blockerCheckboxes[index].side.checked = false;
    blockerCheckboxes[index].veg.checked = false;
    updateNextFillIndex();
    syncTableFromPlan();
    feedbackDiv.innerHTML = `${WEEKDAYS[index]} cleared. Next fill will be ${WEEKDAYS[nextFillIndex]}.`;
    feedbackDiv.style.background = "#eef4eb";
    feedbackDiv.style.color = "#2b6e3c";
  } else {
    feedbackDiv.innerHTML = `${WEEKDAYS[index]} is already empty.`;
    feedbackDiv.style.background = "#fff0e5";
    feedbackDiv.style.color = "#b45309";
  }
}

function updateNextFillIndex() {
  nextFillIndex = weeklyPlan.findIndex(meal => meal === null);
  if (nextFillIndex === -1) nextFillIndex = TOTAL_DAYS;
}

function syncTableFromPlan() {
  if (dayCells.main.length === 0) buildTable();
  for (let i = 0; i < TOTAL_DAYS; i++) {
    const meal = weeklyPlan[i];
    const mainCell = dayCells.main[i];
    const sideCell = dayCells.side[i];
    const vegCell = dayCells.veg[i];
    if (meal) {
      setCell(mainCell, meal.main, 'Main Dish');
      setCell(sideCell, meal.side, 'Side');
      setCell(vegCell, meal.veg, 'Vegetable');
    } else {
      setCell(mainCell, "— not assigned —");
      setCell(sideCell, "— not assigned —");
      setCell(vegCell, "— not assigned —");
    }
  }
}

function setCell(cell, text, category) {
  cell.textContent = text;
  cell.classList.remove('clickable', 'empty-meal');
  cell.onclick = null;
  if (text && text !== "[Blocked]" && text !== "— not assigned —") {
    cell.classList.add('clickable');
    cell.onclick = () => showRecipe(text, category);
  } else if (text === "— not assigned —") {
    cell.classList.add('empty-meal');
  }
}

function resetWeeklyPlan() {
  weeklyPlan = new Array(TOTAL_DAYS).fill(null);
  nextFillIndex = 0;
  blockerCheckboxes.forEach(cb => { cb.main.checked = false; cb.side.checked = false; cb.veg.checked = false; });
  syncTableFromPlan();
  feedbackDiv.innerHTML = "Weekly plan cleared. Use 'Generate' to start filling from Monday.";
  feedbackDiv.style.background = "#eef4eb";
  feedbackDiv.style.color = "#2b6e3c";
}

function generateAndFillNextDay() {
  if (nextFillIndex >= TOTAL_DAYS) {
    feedbackDiv.innerHTML = "Weekly plan is complete! Click 'Reset weekly plan' to start a new menu.";
    feedbackDiv.style.background = "#fff0e5";
    feedbackDiv.style.color = "#b45309";
    return false;
  }

  const idx = nextFillIndex;
  const blockers = blockerCheckboxes[idx];
  const blockMain = blockers.main.checked;
  const blockSide = blockers.side.checked;
  const blockVeg = blockers.veg.checked;

  if (blockMain && blockSide && blockVeg) {
    feedbackDiv.innerHTML = `Cannot generate day ${WEEKDAYS[idx]}: all components are blocked. Unblock at least one.`;
    feedbackDiv.style.background = "#ffe6e5";
    feedbackDiv.style.color = "#b91c1c";
    return false;
  }

  const { meatOk, vegOk } = checkEligibility();
  if (!blockMain && !meatOk) {
    const meatMsg = getSelectedMeats().length ? getSelectedMeats().join(", ") : "no protein filters (default requires any meat)";
    feedbackDiv.innerHTML = `No main dishes match protein filters (${meatMsg}). Adjust filters or block main dish.`;
    feedbackDiv.style.background = "#ffe6e5";
    feedbackDiv.style.color = "#b91c1c";
    return false;
  }
  if (!blockVeg && !vegOk) {
    const vegMsg = getSelectedVeggies().length ? getSelectedVeggies().join(", ") : "any vegetable";
    feedbackDiv.innerHTML = `No vegetable options match filters (${vegMsg}). Adjust veggie filters or block vegetable.`;
    feedbackDiv.style.background = "#ffe6e5";
    feedbackDiv.style.color = "#b91c1c";
    return false;
  }

  const mainChoice = blockMain ? "[Blocked]" : getRandomMain();
  const sideChoice = blockSide ? "[Blocked]" : getRandomSide();
  const vegChoice = blockVeg ? "[Blocked]" : getRandomVeg();

  if (!blockMain && !mainChoice) {
    feedbackDiv.innerHTML = "Error: No main dish available. Check protein filters.";
    return false;
  }
  if (!blockVeg && !vegChoice) {
    feedbackDiv.innerHTML = "Error: No vegetable available. Check veggie filters.";
    return false;
  }

  weeklyPlan[idx] = { main: mainChoice, side: sideChoice, veg: vegChoice };
  const currentDay = WEEKDAYS[idx];
  updateNextFillIndex();
  syncTableFromPlan();

  const remaining = TOTAL_DAYS - nextFillIndex;
  if (remaining === 0) {
    feedbackDiv.innerHTML = `Complete! Added meal for ${currentDay}. Weekly menu is fully set.`;
    feedbackDiv.style.background = "#dcfce7";
    feedbackDiv.style.color = "#166534";
  } else {
    feedbackDiv.innerHTML = `Added to ${currentDay}: ${mainChoice} | ${sideChoice} | ${vegChoice} · ${remaining} day(s) left.`;
    feedbackDiv.style.background = "#eef4eb";
    feedbackDiv.style.color = "#2b6e3c";
  }
  return true;
}

// --------------------------------------------------------------
// SAVE WEEK TO CALENDAR
// --------------------------------------------------------------
const saveWeekToCalendarBtn = document.getElementById('saveWeekToCalendarBtn');
const saveCalendarNote = document.getElementById('saveCalendarNote');

function formatDateForStorage(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getLastSavedWeekStart() {
  const saved = localStorage.getItem('realMealPlan_lastSavedWeekStart');
  return saved ? new Date(saved + 'T12:00:00') : null;
}
function setLastSavedWeekStart(date) {
  localStorage.setItem('realMealPlan_lastSavedWeekStart', formatDateForStorage(date));
}

function getNextMondayAfter(date) {
  const next = new Date(date);
  next.setDate(next.getDate() + ((8 - next.getDay()) % 7 || 7));
  return next;
}

function getSuggestedStartDate() {
  const last = getLastSavedWeekStart();
  return last ? getNextMondayAfter(last) : getNextMondayAfter(new Date());
}

function showDatePickerModal(callback) {
  const defaultStr = formatDateForStorage(getSuggestedStartDate());
  const modalHtml = `
    <div class="modal-overlay" id="datePickerModal">
      <div class="modal-content">
        <h3>Choose Start Date for This Week</h3>
        <p style="margin-bottom:0.5rem; color:#4a7c5c;">Monday will be this date, Tuesday the next day, etc.</p>
        <input type="date" id="startDateInput" value="${defaultStr}">
        <div class="modal-actions">
          <button class="btn btn-secondary" id="cancelModalBtn">Cancel</button>
          <button class="btn btn-primary" id="confirmModalBtn">Save</button>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('datePickerModal');
  const input = document.getElementById('startDateInput');
  const cancelBtn = document.getElementById('cancelModalBtn');
  const confirmBtn = document.getElementById('confirmModalBtn');
  const closeModal = () => modal.remove();
  cancelBtn.addEventListener('click', closeModal);
  confirmBtn.addEventListener('click', () => {
    const selectedDate = new Date(input.value + 'T12:00:00');
    closeModal();
    callback(selectedDate);
  });
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

function saveWeekToCalendar(startDate) {
  const calendarData = JSON.parse(localStorage.getItem('realMealPlan_calendar')) || {};
  let savedCount = 0;
  for (let i = 0; i < WEEKDAYS.length; i++) {
    const meal = weeklyPlan[i];
    if (!meal) continue;
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = formatDateForStorage(date);
    const mainDish = meal.main === "[Blocked]" ? "" : meal.main;
    const sideDish = meal.side === "[Blocked]" ? "" : meal.side;
    const vegDish = meal.veg === "[Blocked]" ? "" : meal.veg;
    if (mainDish || sideDish || vegDish) {
      calendarData[dateStr] = { main: mainDish, side: sideDish, veg: vegDish };
      savedCount++;
    } else {
      delete calendarData[dateStr];
    }
  }
  localStorage.setItem('realMealPlan_calendar', JSON.stringify(calendarData));
  setLastSavedWeekStart(startDate);
  return savedCount;
}

saveWeekToCalendarBtn.addEventListener('click', () => {
  const hasAnyMeal = weeklyPlan.some(meal => meal !== null);
  if (!hasAnyMeal) {
    saveCalendarNote.textContent = 'No meals planned yet. Generate a week first!';
    saveCalendarNote.style.color = '#b91c1c';
    setTimeout(() => saveCalendarNote.textContent = '', 3000);
    return;
  }
  showDatePickerModal(startDate => {
    const count = saveWeekToCalendar(startDate);
    saveCalendarNote.textContent = `Saved ${count} days to calendar starting ${startDate.toLocaleDateString()}.`;
    saveCalendarNote.style.color = '#166534';
    setTimeout(() => saveCalendarNote.textContent = '', 4000);
  });
});

// --------------------------------------------------------------
// EVENT BINDING & INIT
// --------------------------------------------------------------
function bindEvents() {
  generateBtn.addEventListener('click', generateAndFillNextDay);
  resetBtn.addEventListener('click', () => {
    resetWeeklyPlan();
    feedbackDiv.innerHTML = "Weekly menu cleared! Start generating from Monday again.";
    feedbackDiv.style.background = "#eef4eb";
    feedbackDiv.style.color = "#2b6e3c";
  });
  const filterInputs = [filterChicken, filterBeef, filterPork, filterFish, filterPeppers, filterBroccoli, filterCarrots, filterStringBeans];
  filterInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (nextFillIndex < TOTAL_DAYS) {
        feedbackDiv.innerHTML = `Filters updated · Next meal will respect new selections. ${nextFillIndex} day(s) filled.`;
        feedbackDiv.style.background = "#eef2ff";
        feedbackDiv.style.color = "#2c5282";
        setTimeout(() => {
          if (feedbackDiv.innerHTML.includes("Filters updated")) {
            feedbackDiv.style.background = "#eef4eb";
            feedbackDiv.style.color = "#2b6e3c";
          }
        }, 2000);
      } else {
        feedbackDiv.innerHTML = `Filters changed, but week is full. Reset to generate new meals with current filters.`;
      }
    });
  });
}

function init() {
  buildTable();
  resetWeeklyPlan();
  bindEvents();
  feedbackDiv.innerHTML = "Ready! Use blockers per day, set filters, then generate.";
  filtersCard.classList.remove("show");
  filterToggleBtn.classList.remove("open");
}

init();