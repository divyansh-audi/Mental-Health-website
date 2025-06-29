// ===== ACHIEVEMENTS PAGE JAVASCRIPT =====

// DOM Elements
const navButton = document.getElementById('navButton');
const navDropdown = document.getElementById('navDropdown');
const logoutBtn = document.getElementById('logoutBtn');
const achievementsGrid = document.getElementById('achievementsGrid');
const categoryCards = document.querySelectorAll('.category-card');
const achievementModal = document.getElementById('achievementModal');
const modalClose = document.getElementById('modalClose');

// Achievement Data
const achievements = [
    {
        id: 1,
        title: "First Steps",
        description: "Complete your first mood tracking entry",
        category: "mood",
        icon: "😊",
        unlocked: true,
        progress: 100,
        rewards: ["+10 XP", "+1 Badge"],
        unlockDate: "2024-01-15"
    },
    {
        id: 2,
        title: "7-Day Streak",
        description: "Track your mood for 7 consecutive days",
        category: "streak",
        icon: "🔥",
        unlocked: true,
        progress: 100,
        rewards: ["+25 XP", "+1 Badge"],
        unlockDate: "2024-01-22"
    },
    {
        id: 3,
        title: "Reflection Master",
        description: "Write 10 daily reflections",
        category: "reflection",
        icon: "📝",
        unlocked: true,
        progress: 100,
        rewards: ["+50 XP", "+2 Badges"],
        unlockDate: "2024-01-20"
    },
    {
        id: 4,
        title: "Community Helper",
        description: "Help 5 other users in wellness rooms",
        category: "community",
        icon: "👥",
        unlocked: true,
        progress: 100,
        rewards: ["+30 XP", "+1 Badge"],
        unlockDate: "2024-01-18"
    },
    {
        id: 5,
        title: "30-Day Journey",
        description: "Track your mood for 30 consecutive days",
        category: "streak",
        icon: "🌟",
        unlocked: false,
        progress: 80,
        rewards: ["+100 XP", "+3 Badges"],
        unlockDate: null
    },
    {
        id: 6,
        title: "Mood Explorer",
        description: "Experience all 10 mood levels",
        category: "mood",
        icon: "🌈",
        unlocked: false,
        progress: 70,
        rewards: ["+40 XP", "+1 Badge"],
        unlockDate: null
    },
    {
        id: 7,
        title: "Deep Thinker",
        description: "Write 50 daily reflections",
        category: "reflection",
        icon: "🧠",
        unlocked: false,
        progress: 60,
        rewards: ["+75 XP", "+2 Badges"],
        unlockDate: null
    },
    {
        id: 8,
        title: "Room Creator",
        description: "Create your first wellness room",
        category: "community",
        icon: "🏠",
        unlocked: false,
        progress: 0,
        rewards: ["+20 XP", "+1 Badge"],
        unlockDate: null
    },
    {
        id: 9,
        title: "Wellness Warrior",
        description: "Complete 100 mood tracking entries",
        category: "mood",
        icon: "⚔️",
        unlocked: false,
        progress: 45,
        rewards: ["+150 XP", "+3 Badges"],
        unlockDate: null
    },
    {
        id: 10,
        title: "Community Leader",
        description: "Join and participate in 20 wellness rooms",
        category: "community",
        icon: "👑",
        unlocked: false,
        progress: 25,
        rewards: ["+80 XP", "+2 Badges"],
        unlockDate: null
    },
    {
        id: 11,
        title: "Consistency King",
        description: "Maintain a 100-day mood tracking streak",
        category: "streak",
        icon: "👑",
        unlocked: false,
        progress: 15,
        rewards: ["+200 XP", "+4 Badges"],
        unlockDate: null
    },
    {
        id: 12,
        title: "Mindful Master",
        description: "Write 100 daily reflections",
        category: "reflection",
        icon: "🧘",
        unlocked: false,
        progress: 30,
        rewards: ["+120 XP", "+3 Badges"],
        unlockDate: null
    }
];

// Current filter
let currentFilter = 'all';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    renderAchievements();
    updateStats();
});

// ===== PAGE INITIALIZATION =====
function initializePage() {
    // For now, allow access without authentication
    // In a real app, you'd check authentication here
    console.log('Achievements page loaded');
    
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
    
    // Category filters
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterAchievements(category);
        });
    });
    
    // Modal
    modalClose.addEventListener('click', closeModal);
    achievementModal.addEventListener('click', (e) => {
        if (e.target === achievementModal) {
            closeModal();
        }
    });
    
    // Achievement cards
    achievementsGrid.addEventListener('click', handleAchievementClick);
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

// ===== ACHIEVEMENT RENDERING =====
function renderAchievements() {
    const filteredAchievements = currentFilter === 'all' 
        ? achievements 
        : achievements.filter(achievement => achievement.category === currentFilter);
    
    achievementsGrid.innerHTML = '';
    
    filteredAchievements.forEach(achievement => {
        const achievementCard = createAchievementCard(achievement);
        achievementsGrid.appendChild(achievementCard);
    });
}

