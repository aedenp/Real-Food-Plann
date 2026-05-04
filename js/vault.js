// --------------------------------------------------------------
// SHARED MEAL DATABASES (duplicated for independence)
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
// RECIPE DATABASE (duplicated from script.js)
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

// --------------------------------------------------------------
// VAULT UI
// --------------------------------------------------------------
const vaultGrid = document.getElementById('vaultGrid');
const recipePanel = document.getElementById('recipePanel');
const recipeTitle = document.getElementById('recipeTitle');
const recipeContent = document.getElementById('recipeContent');
const closeRecipeBtn = document.getElementById('closeRecipeBtn');
const filterButtons = document.querySelectorAll('.vault-filter-btn');

let allDishes = [];

// Gather all dishes with category
MAIN_DISHES.forEach(d => allDishes.push({ name: d.name, category: 'Main Dish' }));
SIDES.forEach(s => allDishes.push({ name: s, category: 'Side' }));
VEGETABLES.forEach(v => allDishes.push({ name: v.name, category: 'Vegetable' }));

// Display dishes
function renderDishes(filter = 'all') {
  const filtered = filter === 'all' ? allDishes : allDishes.filter(d => d.category === filter);
  let html = '';
  filtered.forEach(dish => {
    html += `<div class="vault-card" data-name="${dish.name}" data-category="${dish.category}">
      <div class="vault-card-name">${dish.name}</div>
      <div class="vault-card-cat">${dish.category}</div>
    </div>`;
  });
  vaultGrid.innerHTML = html;

  // Click to show recipe
  document.querySelectorAll('.vault-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.dataset.name;
      const category = card.dataset.category;
      recipeTitle.textContent = `${name} (${category})`;
      recipeContent.textContent = getRecipeText(name);
      recipePanel.classList.add('show');
      recipePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

// Recipe text
function getRecipeText(dishName) {
  const recipe = RECIPES[dishName];
  if (!recipe) return `Recipe for "${dishName}" is not yet available.`;
  let text = `📋 **${dishName}** (${recipe.category})\n\n**Ingredients:**\n`;
  recipe.ingredients.forEach(ing => text += `- ${ing.quantity} ${ing.name}\n`);
  text += `\n**Instructions:**\n${recipe.instructions}`;
  return text;
}

// Close recipe panel
closeRecipeBtn.addEventListener('click', () => recipePanel.classList.remove('show'));

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDishes(btn.dataset.cat);
  });
});

// --------------------------------------------------------------
// AUTH HOOK (required but no data to load)
// --------------------------------------------------------------
function onUserReady(userId) {
  // Vault is static; just render the list
  renderDishes('all');
}