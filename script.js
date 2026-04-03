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

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TOTAL_DAYS = 7;

// Core state
let weeklyPlan = new Array(TOTAL_DAYS).fill(null);
let nextFillIndex = 0;
let dayCells = { main: [], side: [], veg: [] };
let blockerCheckboxes = [];

// DOM elements
const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");
const feedbackDiv = document.getElementById("feedbackMsg");

// Meat filters
const filterChicken = document.getElementById("filterChicken");
const filterBeef = document.getElementById("filterBeef");
const filterPork = document.getElementById("filterPork");
const filterFish = document.getElementById("filterFish");

// Veggie filters
const filterPeppers = document.getElementById("filterPeppers");
const filterBroccoli = document.getElementById("filterBroccoli");
const filterCarrots = document.getElementById("filterCarrots");
const filterStringBeans = document.getElementById("filterStringBeans");

// Collapsible filters
const filterToggleBtn = document.getElementById("filterToggleBtn");
const filtersCard = document.getElementById("filtersCard");

filterToggleBtn.addEventListener("click", () => {
  filtersCard.classList.toggle("show");
  filterToggleBtn.classList.toggle("open");
  const icon = filterToggleBtn.querySelector(".toggle-icon");
  icon.textContent = filtersCard.classList.contains("show") ? "▲" : "▼";
});

// Helper functions
function getSelectedMeats() {
  const selected = [];
  if (filterChicken.checked) selected.push("chicken");
  if (filterBeef.checked) selected.push("beef");
  if (filterPork.checked) selected.push("pork");
  if (filterFish.checked) selected.push("fish");
  return selected;
}

function getFilteredMains(selectedMeats) {
  if (selectedMeats.length === 0) {
    return MAIN_DISHES.filter(dish => dish.meats.length > 0);
  }
  return MAIN_DISHES.filter(dish => dish.meats.some(meat => selectedMeats.includes(meat)));
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
  return VEGETABLES.filter(veg => veg.vegTypes.some(vtype => selectedVeggies.includes(vtype)));
}

function getRandomMain() {
  const eligible = getFilteredMains(getSelectedMeats());
  if (eligible.length === 0) return null;
  return eligible[Math.floor(Math.random() * eligible.length)].name;
}

function getRandomSide() {
  return SIDES[Math.floor(Math.random() * SIDES.length)];
}

function getRandomVeg() {
  const eligible = getFilteredVeggies(getSelectedVeggies());
  if (eligible.length === 0) return null;
  return eligible[Math.floor(Math.random() * eligible.length)].name;
}

function checkEligibility() {
  return {
    meatOk: getFilteredMains(getSelectedMeats()).length > 0,
    vegOk: getFilteredVeggies(getSelectedVeggies()).length > 0
  };
}

// Table building with blockers
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

    const mainBlockId = `blockMain_${i}`;
    const sideBlockId = `blockSide_${i}`;
    const vegBlockId = `blockVeg_${i}`;

    const mainCheck = document.createElement("input");
    mainCheck.type = "checkbox";
    mainCheck.id = mainBlockId;
    const mainLabel = document.createElement("label");
    mainLabel.htmlFor = mainBlockId;
    mainLabel.innerHTML = "Block Main Dish";
    mainLabel.prepend(mainCheck);

    const sideCheck = document.createElement("input");
    sideCheck.type = "checkbox";
    sideCheck.id = sideBlockId;
    const sideLabel = document.createElement("label");
    sideLabel.htmlFor = sideBlockId;
    sideLabel.innerHTML = "Block Side";
    sideLabel.prepend(sideCheck);

    const vegCheck = document.createElement("input");
    vegCheck.type = "checkbox";
    vegCheck.id = vegBlockId;
    const vegLabel = document.createElement("label");
    vegLabel.htmlFor = vegBlockId;
    vegLabel.innerHTML = "Block Vegetable";
    vegLabel.prepend(vegCheck);

    blockerDiv.appendChild(mainLabel);
    blockerDiv.appendChild(sideLabel);
    blockerDiv.appendChild(vegLabel);
    blockerTd.appendChild(blockerDiv);

    row.appendChild(mainTd);
    row.appendChild(sideTd);
    row.appendChild(vegTd);
    row.appendChild(blockerTd);
    tbody.appendChild(row);

    dayCells.main.push(mainTd);
    dayCells.side.push(sideTd);
    dayCells.veg.push(vegTd);
    blockerCheckboxes.push({
      main: mainCheck,
      side: sideCheck,
      veg: vegCheck
    });
  }
  syncTableFromPlan();
}

