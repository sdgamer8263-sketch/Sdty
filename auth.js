const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

function initAuth() {
  const currentUserStr = localStorage.getItem('currentUser');
  const path = window.location.pathname;
  const isAuthPage = path.endsWith('login.html') || path.endsWith('register.html');

  if (currentUserStr) {
    const session = JSON.parse(currentUserStr);
    const now = new Date().getTime();
    if (now > session.expiresAt) {
      // 24 hours passed, session expired
      localStorage.removeItem('currentUser');
      if (!isAuthPage) {
        alert('Session expired after 24 hours. Please log in again.');
        window.location.href = 'login.html';
        return;
      }
    }
  } else {
    // Not logged in
    if (!isAuthPage) {
      window.location.href = 'login.html';
      return;
    }
  }

  // Ensure UI updates when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavUI);
  } else {
    updateNavUI();
  }
}

function updateNavUI() {
  const currentUserStr = localStorage.getItem('currentUser');
  // Use class selectors that match the navigation structure
  const desktopNav = document.querySelector('nav .hidden.md\\:block .flex.items-center.space-x-8');
  const mobileNav = document.querySelector('#mobileMenu > div');
  
  if (!desktopNav || !mobileNav) return; // Prevent errors on pages without full nav
  
  // Add Donate Button to navigation unconditionally
  const donateBtnDesktop = document.createElement('a');
  donateBtnDesktop.href = 'donate.html';
  donateBtnDesktop.className = 'text-green-400 hover:text-green-300 hover:border-b-2 hover:border-dark-border border-b-2 border-transparent px-1 py-2 text-sm font-medium transition-colors flex items-center';
  donateBtnDesktop.innerHTML = '<i data-lucide="heart" class="mr-1 h-4 w-4"></i> Donate';
  desktopNav.appendChild(donateBtnDesktop);

  const donateBtnMobile = document.createElement('a');
  donateBtnMobile.href = 'donate.html';
  donateBtnMobile.className = 'text-green-400 hover:bg-dark-border hover:text-green-300 block rounded-md px-3 py-2 text-base font-medium flex items-center';
  donateBtnMobile.innerHTML = '<i data-lucide="heart" class="mr-2 h-4 w-4"></i> Donate';
  mobileNav.appendChild(donateBtnMobile);
  
  if (currentUserStr) {
    const userSession = JSON.parse(currentUserStr);
    
    // Add User Profile Link
    const userInfoDesktop = document.createElement('a');
    userInfoDesktop.href = 'profile.html';
    userInfoDesktop.className = 'text-primary-light hover:text-white px-1 py-2 text-sm font-medium transition-colors cursor-pointer';
    userInfoDesktop.innerHTML = `<i data-lucide="user" class="inline h-4 w-4 mr-1"></i>Profile`;
    desktopNav.appendChild(userInfoDesktop);

    const userInfoMobile = document.createElement('a');
    userInfoMobile.href = 'profile.html';
    userInfoMobile.className = 'text-primary-light hover:bg-dark-border hover:text-white block rounded-md px-3 py-2 text-base font-medium';
    userInfoMobile.innerHTML = `<i data-lucide="user" class="inline h-4 w-4 mr-1"></i>Profile`;
    mobileNav.appendChild(userInfoMobile);
    
    if (window.lucide) {
      lucide.createIcons();
    }
  } else {
    // Add Login Button
    const loginBtnDesktop = document.createElement('a');
    loginBtnDesktop.href = 'login.html';
    loginBtnDesktop.className = 'text-slate-300 hover:text-white hover:border-b-2 hover:border-dark-border border-b-2 border-transparent px-1 py-2 text-sm font-medium transition-colors';
    loginBtnDesktop.textContent = 'Login';
    desktopNav.appendChild(loginBtnDesktop);

    const loginBtnMobile = document.createElement('a');
    loginBtnMobile.href = 'login.html';
    loginBtnMobile.className = 'text-slate-300 hover:bg-dark-border hover:text-white block rounded-md px-3 py-2 text-base font-medium';
    loginBtnMobile.textContent = 'Login';
    mobileNav.appendChild(loginBtnMobile);
    
    // Add Register Button
    const regBtnDesktop = document.createElement('a');
    regBtnDesktop.href = 'register.html';
    regBtnDesktop.className = 'text-slate-300 hover:text-white hover:border-b-2 hover:border-dark-border border-b-2 border-transparent px-1 py-2 text-sm font-medium transition-colors';
    regBtnDesktop.textContent = 'Register';
    desktopNav.appendChild(regBtnDesktop);

    const regBtnMobile = document.createElement('a');
    regBtnMobile.href = 'register.html';
    regBtnMobile.className = 'text-slate-300 hover:bg-dark-border hover:text-white block rounded-md px-3 py-2 text-base font-medium';
    regBtnMobile.textContent = 'Register';
    mobileNav.appendChild(regBtnMobile);
  }
}

initAuth();
