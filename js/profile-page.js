// ===== PROFILE PAGE FUNCTIONALITY =====

// DOM Elements
const navButton = document.getElementById('navButton');
const navDropdown = document.getElementById('navDropdown');
const logoutBtn = document.getElementById('logoutBtn');
const customizeBtn = document.getElementById('customizeBtn');
const saveAvatarBtn = document.getElementById('saveAvatarBtn');
const avatarModal = document.getElementById('avatarModal');
const modalClose = document.getElementById('modalClose');
const outfitGrid = document.getElementById('outfitGrid');
const accessoryGrid = document.getElementById('accessoryGrid');
const colorPalette = document.getElementById('colorPalette');
const recentAchievements = document.getElementById('recentAchievements');
const goalsList = document.getElementById('goalsList');
const addGoalBtn = document.getElementById('addGoalBtn');
const editProfileBtn = document.getElementById('editProfileBtn');

// Avatar customization data
const outfits = [
    { id: 1, name: 'Casual', icon: '👕', unlocked: true, color: '#667eea' },
    { id: 2, name: 'Formal', icon: '👔', unlocked: true, color: '#2c3e50' },
    { id: 3, name: 'Sporty', icon: '🏃', unlocked: true, color: '#e74c3c' },
    { id: 4, name: 'Cozy', icon: '🧥', unlocked: true, color: '#8e44ad' },
    { id: 5, name: 'Elegant', icon: '👗', unlocked: false, color: '#f39c12' },
    { id: 6, name: 'Adventure', icon: '🎒', unlocked: false, color: '#27ae60' },
    { id: 7, name: 'Creative', icon: '🎨', unlocked: false, color: '#e67e22' },
    { id: 8, name: 'Tech', icon: '💻', unlocked: false, color: '#34495e' }
];

const accessories = [
    { id: 1, name: 'Glasses', icon: '👓', unlocked: true },
    { id: 2, name: 'Hat', icon: '🎩', unlocked: true },
    { id: 3, name: 'Watch', icon: '⌚', unlocked: true },
    { id: 4, name: 'Necklace', icon: '📿', unlocked: true },
    { id: 5, name: 'Crown', icon: '👑', unlocked: false },
    { id: 6, name: 'Wings', icon: '🦋', unlocked: false },
    { id: 7, name: 'Aura', icon: '✨', unlocked: false },
    { id: 8, name: 'Pet', icon: '🐕', unlocked: false }
];

const colors = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c',
    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
    '#fa709a', '#fee140', '#a8edea', '#fed6e3',
    '#ffecd2', '#fcb69f', '#ff9a9e', '#fecfef'
];

// Current avatar state
let currentAvatar = {
    outfit: 1,
    accessories: [],
    color: '#667eea'
};

// Demo achievements
const demoAchievements = [
    { id: 1, title: 'First Steps', description: 'Complete your first wellness activity', icon: 'trophy', date: '2024-01-15' },
    { id: 2, title: 'Mood Tracker', description: 'Track your mood for 7 days', icon: 'chart', date: '2024-01-20' },
    { id: 3, title: 'Meditation Master', description: 'Complete 10 meditation sessions', icon: 'meditation', date: '2024-01-25' },
    { id: 4, title: 'Community Helper', description: 'Help 5 other users', icon: 'users', date: '2024-01-28' }
];

// SVG Icons
const svgIcons = {
    trophy: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M4 22h16"/><path d="M10 14.66V17c0 1.1.9 2 2 2s2-.9 2-2v-2.34"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    chart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m9 9 3 3 3-3"/><path d="m9 15 3-3 3 3"/></svg>',
    meditation: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6"/><path d="M12 17v6"/><path d="M4.22 4.22l4.24 4.24"/><path d="M15.54 15.54l4.24 4.24"/><path d="M1 12h6"/><path d="M17 12h6"/><path d="M4.22 19.78l4.24-4.24"/><path d="M15.54 8.46l4.24-4.24"/></svg>',
    users: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 21-2-2"/><path d="M16 16.28A5.5 5.5 0 0 0 18 12h-2a4 4 0 0 0-4 4v2"/></svg>',
    mood: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
    fitness: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12a2 2 0 0 1 2 2v14l-2-1-2 1-2-1-2 1-2-1-2 1-2-1L2 20V6a2 2 0 0 1 2-2Z"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/></svg>',
    writing: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>'
};

