let currentUser = null;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    // If we're on the login page, redirect to main page
    if (window.location.pathname.endsWith('login.html')) {
      window.location.href = 'index.html';
      return;
    }
    // Call the page-specific loader if it exists
    if (typeof onUserReady === 'function') {
      onUserReady(user.uid);
    }
  } else {
    currentUser = null;
    // If not on login page, force login
    if (!window.location.pathname.endsWith('login.html')) {
      window.location.href = 'login.html';
    }
  }
});

function signUp(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function signIn(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function signOut() {
  return firebase.auth().signOut();
}

// Attach logout listener to all pages
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', e => {
      e.preventDefault();
      signOut().then(() => window.location.href = 'login.html');
    });
  }
});