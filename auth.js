function initAuth() {
  // Ensure UI updates when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavUI);
  } else {
    updateNavUI();
  }
}

function updateNavUI() {
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
  
  if (window.lucide) {
    lucide.createIcons();
  }
}

initAuth();
