// ===== MAIN DASHBOARD JAVASCRIPT =====

// DOM Elements
const moodDots = document.querySelectorAll('.mood-dot');
const timeBtns = document.querySelectorAll('.time-btn');
const submitMoodBtn = document.getElementById('submitMood');
const dailyLogInput = document.getElementById('dailyLogInput');
const saveLogBtn = document.getElementById('saveLog');
const logEntries = document.getElementById('logEntries');
const featureCards = document.querySelectorAll('.feature-card');
const moodPopup = document.getElementById('moodPopup');
const popupClose = document.getElementById('popupClose');
const popupAction = document.getElementById('popupAction');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const notificationClose = document.getElementById('notificationClose');
const userNameElement = document.getElementById('userName');

// State Management
let currentMood = null;
let currentTime = 'morning';
let moodData = {
  morning: [],
  night: []
};
let dailyLogs = [];
let lastPopupDate = null;
let popupCounter = 0;
let currentUser = null;

// ===== MOOD TRACKING FUNCTIONALITY =====

// Mood dot selection
moodDots.forEach(dot => {
  dot.addEventListener('click', () => {
    // Remove previous selection
    moodDots.forEach(d => d.classList.remove('selected'));
    
    // Select current dot
    dot.classList.add('selected');
    currentMood = parseInt(dot.dataset.value);
  });
});

// Time selection
timeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    timeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTime = btn.dataset.time;
  });
});

// Submit mood
submitMoodBtn.addEventListener('click', () => {
  if (currentMood === null) {
    showNotification('Please select a mood first!', 'error');
    return;
  }
  
  const today = new Date().toISOString().split('T')[0];
  const moodEntry = {
    date: today,
    mood: currentMood,
    time: currentTime
  };
  
  // Add to mood data
  moodData[currentTime].push(moodEntry);
  
  // Save to localStorage
  localStorage.setItem('moodData', JSON.stringify(moodData));
  
  // Update chart
  updateMoodChart();
  
  // Show success message
  showNotification(`Mood saved: ${currentMood}/10 (${currentTime})`, 'success');
  
  // Check for random popup
  checkForRandomPopup(currentMood);
  
  // Reset selection
  moodDots.forEach(d => d.classList.remove('selected'));
  currentMood = null;
});

// ===== DAILY LOG FUNCTIONALITY =====

// Save daily log
saveLogBtn.addEventListener('click', () => {
  const content = dailyLogInput.value.trim();
  if (!content) {
    showNotification('Please write something in your log!', 'error');
    return;
  }
  
  const today = new Date().toISOString().split('T')[0];
  const logEntry = {
    date: today,
    content: content,
    timestamp: new Date().toISOString()
  };
  
  // Add to logs
  dailyLogs.push(logEntry);
  
  // Save to localStorage
  localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs));
  
  // Update display
  updateLogDisplay();
  
  // Clear input
  dailyLogInput.value = '';
  
  // Show success message
  showNotification('Daily log saved successfully!', 'success');
});

