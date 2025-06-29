// ===== WELLNESS CHALLENGES PAGE JAVASCRIPT =====

// DOM Elements
const challengesGrid = document.getElementById('challengesGrid');
const categoryCards = document.querySelectorAll('.category-card');
const challengeModal = document.getElementById('challengeModal');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const modalJoin = document.getElementById('modalJoin');
const filterButtons = document.querySelectorAll('.filter-button');

// Challenge Data
const challenges = [
    {
        id: 1,
        title: "30-Day Mindfulness Journey",
        description: "Develop a daily meditation practice and cultivate inner peace through guided sessions and reflection exercises.",
        category: "mindfulness",
        icon: "🧘",
        duration: "30 days",
        participants: "2.1k",
        rating: "4.8/5",
        difficulty: "Beginner",
        rewards: ["+100 XP", "+2 Badges", "+1 Achievement"],
        status: "active",
        progress: 65,
        currentDay: 19
    },
    {
        id: 2,
        title: "Home Workout Challenge",
        description: "Build strength and endurance with daily home exercises, no equipment required.",
        category: "fitness",
        icon: "💪",
        duration: "21 days",
        participants: "890",
        rating: "4.6/5",
        difficulty: "Intermediate",
        rewards: ["+75 XP", "+1 Badge"],
        status: "available",
        progress: 0,
        currentDay: 0
    },
    {
        id: 3,
        title: "Daily Gratitude Practice",
        description: "Cultivate a positive mindset by practicing daily gratitude and appreciation.",
        category: "mindfulness",
        icon: "🙏",
        duration: "14 days",
        participants: "1.5k",
        rating: "4.9/5",
        difficulty: "Beginner",
        rewards: ["+50 XP", "+1 Badge"],
        status: "active",
        progress: 50,
        currentDay: 7
    },
    {
        id: 4,
        title: "Hydration Challenge",
        description: "Stay hydrated and improve your overall health with daily water intake tracking.",
        category: "nutrition",
        icon: "💧",
        duration: "7 days",
        participants: "650",
        rating: "4.7/5",
        difficulty: "Beginner",
        rewards: ["+30 XP", "+1 Badge"],
        status: "active",
        progress: 43,
        currentDay: 3
    },
    {
        id: 5,
        title: "Social Connection Challenge",
        description: "Strengthen relationships and build meaningful connections with others.",
        category: "social",
        icon: "👥",
        duration: "10 days",
        participants: "1.2k",
        rating: "4.5/5",
        difficulty: "Intermediate",
        rewards: ["+60 XP", "+1 Badge"],
        status: "available",
        progress: 0,
        currentDay: 0
    },
    {
        id: 6,
        title: "Digital Detox Challenge",
        description: "Reduce screen time and reconnect with the real world around you.",
        category: "mindfulness",
        icon: "📱",
        duration: "5 days",
        participants: "750",
        rating: "4.4/5",
        difficulty: "Advanced",
        rewards: ["+80 XP", "+2 Badges"],
        status: "available",
        progress: 0,
        currentDay: 0
    },
    {
        id: 7,
        title: "Healthy Eating Challenge",
        description: "Adopt healthier eating habits and learn about nutrition.",
        category: "nutrition",
        icon: "🥗",
        duration: "14 days",
        participants: "980",
        rating: "4.6/5",
        difficulty: "Intermediate",
        rewards: ["+70 XP", "+1 Badge"],
        status: "available",
        progress: 0,
        currentDay: 0
    },
    {
        id: 8,
        title: "Morning Routine Challenge",
        description: "Establish a productive and energizing morning routine.",
        category: "fitness",
        icon: "🌅",
        duration: "21 days",
        participants: "1.1k",
        rating: "4.7/5",
        difficulty: "Intermediate",
        rewards: ["+85 XP", "+1 Badge"],
        status: "available",
        progress: 0,
        currentDay: 0
    },
    {
        id: 9,
        title: "Kindness Challenge",
        description: "Spread positivity by performing daily acts of kindness.",
        category: "social",
        icon: "❤️",
        duration: "7 days",
        participants: "850",
        rating: "4.8/5",
        difficulty: "Beginner",
        rewards: ["+40 XP", "+1 Badge"],
        status: "available",
        progress: 0,
        currentDay: 0
    },
    {
        id: 10,
        title: "Sleep Quality Challenge",
        description: "Improve your sleep habits and get better rest.",
        category: "mindfulness",
        icon: "😴",
        duration: "14 days",
        participants: "720",
        rating: "4.5/5",
        difficulty: "Intermediate",
        rewards: ["+65 XP", "+1 Badge"],
        status: "available",
        progress: 0,
        currentDay: 0
    },
    {
        id: 11,
        title: "Walking Challenge",
        description: "Increase your daily step count and improve cardiovascular health.",
        category: "fitness",
        icon: "🚶",
        duration: "30 days",
        participants: "1.8k",
        rating: "4.6/5",
        difficulty: "Beginner",
        rewards: ["+90 XP", "+2 Badges"],
        status: "available",
        progress: 0,
        currentDay: 0
    },
    {
        id: 12,
        title: "Community Support Challenge",
        description: "Support and encourage others in their wellness journey.",
        category: "social",
        icon: "🤝",
        duration: "10 days",
        participants: "620",
        rating: "4.7/5",
        difficulty: "Beginner",
        rewards: ["+55 XP", "+1 Badge"],
        status: "available",
        progress: 0,
        currentDay: 0
    }
];

