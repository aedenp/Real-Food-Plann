// --------------------------------------------------------------
// BUDGET STATE
// --------------------------------------------------------------
const CATEGORIES = ['Meat & Seafood', 'Produce', 'Dairy & Eggs', 'Pantry', 'Other'];
let expenses = [];

function loadExpenses() {
  try { expenses = JSON.parse(localStorage.getItem('realMealPlan_budget')) || []; } catch(e) { expenses = []; }
}
function saveExpenses() { localStorage.setItem('realMealPlan_budget', JSON.stringify(expenses)); }
loadExpenses();

// DOM elements
const weekRangeLabel = document.getElementById('weekRangeLabel');
const dayStrip = document.getElementById('dayStrip');
const receiptDateHidden = document.getElementById('receiptDate');
const receiptDesc = document.getElementById('receiptDesc');
const enableBreakdown = document.getElementById('enableBreakdown');
const breakdownInputs = document.getElementById('breakdownInputs');
const receiptTotal = document.getElementById('receiptTotal');
const saveReceiptBtn = document.getElementById('saveReceiptBtn');
const weekAvgOverallEl = document.getElementById('weekAvgOverall');
const monthAvgOverallEl = document.getElementById('monthAvgOverall');
const annualTotalEl = document.getElementById('annualTotal');  // new
const weekFilter = document.getElementById('weekFilter');
const expenseTableBody = document.getElementById('expenseTableBody');
const monthlyTotalsBody = document.getElementById('monthlyTotalsBody');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const prevWeekBtn = document.getElementById('prevWeekBtn');
const nextWeekBtn = document.getElementById('nextWeekBtn');
const thisWeekBtn = document.getElementById('thisWeekBtn');

let weeklyChart = null;
let monthlyChart = null;
let displayedWeekStart = getMonday(new Date());

// ---------- HELPERS ----------
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - diff);
  d.setHours(0,0,0,0);
  return d;
}

function formatWeekRange(monday) {
  const end = new Date(monday);
  end.setDate(end.getDate() + 6);
  const opts = { month: 'short', day: 'numeric' };
  return `${monday.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', { ...opts, year: 'numeric' })}`;
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,'0');
  const d = String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}

// ---------- DAY STRIP ----------
function renderDayStrip() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(displayedWeekStart);
    d.setDate(d.getDate() + i);
    days.push(d);
  }

  let html = '';
  days.forEach(d => {
    const dayName = d.toLocaleDateString('en-US', { weekday:'short' });
    const dayNum = d.getDate();
    const dateStr = formatDate(d);
    const isToday = d.toDateString() === today.toDateString();
    const isSelected = receiptDateHidden.value === dateStr;
    html += `<div class="day-chip ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" data-date="${dateStr}">
      <span class="chip-day">${dayName}</span>
      <span class="chip-date">${dayNum}</span>
    </div>`;
  });
  dayStrip.innerHTML = html;

  dayStrip.querySelectorAll('.day-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      receiptDateHidden.value = chip.dataset.date;
      renderDayStrip();
    });
  });

  weekRangeLabel.textContent = formatWeekRange(displayedWeekStart);
}

receiptDateHidden.value = formatDate(new Date());
renderDayStrip();

prevWeekBtn.addEventListener('click', () => {
  displayedWeekStart.setDate(displayedWeekStart.getDate() - 7);
  renderDayStrip();
  const sel = new Date(receiptDateHidden.value + 'T12:00:00');
  if (sel < displayedWeekStart || sel >= new Date(displayedWeekStart.getTime() + 7*86400000))
    receiptDateHidden.value = formatDate(displayedWeekStart);
});
nextWeekBtn.addEventListener('click', () => {
  displayedWeekStart.setDate(displayedWeekStart.getDate() + 7);
  renderDayStrip();
  const sel = new Date(receiptDateHidden.value + 'T12:00:00');
  if (sel < displayedWeekStart || sel >= new Date(displayedWeekStart.getTime() + 7*86400000))
    receiptDateHidden.value = formatDate(displayedWeekStart);
});
thisWeekBtn.addEventListener('click', () => {
  displayedWeekStart = getMonday(new Date());
  receiptDateHidden.value = formatDate(new Date());
  renderDayStrip();
});