// Update log display
function updateLogDisplay() {
  logEntries.innerHTML = '';
  
  // Sort logs by date (newest first)
  const sortedLogs = dailyLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  sortedLogs.slice(0, 5).forEach(log => {
    const logElement = document.createElement('div');
    logElement.className = 'log-entry';
    
    const date = new Date(log.date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    
    logElement.innerHTML = `
      <div class="log-entry-date">${date}</div>
      <div class="log-entry-content">${log.content}</div>
    `;
    
    logEntries.appendChild(logElement);
  });
}

// ===== MOOD CHART FUNCTIONALITY =====

let moodChart = null;

function initializeMoodChart() {
  const ctx = document.getElementById('moodChart').getContext('2d');
  
  moodChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Morning Mood',
          data: [],
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4,
          fill: false
        },
        {
          label: 'Night Mood',
          data: [],
          borderColor: '#f093fb',
          backgroundColor: 'rgba(240, 147, 251, 0.1)',
          tension: 0.4,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              family: 'Inter',
              size: 12
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
          ticks: {
            stepSize: 2,
            font: {
              family: 'Inter',
              size: 12
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          ticks: {
            font: {
              family: 'Inter',
              size: 12
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      },
      elements: {
        point: {
          radius: 6,
          hoverRadius: 8
        }
      }
    }
  });
}

function updateMoodChart() {
  if (!moodChart) return;
  
  // Get last 7 days
  const dates = [];
  const morningData = [];
  const nightData = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    // Find morning mood for this date
    const morningEntry = moodData.morning.find(entry => entry.date === dateStr);
    morningData.push(morningEntry ? morningEntry.mood : null);
    
    // Find night mood for this date
    const nightEntry = moodData.night.find(entry => entry.date === dateStr);
    nightData.push(nightEntry ? nightEntry.mood : null);
  }
  
  moodChart.data.labels = dates;
  moodChart.data.datasets[0].data = morningData;
  moodChart.data.datasets[1].data = nightData;
  moodChart.update();
}

// ===== RANDOM POPUP SYSTEM =====

function checkForRandomPopup(mood) {
  const today = new Date().toISOString().split('T')[0];
  
  // Don't show popup if already shown today
  if (lastPopupDate === today) return;
  
  // Random chance (3-20 days)
  const daysSinceLastPopup = lastPopupDate ? 
    Math.floor((new Date(today) - new Date(lastPopupDate)) / (1000 * 60 * 60 * 24)) : 999;
  
  if (daysSinceLastPopup >= 3 && Math.random() < 0.3) {
    showMoodPopup(mood);
    lastPopupDate = today;
    popupCounter++;
    localStorage.setItem('lastPopupDate', today);
    localStorage.setItem('popupCounter', popupCounter.toString());
  }
}

function showMoodPopup(mood) {
  const popupAvatar = document.getElementById('popupAvatar');
  const popupTitle = document.getElementById('popupTitle');
  const popupMessage = document.getElementById('popupMessage');
  
  if (mood <= 3) {
    // Low mood - supportive message
    popupAvatar.textContent = '🤗';
    popupTitle.textContent = 'We\'re here for you';
    popupMessage.textContent = 'We noticed you\'re having a tough time. Remember, it\'s okay to not be okay. We\'ve sent you a custom avatar to brighten your day. You\'re not alone in this journey.';
  } else if (mood >= 8) {
    // High mood - celebratory message
    popupAvatar.textContent = '🎉';
    popupTitle.textContent = 'You\'re absolutely glowing!';
    popupMessage.textContent = 'Your positive energy is contagious! We\'re so happy to see you feeling this great. Keep spreading that joy - you deserve every bit of happiness coming your way!';
  } else {
    // Medium mood - encouraging message
    popupAvatar.textContent = '💪';
    popupTitle.textContent = 'You\'re doing great!';
    popupMessage.textContent = 'Every day is a new opportunity to grow and improve. We believe in you and your ability to create positive change in your life. Keep going!';
  }
  
  moodPopup.classList.add('active');
}

// Close popup
popupClose.addEventListener('click', () => {
  moodPopup.classList.remove('active');
});

popupAction.addEventListener('click', () => {
  moodPopup.classList.remove('active');
  showNotification('Custom avatar unlocked! 🎨', 'success');
});

// Close popup on outside click
moodPopup.addEventListener('click', (e) => {
  if (e.target === moodPopup) {
    moodPopup.classList.remove('active');
  }
});

// ===== FEATURE CARDS FUNCTIONALITY =====

// Remove old click handlers since cards are now anchor tags
// The feature cards now use href attributes for navigation

// Handle remaining non-anchor feature cards
document.querySelectorAll('.feature-card:not([href])').forEach(card => {
  card.addEventListener('click', () => {
    const target = card.dataset.target;
    
    switch(target) {
      case 'daily-log':
        document.getElementById('daily-log').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        break;
      case 'community':
        showNotification('Community feature coming soon! 👥', 'info');
        break;
      case 'customization':
        showNotification('Customization feature coming soon! 🎨', 'info');
        break;
    }
  });
});