// Current filter
let currentFilter = 'all';
let selectedChallenge = null;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    renderChallenges();
    updateStats();
});

// ===== PAGE INITIALIZATION =====
function initializePage() {
    // For now, allow access without authentication
    // In a real app, you'd check authentication here
    console.log('Wellness challenges page loaded');
    
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
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.dataset.filter;
            filterChallenges(category);
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Challenge cards
    document.addEventListener('click', (e) => {
        if (e.target.closest('.challenge-card')) {
            const card = e.target.closest('.challenge-card');
            const challengeId = parseInt(card.dataset.challengeId);
            const challenge = challenges.find(c => c.id === challengeId);
            
            if (challenge) {
                if (e.target.classList.contains('btn-primary')) {
                    if (challenge.status === 'active') {
                        checkInChallenge(challengeId);
                    } else {
                        joinChallenge(challenge);
                    }
                } else if (e.target.classList.contains('btn-secondary')) {
                    showChallengeModal(challenge);
                } else {
                    handleChallengeClick(e, challenge);
                }
            }
        }
    });

    // Modal events
    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);
    modalJoin.addEventListener('click', joinChallenge);
    
    // Close modal on outside click
    challengeModal.addEventListener('click', (e) => {
        if (e.target === challengeModal) {
            closeModal();
        }
    });
}

// ===== CHALLENGE RENDERING =====
function renderChallenges(category = 'all') {
    challengesGrid.innerHTML = '';
    const filtered = category === 'all' ? challenges : challenges.filter(ch => ch.category === category);
    if (filtered.length === 0) {
        challengesGrid.innerHTML = '<div class="no-challenges premium-subtitle">No challenges found for this category.</div>';
        return;
    }
    filtered.forEach(ch => {
        const card = document.createElement('div');
        card.className = 'challenge-card premium-card';
        card.innerHTML = `
            <div class="challenge-icon">${ch.icon || ch.emoji || ''}</div>
            <h3 class="challenge-title">${ch.title}</h3>
            <p class="challenge-desc">${ch.description}</p>
            <div class="challenge-progress">
                <div class="progress-bar"><div class="progress-fill" style="width: ${ch.progress || 0}%"></div></div>
                <span class="progress-text">${ch.progress || 0}% Complete</span>
            </div>
            <button class="btn-primary">Join Challenge</button>
        `;
        challengesGrid.appendChild(card);
    });
}

// ===== FILTERING FUNCTIONS =====
function filterChallenges(category) {
    currentFilter = category;
    
    // Update active category card
    categoryCards.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.category === category) {
            card.classList.add('active');
        }
    });
    
    // Re-render challenges
    renderChallenges(category);
    
    // Add smooth animation
    const cards = challengesGrid.querySelectorAll('.challenge-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.5s ease forwards';
    });
}

// ===== STATS UPDATES =====
function updateStats() {
    const activeChallenges = challenges.filter(c => c.status === 'active').length;
    const completedChallenges = parseInt(localStorage.getItem('completedChallenges') || '8');
    const communityMembers = '1.2k';
    
    // Update stats display
    document.getElementById('activeChallenges').textContent = activeChallenges;
    document.getElementById('completedChallenges').textContent = completedChallenges;
    document.getElementById('communityMembers').textContent = communityMembers;
    
    // Update category counts
    updateCategoryCounts();
}

function updateCategoryCounts() {
    const categories = ['mindfulness', 'fitness', 'nutrition', 'social'];
    
    categories.forEach(category => {
        const categoryChallenges = challenges.filter(c => c.category === category);
        const count = categoryChallenges.length;
        
        const categoryCard = document.querySelector(`[data-category="${category}"]`);
        if (categoryCard) {
            const countElement = categoryCard.querySelector('.category-count');
            countElement.textContent = `${count} challenges`;
        }
    });
}

