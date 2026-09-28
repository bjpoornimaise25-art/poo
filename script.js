// Dynamic Year
const yearEl = document.getElementById('currentYear');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Theme Management
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
} else if (prefersDarkScheme.matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
  });
}

// Toast Notification
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// Clipboard Helper
async function copyToClipboard(text, successMsg = 'Link copied to clipboard! 📋') {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      showToast(successMsg);
    } else {
      fallbackCopy(text, successMsg);
    }
  } catch (e) {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (err) {
    showToast('Failed to copy link');
  }
  document.body.removeChild(input);
}

// Share Showcase Button
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: 'Curated Dance Video Portfolio',
      text: 'Check out this curated dance portfolio featuring masterclass choreography!',
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(window.location.href, 'Portfolio link copied! 📋');
        }
      }
    } else {
      copyToClipboard(window.location.href, 'Portfolio link copied! 📋');
    }
  });
}

// Single Video Link Copy Buttons
document.querySelectorAll('.copy-single-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const url = btn.getAttribute('data-url');
    if (url) {
      copyToClipboard(url, 'Video link copied! 🎬');
    }
  });
});

// Smooth Scroll for Back To Top
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