// ---------- BREAKDOWN ----------
enableBreakdown.addEventListener('change', () => {
  breakdownInputs.style.display = enableBreakdown.checked ? 'block' : 'none';
  receiptTotal.disabled = enableBreakdown.checked;
  if (enableBreakdown.checked) updateTotalFromBreakdown();
  else receiptTotal.value = '';
});
document.querySelectorAll('.cat-amount').forEach(input => {
  input.addEventListener('input', () => { if (enableBreakdown.checked) updateTotalFromBreakdown(); });
});
function updateTotalFromBreakdown() {
  let total = 0;
  document.querySelectorAll('.cat-amount').forEach(input => total += parseFloat(input.value) || 0);
  receiptTotal.value = total.toFixed(2);
}

// ---------- SAVE & DELETE ----------
saveReceiptBtn.addEventListener('click', () => {
  const date = receiptDateHidden.value;
  const desc = receiptDesc.value.trim();
  const total = parseFloat(receiptTotal.value);
  if (!date || isNaN(total) || total <= 0) {
    alert('Please enter a valid total amount.');
    return;
  }
  let breakdown = null;
  if (enableBreakdown.checked) {
    breakdown = {};
    let sum = 0;
    document.querySelectorAll('.category-row').forEach(row => {
      const cat = row.dataset.cat;
      const amount = parseFloat(row.querySelector('.cat-amount').value) || 0;
      breakdown[cat] = amount;
      sum += amount;
    });
    receiptTotal.value = sum.toFixed(2);
  }
  expenses.push({
    id: Date.now(),
    date,
    description: desc,
    total: parseFloat(receiptTotal.value),
    breakdown
  });
  saveExpenses();
  clearForm();
  refreshAll();
});

function clearForm() {
  receiptDesc.value = '';
  receiptTotal.value = '';
  enableBreakdown.checked = false;
  breakdownInputs.style.display = 'none';
  receiptTotal.disabled = false;
  document.querySelectorAll('.cat-amount').forEach(input => input.value = '');
}

window.deleteExpense = function(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveExpenses();
  refreshAll();
};

// ---------- WEEK EXPENSES ----------
function getWeekExpenses(monday) {
  const start = new Date(monday);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return expenses.filter(exp => {
    const d = new Date(exp.date + 'T12:00:00');
    return d >= start && d < end;
  });
}