// Demo goals
const demoGoals = [
    { id: 1, title: 'Daily Meditation', description: 'Meditate for 10 minutes every day', progress: 75, target: 30 },
    { id: 2, title: 'Mood Tracking', description: 'Track mood for 30 consecutive days', progress: 60, target: 30 },
    { id: 3, title: 'Physical Activity', description: 'Exercise 3 times per week', progress: 40, target: 12 }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    loadUserData();
    renderAvatarCustomization();
    renderRecentAchievements();
    renderGoals();
    renderProgressGraph();
});

// ===== PAGE INITIALIZATION =====
function initializePage() {
    // For now, allow access without authentication
    // In a real app, you'd check authentication here
    console.log('Profile page loaded');
    
    // Optional: Check if user is logged in for personalized experience
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    if (userData) {
        const user = JSON.parse(userData);
        console.log('User logged in:', user.username);
    } else {
        console.log('No user data found - using demo mode');
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation
    navButton.addEventListener('click', toggleNavigation);
    document.addEventListener('click', handleOutsideClick);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Avatar customization
    customizeBtn.addEventListener('click', openAvatarModal);
    saveAvatarBtn.addEventListener('click', saveAvatarChanges);
    modalClose.addEventListener('click', closeAvatarModal);
    avatarModal.addEventListener('click', (e) => {
        if (e.target === avatarModal) {
            closeAvatarModal();
        }
    });
    
    // Profile actions
    editProfileBtn.addEventListener('click', editProfile);
    addGoalBtn.addEventListener('click', addNewGoal);
}

// ===== NAVIGATION FUNCTIONS =====
function toggleNavigation() {
    navButton.classList.toggle('active');
    navDropdown.classList.toggle('active');
}

function handleOutsideClick(event) {
    if (!navButton.contains(event.target) && !navDropdown.contains(event.target)) {
        navButton.classList.remove('active');
        navDropdown.classList.remove('active');
    }
}

function handleLogout() {
    // Clear user data
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    
    // Show logout message
    alert('Logged out successfully!');
    console.log('User logged out');
}

// ===== AVATAR CUSTOMIZATION =====
function openAvatarModal() {
    avatarModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAvatarModal() {
    avatarModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function saveAvatarChanges() {
    // Save avatar configuration
    localStorage.setItem('userAvatar', JSON.stringify(currentAvatar));
    
    // Update avatar display
    updateAvatarDisplay();
    
    // Show success message
    showSuccessMessage('Avatar saved successfully!');
    
    // Close modal
    closeAvatarModal();
}

function renderAvatarCustomization() {
    // Render outfits
    outfitGrid.innerHTML = '';
    outfits.forEach(outfit => {
        const outfitElement = createOutfitElement(outfit);
        outfitGrid.appendChild(outfitElement);
    });
    
    // Render accessories
    accessoryGrid.innerHTML = '';
    accessories.forEach(accessory => {
        const accessoryElement = createAccessoryElement(accessory);
        accessoryGrid.appendChild(accessoryElement);
    });
    
    // Render colors
    colorPalette.innerHTML = '';
    colors.forEach(color => {
        const colorElement = createColorElement(color);
        colorPalette.appendChild(colorElement);
    });
}

function createOutfitElement(outfit) {
    const div = document.createElement('div');
    div.className = `outfit-item ${outfit.unlocked ? '' : 'locked'} ${currentAvatar.outfit === outfit.id ? 'selected' : ''}`;
    div.dataset.outfitId = outfit.id;
    // Use styled div with initial instead of emoji
    const initial = outfit.name.charAt(0);
    div.innerHTML = `
        <div class="outfit-icon" style="background:${outfit.color};color:#fff;font-weight:700;font-size:1.3rem;width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:center;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.08);">${initial}</div>
        <div class="outfit-name">${outfit.name}</div>
    `;
    if (outfit.unlocked) {
        div.addEventListener('click', () => selectOutfit(outfit.id));
    }
    return div;
}

function createAccessoryElement(accessory) {
    const div = document.createElement('div');
    const isSelected = currentAvatar.accessories.includes(accessory.id);
    div.className = `accessory-item ${accessory.unlocked ? '' : 'locked'} ${isSelected ? 'selected' : ''}`;
    div.dataset.accessoryId = accessory.id;
    // Use styled div with initial instead of emoji
    const initial = accessory.name.charAt(0);
    div.innerHTML = `
        <div class="accessory-icon" style="background:#e0e7ef;color:#667eea;font-weight:700;font-size:1.2rem;width:2.2rem;height:2.2rem;display:flex;align-items:center;justify-content:center;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.08);">${initial}</div>
        <div class="accessory-name">${accessory.name}</div>
    `;
    if (accessory.unlocked) {
        div.addEventListener('click', () => toggleAccessory(accessory.id));
    }
    return div;
}

function createColorElement(color) {
    const div = document.createElement('div');
    div.className = `color-item ${currentAvatar.color === color ? 'selected' : ''}`;
    div.style.backgroundColor = color;
    div.dataset.color = color;
    
    div.addEventListener('click', () => selectColor(color));
    
    return div;
}

function selectOutfit(outfitId) {
    currentAvatar.outfit = outfitId;
    
    // Update visual selection
    document.querySelectorAll('.outfit-item').forEach(item => {
        item.classList.remove('selected');
    });
    document.querySelector(`[data-outfit-id="${outfitId}"]`).classList.add('selected');
    
    // Update avatar preview
    updateAvatarPreview();
}

function toggleAccessory(accessoryId) {
    const index = currentAvatar.accessories.indexOf(accessoryId);
    if (index > -1) {
        currentAvatar.accessories.splice(index, 1);
    } else {
        currentAvatar.accessories.push(accessoryId);
    }
    
    // Update visual selection
    document.querySelectorAll('.accessory-item').forEach(item => {
        item.classList.remove('selected');
    });
    currentAvatar.accessories.forEach(id => {
        document.querySelector(`[data-accessory-id="${id}"]`).classList.add('selected');
    });
    
    // Update avatar preview
    updateAvatarPreview();
}

function selectColor(color) {
    currentAvatar.color = color;
    
    // Update visual selection
    document.querySelectorAll('.color-item').forEach(item => {
        item.classList.remove('selected');
    });
    document.querySelector(`[data-color="${color}"]`).classList.add('selected');
    
    // Update avatar preview
    updateAvatarPreview();
}

function updateAvatarPreview() {
    // Update 3D avatar body color
    const avatarBody = document.querySelector('.avatar-body-3d');
    if (avatarBody) {
        avatarBody.style.background = `linear-gradient(135deg, ${currentAvatar.color} 0%, ${adjustBrightness(currentAvatar.color, -20)} 100%)`;
    }
    
    // Update main avatar body color
    const mainAvatarBody = document.querySelector('.avatar-body');
    if (mainAvatarBody) {
        mainAvatarBody.style.background = `linear-gradient(135deg, ${currentAvatar.color} 0%, ${adjustBrightness(currentAvatar.color, -20)} 100%)`;
    }
}

function updateAvatarDisplay() {
    // Update main avatar display
    updateAvatarPreview();
    
    // Add accessories to main avatar
    const avatarContainer = document.getElementById('avatarContainer');
    const existingAccessories = avatarContainer.querySelectorAll('.avatar-accessory');
    existingAccessories.forEach(acc => acc.remove());
    
    currentAvatar.accessories.forEach(accessoryId => {
        const accessory = accessories.find(acc => acc.id === accessoryId);
        if (accessory) {
            const accessoryElement = document.createElement('div');
            accessoryElement.className = 'avatar-accessory';
            accessoryElement.textContent = accessory.icon;
            accessoryElement.style.position = 'absolute';
            accessoryElement.style.fontSize = '1.5rem';
            
            // Position accessories based on type
            switch (accessory.name) {
                case 'Glasses':
                    accessoryElement.style.top = '25%';
                    accessoryElement.style.left = '50%';
                    accessoryElement.style.transform = 'translateX(-50%)';
                    break;
                case 'Hat':
                    accessoryElement.style.top = '5%';
                    accessoryElement.style.left = '50%';
                    accessoryElement.style.transform = 'translateX(-50%)';
                    break;
                case 'Crown':
                    accessoryElement.style.top = '5%';
                    accessoryElement.style.left = '50%';
                    accessoryElement.style.transform = 'translateX(-50%)';
                    break;
                default:
                    accessoryElement.style.bottom = '20%';
                    accessoryElement.style.right = '10%';
            }
            
            avatarContainer.appendChild(accessoryElement);
        }
    });
}

function adjustBrightness(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// ===== USER DATA =====
function loadUserData() {
    // Load saved avatar
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
        currentAvatar = JSON.parse(savedAvatar);
    }
    
    // Update avatar display
    updateAvatarDisplay();
    
    // Load user info (demo data)
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    if (userData) {
        const user = JSON.parse(userData);
        document.getElementById('userName').textContent = user.username || 'Alex Johnson';
        document.getElementById('fullName').textContent = user.username || 'Alex Johnson';
        document.getElementById('userEmail').textContent = user.email || 'alex.johnson@example.com';
    }
}

// ===== ACHIEVEMENTS =====
function renderRecentAchievements() {
    recentAchievements.innerHTML = '';
    
    demoAchievements.slice(0, 4).forEach(achievement => {
        const achievementElement = createAchievementElement(achievement);
        recentAchievements.appendChild(achievementElement);
    });
}

function createAchievementElement(achievement) {
    const div = document.createElement('div');
    div.className = 'achievement-item';
    
    div.innerHTML = `
        <div class="achievement-icon">${svgIcons[achievement.icon]}</div>
        <div class="achievement-info">
            <h4>${achievement.title}</h4>
            <p>${achievement.description}</p>
        </div>
    `;
    
    return div;
}

// ===== GOALS =====
function renderGoals() {
    goalsList.innerHTML = '';
    
    demoGoals.forEach(goal => {
        const goalElement = createGoalElement(goal);
        goalsList.appendChild(goalElement);
    });
}

function createGoalElement(goal) {
    const div = document.createElement('div');
    div.className = 'goal-item';
    
    const progressPercentage = Math.round((goal.progress / goal.target) * 100);
    
    div.innerHTML = `
        <div class="goal-info">
            <h4>${goal.title}</h4>
            <p>${goal.description}</p>
        </div>
        <div class="goal-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progressPercentage}%"></div>
            </div>
            <span>${goal.progress}/${goal.target}</span>
        </div>
    `;
    
    return div;
}

function addNewGoal() {
    const goalTitle = prompt('Enter goal title:');
    if (goalTitle) {
        const goalDescription = prompt('Enter goal description:');
        if (goalDescription) {
            const newGoal = {
                id: Date.now(),
                title: goalTitle,
                description: goalDescription,
                progress: 0,
                target: 30
            };
            
            demoGoals.push(newGoal);
            renderGoals();
            showSuccessMessage('Goal added successfully!');
        }
    }
}

// ===== PROFILE ACTIONS =====
function editProfile() {
    const newName = prompt('Enter your full name:', document.getElementById('fullName').textContent);
    if (newName) {
        document.getElementById('fullName').textContent = newName;
        document.getElementById('userName').textContent = newName;
        showSuccessMessage('Profile updated successfully!');
    }
}

// ===== UTILITY FUNCTIONS =====
function showSuccessMessage(message) {
    // Create notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(16, 185, 129, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 1000;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== PROFILE PAGE PROGRESS GRAPH =====
(function() {
  function loadChartJs(callback) {
    if (window.Chart) return callback();
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = callback;
    document.head.appendChild(script);
  }

  function renderProgressGraph() {
    var ctx = document.getElementById('progressGraph').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Mood Score',
          data: [6, 7, 8, 7, 9, 8, 10],
          borderColor: 'rgba(139,92,246,1)',
          backgroundColor: 'rgba(139,92,246,0.08)',
          pointBackgroundColor: 'rgba(236,72,153,1)',
          pointRadius: 6,
          pointHoverRadius: 8,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(139,92,246,0.95)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(236,72,153,0.7)',
            borderWidth: 1,
            padding: 12,
            caretSize: 7,
          }
        },
        scales: {
          y: {
            min: 0,
            max: 10,
            ticks: {
              color: '#6b7280',
              font: { family: 'Inter', size: 13 }
            },
            grid: { color: 'rgba(139,92,246,0.08)' }
          },
          x: {
            ticks: {
              color: '#6b7280',
              font: { family: 'Inter', size: 13 }
            },
            grid: { display: false }
          }
        },
        animation: {
          duration: 1200,
          easing: 'easeOutQuart',
          onComplete: function() {
            document.getElementById('progressGraph').style.opacity = 1;
          }
        }
      }
    });
    document.getElementById('progressGraph').style.opacity = 0;
    setTimeout(function() {
      document.getElementById('progressGraph').style.transition = 'opacity 0.7s';
      document.getElementById('progressGraph').style.opacity = 1;
    }, 200);
  }

  loadChartJs(renderProgressGraph);
})();

// TODO: Connect to Node.js backend API for user profile
// Example:
// fetch('/api/profile', { headers: { Authorization: 'Bearer TOKEN' } })
//   .then(res => res.json())
//   .then(data => { /* render profile */ });

// TODO: Connect to Node.js backend API for achievements/XP
// Example:
// fetch('/api/achievements', { headers: { Authorization: 'Bearer TOKEN' } })
//   .then(res => res.json())
//   .then(data => { /* render achievements */ });

// TODO: Connect to Node.js backend API for logs
// Example:
// fetch('/api/logs', { headers: { Authorization: 'Bearer TOKEN' } })
//   .then(res => res.json())
//   .then(data => { /* render logs */ }); 