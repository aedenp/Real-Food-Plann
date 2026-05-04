// --------------------------------------------------------------
// HISTORY STATE
// --------------------------------------------------------------
const WEEKDAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
let currentWeekStart = getMonday(new Date());  // displayed week
let mealHistory = [];

// Firestore functions
function saveHistory() {
  if (!currentUser) return;
  db.collection('users').doc(currentUser.uid).collection('data').doc('mealHistory')
    .set({ mealHistory })
    .catch(err => console.error('Save mealHistory failed:', err));
}

function loadHistory(callback) {
  if (!currentUser) { callback(); return; }
  db.collection('users').doc(currentUser.uid).collection('data').doc('mealHistory')
    .get()
    .then(doc => {
      if (doc.exists) {
        mealHistory = doc.data().mealHistory || [];
      } else {
        mealHistory = [];
      }
      callback();
    })
    .catch(() => {
      mealHistory = [];
      callback();
    });
}

// We also need to read the calendar plans (same collection as calendar page)
function getCalendarPlans(callback) {
  if (!currentUser) { callback({}); return; }
  db.collection('users').doc(currentUser.uid).collection('data').doc('calendar')
    .get()
    .then(doc => {
      if (doc.exists) {
        callback(doc.data().mealPlans || {});
      } else {
        callback({});
      }
    })
    .catch(() => callback({}));
}

function saveCalendarPlans(mealPlans) {
  if (!currentUser) return;
  db.collection('users').doc(currentUser.uid).collection('data').doc('calendar')
    .set({ mealPlans })
    .catch(err => console.error('Save calendar plans failed:', err));
}

// Get date string (YYYY-MM-DD) from a Date object
function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Get Monday of a given date
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - diff);
  d.setHours(0,0,0,0);
  return d;
}

// Format the week range label
function formatWeekRange(monday) {
  const end = new Date(monday);
  end.setDate(end.getDate() + 6);
  const opts = { month:'short', day:'numeric' };
  return `${monday.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', {...opts, year:'numeric'})}`;
}

// DOM elements
const weekRangeLabel = document.getElementById('weekRangeLabel');
const miniCalendarGrid = document.getElementById('miniCalendarGrid');
const historyTableBody = document.getElementById('historyTableBody');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const prevWeekBtn = document.getElementById('prevWeekBtn');
const nextWeekBtn = document.getElementById('nextWeekBtn');
const thisWeekBtn = document.getElementById('thisWeekBtn');

// ---------- RENDER MINI CALENDAR GRID ----------
function renderMiniCalendar() {
  getCalendarPlans((plans) => {
    let html = '';
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(currentWeekStart);
      dayDate.setDate(dayDate.getDate() + i);
      const dateStr = formatDate(dayDate);
      const meal = plans[dateStr];
      const hasMeal = meal && (meal.main || meal.side || meal.veg);

      html += `<div class="mini-day-card ${hasMeal ? 'has-meal' : ''}">
        <div class="mini-day-header">
          <span class="mini-day-name">${WEEKDAYS[i]}</span>
          <span class="mini-day-date">${dayDate.toLocaleDateString('en-US', { month:'short', day:'numeric' })}</span>
        </div>
        <div class="mini-day-meals">
          ${hasMeal ? `
            <div class="mini-meal-row">🍖 ${meal.main || '—'}</div>
            <div class="mini-meal-row">🍚 ${meal.side || '—'}</div>
            <div class="mini-meal-row">🥬 ${meal.veg || '—'}</div>
            <button class="btn btn-small btn-primary complete-day-btn" data-date="${dateStr}">✓ Complete</button>
          ` : `<div class="mini-empty">No meal</div>`}
        </div>
      </div>`;
    }
    miniCalendarGrid.innerHTML = html;

    // Attach click handlers for Complete buttons
    document.querySelectorAll('.complete-day-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dateStr = btn.dataset.date;
        completeDay(dateStr);
      });
    });
  });
}

// ---------- COMPLETE A DAY ----------
function completeDay(dateStr, callback) {
  getCalendarPlans((plans) => {
    const meal = plans[dateStr];
    if (!meal) return;

    const d = new Date(dateStr + 'T12:00:00');
    const dayName = WEEKDAYS[(d.getDay() + 6) % 7]; // convert Sun-Sat to Mon-Sun

    // Add to history
    mealHistory.push({
      id: Date.now(),
      dateCompleted: new Date().toISOString().split('T')[0],
      day: dayName,
      main: meal.main || '',
      side: meal.side || '',
      veg: meal.veg || ''
    });

    // Remove from calendar plans
    delete plans[dateStr];
    saveCalendarPlans(plans);
    saveHistory();

    renderMiniCalendar();
    renderHistory();
  });
}

// ---------- RENDER HISTORY TABLE ----------
function renderHistory() {
  if (mealHistory.length === 0) {
    historyTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#7da06e;">No completed meals yet.</td></tr>';
    return;
  }
  const sorted = [...mealHistory].sort((a,b) => b.id - a.id);
  historyTableBody.innerHTML = sorted.map(entry => `
    <tr>
      <td>${entry.dateCompleted}</td>
      <td>${entry.day}</td>
      <td>${entry.main || '—'}</td>
      <td>${entry.side || '—'}</td>
      <td>${entry.veg || '—'}</td>
      <td><button class="clear-day-btn history-delete-btn" data-id="${entry.id}">Delete</button></td>
    </tr>
  `).join('');

  document.querySelectorAll('.history-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id);
      mealHistory = mealHistory.filter(entry => entry.id !== id);
      saveHistory();
      renderHistory();
    });
  });
}

// ---------- WEEK NAVIGATION ----------
prevWeekBtn.addEventListener('click', () => {
  currentWeekStart.setDate(currentWeekStart.getDate() - 7);
  updateDisplay();
});
nextWeekBtn.addEventListener('click', () => {
  currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  updateDisplay();
});
thisWeekBtn.addEventListener('click', () => {
  currentWeekStart = getMonday(new Date());
  updateDisplay();
});

// ---------- CLEAR HISTORY ----------
clearHistoryBtn.addEventListener('click', () => {
  if (confirm('Delete all meal history? This cannot be undone.')) {
    mealHistory = [];
    saveHistory();
    renderHistory();
  }
});

// ---------- UPDATE ALL UI ----------
function updateDisplay() {
  weekRangeLabel.textContent = formatWeekRange(currentWeekStart);
  renderMiniCalendar();
  renderHistory();
}

// --------------------------------------------------------------
// AUTH HOOK
// --------------------------------------------------------------
function onUserReady(userId) {
  loadHistory(() => {
    updateDisplay();
  });
}