function createAchievementCard(achievement) {
    const card = document.createElement('div');
    card.className = `achievement-card ${achievement.unlocked ? 'unlocked' : ''}`;
    card.dataset.achievementId = achievement.id;
    
    const progressPercentage = Math.min(achievement.progress, 100);
    
    card.innerHTML = `
        <div class="achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}">
            <div class="badge-icon">${achievement.icon}</div>
        </div>
        <h3>${achievement.title}</h3>
        <p>${achievement.description}</p>
        ${!achievement.unlocked ? `
            <div class="achievement-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
                <span class="progress-text">${achievement.progress}%</span>
            </div>
        ` : ''}
        <div class="achievement-rewards">
            ${achievement.rewards.map(reward => 
                `<span class="reward-tag">${reward}</span>`
            ).join('')}
        </div>
    `;
    
    return card;
}

// ===== FILTERING FUNCTIONS =====
function filterAchievements(category) {
    currentFilter = category;
    
    // Update active category card
    categoryCards.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.category === category) {
            card.classList.add('active');
        }
    });
    
    // Re-render achievements
    renderAchievements();
    
    // Add smooth animation
    const cards = achievementsGrid.querySelectorAll('.achievement-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.5s ease forwards';
    });
}

// ===== STATS UPDATES =====
function updateStats() {
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;
    const completionRate = Math.round((unlockedCount / totalCount) * 100);
    
    // Update stats display
    document.getElementById('totalAchievements').textContent = unlockedCount;
    document.getElementById('achievementRate').textContent = `${completionRate}%`;
    
    // Update category counts
    updateCategoryCounts();
}

function updateCategoryCounts() {
    const categories = ['mood', 'streak', 'community', 'reflection'];
    
    categories.forEach(category => {
        const categoryAchievements = achievements.filter(a => a.category === category);
        const unlockedCount = categoryAchievements.filter(a => a.unlocked).length;
        const totalCount = categoryAchievements.length;
        
        const categoryCard = document.querySelector(`[data-category="${category}"]`);
        if (categoryCard) {
            const countElement = categoryCard.querySelector('.category-count');
            countElement.textContent = `${unlockedCount}/${totalCount}`;
        }
    });
}

// ===== ACHIEVEMENT INTERACTIONS =====
function handleAchievementClick(event) {
    const card = event.target.closest('.achievement-card');
    if (!card) return;
    
    const achievementId = parseInt(card.dataset.achievementId);
    const achievement = achievements.find(a => a.id === achievementId);
    
    if (achievement) {
        showAchievementModal(achievement);
    }
}

function showAchievementModal(achievement) {
    const modalTitle = document.getElementById('modalAchievementTitle');
    const modalDesc = document.getElementById('modalAchievementDesc');
    
    modalTitle.textContent = achievement.title;
    modalDesc.textContent = achievement.description;
    
    achievementModal.classList.add('active');
    
    // Add confetti effect for unlocked achievements
    if (achievement.unlocked) {
        createConfetti();
    }
}

function closeModal() {
    achievementModal.classList.remove('active');
}

// ===== CONFETTI EFFECT =====
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 100);
    }
}

// ===== ACHIEVEMENT UNLOCKING =====
function unlockAchievement(achievementId) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        achievement.unlockDate = new Date().toISOString().split('T')[0];
        
        // Save to localStorage
        saveAchievements();
        
        // Update display
        renderAchievements();
        updateStats();
        
        // Show unlock modal
        showAchievementModal(achievement);
        
        // Add to recent achievements
        addToRecentAchievements(achievement);
    }
}

function addToRecentAchievements(achievement) {
    const recentGrid = document.querySelector('.recent-grid');
    const recentAchievement = document.createElement('div');
    recentAchievement.className = 'recent-achievement';
    
    recentAchievement.innerHTML = `
        <div class="achievement-badge unlocked">
            <div class="badge-icon">${achievement.icon}</div>
        </div>
        <div class="achievement-info">
            <h3>${achievement.title}</h3>
            <p>${achievement.description}</p>
            <span class="unlock-date">Just unlocked!</span>
        </div>
    `;
    
    // Add to beginning of recent achievements
    recentGrid.insertBefore(recentAchievement, recentGrid.firstChild);
    
    // Remove oldest if more than 3
    const recentAchievements = recentGrid.querySelectorAll('.recent-achievement');
    if (recentAchievements.length > 3) {
        recentAchievements[recentAchievements.length - 1].remove();
    }
}

// ===== DATA PERSISTENCE =====
function saveAchievements() {
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

function loadAchievements() {
    const saved = localStorage.getItem('achievements');
    if (saved) {
        const savedAchievements = JSON.parse(saved);
        achievements.forEach(achievement => {
            const savedAchievement = savedAchievements.find(a => a.id === achievement.id);
            if (savedAchievement) {
                achievement.unlocked = savedAchievement.unlocked;
                achievement.progress = savedAchievement.progress;
                achievement.unlockDate = savedAchievement.unlockDate;
            }
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

// ===== ANIMATIONS =====
// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== PROGRESS TRACKING =====
function updateProgress(achievementId, progress) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
        achievement.progress = Math.min(progress, 100);
        
        // Auto-unlock if progress reaches 100%
        if (achievement.progress >= 100 && !achievement.unlocked) {
            unlockAchievement(achievementId);
        }
        
        saveAchievements();
        renderAchievements();
    }
}

// ===== EXPORT FUNCTIONS FOR OTHER PAGES =====
window.achievementSystem = {
    unlockAchievement,
    updateProgress,
    getAchievements: () => achievements
};

// Load saved achievements on page load
loadAchievements(); 