// ===== CHALLENGE INTERACTIONS =====
function handleChallengeClick(event, challenge) {
    // Implementation of handleChallengeClick function
}

function showChallengeModal(challenge) {
    selectedChallenge = challenge;
    
    const modalTitle = document.getElementById('modalChallengeTitle');
    const modalDesc = document.getElementById('modalDescription');
    
    modalTitle.textContent = challenge.title;
    modalDesc.textContent = challenge.description;
    
    challengeModal.classList.add('active');
}

function closeModal() {
    challengeModal.classList.remove('active');
    selectedChallenge = null;
}

function joinChallenge(challenge) {
    if (selectedChallenge) {
        // Update challenge status
        selectedChallenge.status = 'active';
        selectedChallenge.progress = 0;
        selectedChallenge.currentDay = 1;
        
        // Save to localStorage
        saveChallenges();
        
        // Update display
        renderChallenges();
        updateStats();
        
        // Close modal
        closeModal();
        
        // Show success message
        showSuccessMessage(`Joined ${selectedChallenge.title}!`);
        
        // Update active challenges section
        updateActiveChallenges();
    }
}

function checkInChallenge(challengeId) {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && challenge.status === 'active') {
        // Increment progress
        challenge.currentDay++;
        challenge.progress = Math.round((challenge.currentDay / parseInt(challenge.duration.split(' ')[0])) * 100);
        
        // Check if challenge is completed
        if (challenge.progress >= 100) {
            completeChallenge(challenge);
        } else {
            // Save progress
            saveChallenges();
            updateActiveChallenges();
            showSuccessMessage(`Checked in for Day ${challenge.currentDay}!`);
        }
    }
}

function completeChallenge(challenge) {
    // Mark as completed
    challenge.status = 'completed';
    
    // Update completed challenges count
    const completedCount = parseInt(localStorage.getItem('completedChallenges') || '8');
    localStorage.setItem('completedChallenges', (completedCount + 1).toString());
    
    // Save to localStorage
    saveChallenges();
    
    // Update display
    updateActiveChallenges();
    updateStats();
    
    // Show completion message
    showSuccessMessage(`🎉 Congratulations! You completed ${challenge.title}!`);
    
    // Trigger achievement unlock
    if (window.achievementSystem) {
        window.achievementSystem.unlockAchievement(1); // First Steps achievement
    }
}

function viewChallengeDetails(challengeId) {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
        showChallengeModal(challenge);
    }
}

// ===== ACTIVE CHALLENGES MANAGEMENT =====
function updateActiveChallenges() {
    const activeChallenges = challenges.filter(c => c.status === 'active');
    const activeGrid = document.querySelector('.active-grid');
    
    if (activeGrid) {
        activeGrid.innerHTML = '';
        
        activeChallenges.forEach(challenge => {
            const activeChallenge = document.createElement('div');
            activeChallenge.className = 'active-challenge';
            
            activeChallenge.innerHTML = `
                <div class="challenge-header">
                    <div class="challenge-icon">${challenge.icon}</div>
                    <div class="challenge-info">
                        <h3>${challenge.title}</h3>
                        <p>Day ${challenge.currentDay} of ${challenge.duration.split(' ')[0]}</p>
                    </div>
                    <div class="challenge-status">Active</div>
                </div>
                <div class="challenge-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${challenge.progress}%"></div>
                    </div>
                    <span class="progress-text">${challenge.progress}% Complete</span>
                </div>
                <div class="challenge-actions">
                    <button class="btn-primary" onclick="checkInChallenge(${challenge.id})">Check In</button>
                    <button class="btn-secondary" onclick="viewChallengeDetails(${challenge.id})">View Details</button>
                </div>
            `;
            
            activeGrid.appendChild(activeChallenge);
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        z-index: 10001;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== DATA PERSISTENCE =====
function saveChallenges() {
    localStorage.setItem('wellnessChallenges', JSON.stringify(challenges));
}

function loadChallenges() {
    const saved = localStorage.getItem('wellnessChallenges');
    if (saved) {
        const savedChallenges = JSON.parse(saved);
        challenges.forEach(challenge => {
            const savedChallenge = savedChallenges.find(c => c.id === challenge.id);
            if (savedChallenge) {
                challenge.status = savedChallenge.status;
                challenge.progress = savedChallenge.progress;
                challenge.currentDay = savedChallenge.currentDay;
            }
        });
    }
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
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// ===== EXPORT FUNCTIONS FOR OTHER PAGES =====
window.challengeSystem = {
    joinChallenge,
    checkInChallenge,
    completeChallenge,
    getChallenges: () => challenges
};

// Load saved challenges on page load
loadChallenges();
updateActiveChallenges(); 