// ---------- AVERAGES & ANNUAL TOTAL ----------
function updateAverages() {
  const weekSet = new Set();
  expenses.forEach(exp => {
    const monday = getMonday(new Date(exp.date + 'T12:00:00'));
    weekSet.add(formatDate(monday));
  });
  const weekCount = weekSet.size || 1;
  const total = expenses.reduce((sum, exp) => sum + exp.total, 0);
  weekAvgOverallEl.textContent = `$${(total / weekCount).toFixed(2)}`;

  const monthSet = new Set();
  expenses.forEach(exp => {
    const d = new Date(exp.date + 'T12:00:00');
    monthSet.add(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`);
  });
  const monthCount = monthSet.size || 1;
  monthAvgOverallEl.textContent = `$${(total / monthCount).toFixed(2)}`;

  // Annual total (current year)
  const currentYear = new Date().getFullYear();
  const annualTotal = expenses
    .filter(exp => new Date(exp.date + 'T12:00:00').getFullYear() === currentYear)
    .reduce((sum, exp) => sum + exp.total, 0);
  annualTotalEl.textContent = `$${annualTotal.toFixed(2)}`;
}

// ---------- WEEK FILTER & TABLES ----------
function populateWeekFilter() {
  const weekSet = new Set();
  expenses.forEach(exp => {
    const monday = getMonday(new Date(exp.date + 'T12:00:00'));
    weekSet.add(formatDate(monday));
  });
  const weeks = Array.from(weekSet).sort().reverse();
  weekFilter.innerHTML = '<option value="">All Weeks</option>';
  weeks.forEach(mondayStr => {
    const monday = new Date(mondayStr + 'T12:00:00');
    weekFilter.innerHTML += `<option value="${mondayStr}">${formatWeekRange(monday)}</option>`;
  });
}
weekFilter.addEventListener('change', renderExpenseTable);

function renderExpenseTable() {
  const selectedMonday = weekFilter.value;
  let filtered = selectedMonday ? getWeekExpenses(new Date(selectedMonday + 'T12:00:00')) : [...expenses];
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  expenseTableBody.innerHTML = filtered.map(exp => {
    const monday = getMonday(new Date(exp.date + 'T12:00:00'));
    const weekLabel = formatWeekRange(monday);
    const breakdownStr = exp.breakdown ?
      Object.entries(exp.breakdown).filter(([, v]) => v > 0).map(([cat, amt]) => `${cat}: $${amt.toFixed(2)}`).join(', ') : '—';
    return `<tr>
      <td>${exp.date}</td><td>${weekLabel}</td><td>${exp.description || '—'}</td><td>$${exp.total.toFixed(2)}</td>
      <td>${breakdownStr}</td><td><button class="clear-day-btn" onclick="deleteExpense(${exp.id})">Delete</button></td>
    </tr>`;
  }).join('');
  renderMonthlyTotalsTable();
}

function renderMonthlyTotalsTable() {
  const totals = {};
  expenses.forEach(exp => {
    const d = new Date(exp.date + 'T12:00:00');
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    totals[key] = (totals[key] || 0) + exp.total;
  });
  const sorted = Object.keys(totals).sort().reverse();
  monthlyTotalsBody.innerHTML = sorted.map(m =>
    `<tr><td>${m}</td><td>$${totals[m].toFixed(2)}</td></tr>`
  ).join('');
}

// ---------- CHARTS ----------
function ensureCharts() {
  if (typeof Chart === 'undefined') {
    setTimeout(ensureCharts, 100);
    return;
  }
  updateWeeklyChart();
  updateMonthlyChart();
}

function updateWeeklyChart() {
  const currentMonday = getMonday(new Date());
  let latestMonday = currentMonday;
  expenses.forEach(exp => {
    const expMonday = getMonday(new Date(exp.date + 'T12:00:00'));
    if (expMonday > latestMonday) latestMonday = expMonday;
  });

  const labels = [], barData = [], lineData = [];
  for (let i = 11; i >= 0; i--) {
    const monday = new Date(latestMonday);
    monday.setDate(monday.getDate() - i * 7);
    const total = getWeekExpenses(monday).reduce((sum, exp) => sum + exp.total, 0);
    labels.push(formatWeekRange(monday).substring(0, 6));
    barData.push(total);
    lineData.push(total);
  }

  const ctx = document.getElementById('weeklyChart').getContext('2d');
  if (weeklyChart) weeklyChart.destroy();

  weeklyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Weekly Total',
        data: barData,
        backgroundColor: '#4c8c4a',
        borderRadius: 6,
        order: 1
      }, {
        label: 'Trend',
        data: lineData,
        type: 'line',
        borderColor: '#2b6e3c',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#2b6e3c',
        order: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: { y: { beginAtZero: true, ticks: { callback: val => '$' + val } } },
      plugins: { tooltip: { callbacks: { label: ctx => '$' + ctx.raw.toFixed(2) } } }
    }
  });
}

function updateMonthlyChart() {
  const now = new Date();
  let latestYear = now.getFullYear();
  let latestMonth = now.getMonth();
  expenses.forEach(exp => {
    const d = new Date(exp.date + 'T12:00:00');
    const y = d.getFullYear();
    const m = d.getMonth();
    if (y > latestYear || (y === latestYear && m > latestMonth)) {
      latestYear = y;
      latestMonth = m;
    }
  });

  const totalsMap = {};
  expenses.forEach(exp => {
    const d = new Date(exp.date + 'T12:00:00');
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    totalsMap[key] = (totalsMap[key] || 0) + exp.total;
  });

  const labels = [], barData = [], lineData = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(latestYear, latestMonth - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    labels.push(d.toLocaleDateString('en-US', { month:'short', year:'2-digit' }));
    const total = totalsMap[key] || 0;
    barData.push(total);
    lineData.push(total);
  }

  const ctx = document.getElementById('monthlyChart').getContext('2d');
  if (monthlyChart) monthlyChart.destroy();

  monthlyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Monthly Total',
        data: barData,
        backgroundColor: '#e76f51',
        borderRadius: 6,
        order: 1
      }, {
        label: 'Trend',
        data: lineData,
        type: 'line',
        borderColor: '#c14a2e',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#c14a2e',
        order: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: { y: { beginAtZero: true, ticks: { callback: val => '$' + val } } },
      plugins: { tooltip: { callbacks: { label: ctx => '$' + ctx.raw.toFixed(2) } } }
    }
  });
}

// ---------- REFRESH ALL ----------
function refreshAll() {
  updateAverages();
  populateWeekFilter();
  renderExpenseTable();
  ensureCharts();
}

deleteAllBtn.addEventListener('click', () => {
  if (confirm('Delete all expenses? This cannot be undone.')) {
    expenses = [];
    saveExpenses();
    refreshAll();
  }
});

refreshAll();