// ===== NOTIFICATION SYSTEM =====

function showNotification(message, type = 'info') {
  notificationMessage.textContent = message;
  
  // Set color based on type
  switch(type) {
    case 'success':
      notification.style.borderLeft = '4px solid #10b981';
      break;
    case 'error':
      notification.style.borderLeft = '4px solid #ef4444';
      break;
    case 'warning':
      notification.style.borderLeft = '4px solid #f59e0b';
      break;
    default:
      notification.style.borderLeft = '4px solid #667eea';
  }
  
  notification.style.display = 'flex';
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    hideNotification();
  }, 5000);
}

function hideNotification() {
  notification.style.display = 'none';
}

notificationClose.addEventListener('click', hideNotification);

// ===== DATA PERSISTENCE =====

function loadSavedData() {
  // Load mood data
  const savedMoodData = localStorage.getItem('moodData');
  if (savedMoodData) {
    moodData = JSON.parse(savedMoodData);
  }
  
  // Load daily logs
  const savedLogs = localStorage.getItem('dailyLogs');
  if (savedLogs) {
    dailyLogs = JSON.parse(savedLogs);
  }
  
  // Load popup data
  lastPopupDate = localStorage.getItem('lastPopupDate');
  const savedPopupCounter = localStorage.getItem('popupCounter');
  if (savedPopupCounter) {
    popupCounter = parseInt(savedPopupCounter);
  }
}

// ===== USER MANAGEMENT =====

function loadUserData() {
  // Try to get user data from localStorage (for demo purposes)
  // In a real app, this would come from session storage or API
  const savedUser = localStorage.getItem('currentUser');
  
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  } else {
    // Fallback: try to get from session storage
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      currentUser = JSON.parse(sessionUser);
    } else {
      // Default user for demo
      currentUser = {
        name: 'Demo User',
        email: 'demo@example.com'
      };
    }
  }
  
  // Update the display
  updateUserDisplay();
}

function updateUserDisplay() {
  if (currentUser && currentUser.name) {
    userNameElement.textContent = currentUser.name;
    // Also update the page title
    document.title = `Dashboard - ${currentUser.name} | Zuuush`;
  } else {
    userNameElement.textContent = 'User';
  }
}

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
  // Load user data first
  loadUserData();
  
  // Load saved data
  loadSavedData();
  
  // Initialize chart
  initializeMoodChart();
  updateMoodChart();
  
  // Update log display
  updateLogDisplay();
  
  // Set default time
  timeBtns[0].classList.add('active');
  
  // Show welcome message
  setTimeout(() => {
    const welcomeMessage = currentUser && currentUser.name ? 
      `Welcome back, ${currentUser.name}! How are you feeling today? 😊` :
      'Welcome back! How are you feeling today? 😊';
    showNotification(welcomeMessage, 'info');
  }, 1000);
});

// ===== UTILITY FUNCTIONS =====

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== SMOOTH SCROLLING =====

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== ACCESSIBILITY =====

// Keyboard navigation for mood dots
moodDots.forEach((dot, index) => {
  dot.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dot.click();
    }
  });
  
  dot.setAttribute('tabindex', '0');
  dot.setAttribute('role', 'button');
  dot.setAttribute('aria-label', `Mood level ${index + 1}`);
});

// ===== PERFORMANCE OPTIMIZATION =====

// Debounced chart update
const debouncedChartUpdate = debounce(updateMoodChart, 300);

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.6s ease';
  observer.observe(section);
});

// ===== LOGOUT FUNCTIONALITY =====

logoutBtn.addEventListener('click', () => {
  // Clear user data
  localStorage.removeItem('userData');
  sessionStorage.removeItem('userData');
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('user');
  
  // Show logout message
  showNotification('Logged out successfully!', 'success');
  console.log('User logged out');
  
  // Reset user display
  userNameElement.textContent = 'User';
}); 