function syncTableFromPlan() {
  if (dayCells.main.length === 0) buildTable();
  for (let i = 0; i < TOTAL_DAYS; i++) {
    const meal = weeklyPlan[i];
    if (meal) {
      dayCells.main[i].textContent = meal.main;
      dayCells.main[i].classList.remove("empty-meal");
      dayCells.side[i].textContent = meal.side;
      dayCells.side[i].classList.remove("empty-meal");
      dayCells.veg[i].textContent = meal.veg;
      dayCells.veg[i].classList.remove("empty-meal");
    } else {
      dayCells.main[i].textContent = "— not assigned —";
      dayCells.main[i].classList.add("empty-meal");
      dayCells.side[i].textContent = "— not assigned —";
      dayCells.side[i].classList.add("empty-meal");
      dayCells.veg[i].textContent = "— not assigned —";
      dayCells.veg[i].classList.add("empty-meal");
    }
  }
}

// Core actions
function resetWeeklyPlan() {
  weeklyPlan = new Array(TOTAL_DAYS).fill(null);
  nextFillIndex = 0;
  syncTableFromPlan();
  feedbackDiv.innerHTML = "Weekly plan cleared. Use 'Generate' to start filling from Monday.";
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
  if (!blockers) return false;

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

  const newMeal = { main: mainChoice, side: sideChoice, veg: vegChoice };
  weeklyPlan[idx] = newMeal;
  const currentDay = WEEKDAYS[idx];
  nextFillIndex++;

  dayCells.main[idx].textContent = mainChoice;
  dayCells.main[idx].classList.remove("empty-meal");
  dayCells.side[idx].textContent = sideChoice;
  dayCells.side[idx].classList.remove("empty-meal");
  dayCells.veg[idx].textContent = vegChoice;
  dayCells.veg[idx].classList.remove("empty-meal");

  const remaining = TOTAL_DAYS - nextFillIndex;
  if (remaining === 0) {
    feedbackDiv.innerHTML = `Complete! Added meal for ${currentDay}. Weekly menu is fully set.`;
    feedbackDiv.style.background = "#dcfce7";
    feedbackDiv.style.color = "#166534";
  } else {
    feedbackDiv.innerHTML = `Added to ${currentDay}: ${mainChoice} | ${sideChoice} | ${vegChoice} · ${remaining} day${remaining !== 1 ? 's' : ''} left.`;
    feedbackDiv.style.background = "#eef4eb";
    feedbackDiv.style.color = "#2b6e3c";
  }
  return true;
}

// Event binding
function bindEvents() {
  generateBtn.addEventListener("click", () => generateAndFillNextDay());
  resetBtn.addEventListener("click", () => {
    resetWeeklyPlan();
    feedbackDiv.innerHTML = "Weekly menu cleared! Start generating from Monday again.";
    feedbackDiv.style.background = "#eef4eb";
    feedbackDiv.style.color = "#2b6e3c";
  });
  const filterInputs = [
    filterChicken, filterBeef, filterPork, filterFish,
    filterPeppers, filterBroccoli, filterCarrots, filterStringBeans
  ];
  filterInputs.forEach(input => {
    input.addEventListener("change", () => {
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

// Logo fallback
const logoImg = document.getElementById("logoImage");
if (logoImg) {
  logoImg.onerror = function() {
    this.style.display = "none";
  };
}

// Initialization
function init() {
  buildTable();
  resetWeeklyPlan();
  bindEvents();
  feedbackDiv.innerHTML = "Ready! Use blockers per day, set filters, then generate.";
  filtersCard.classList.remove("show");
  filterToggleBtn.classList.remove("open");
}

init();
