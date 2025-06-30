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
// TODO: Connect to Node.js backend API for challenges and user progress
// Example:
// fetch('/api/challenges', { headers: { Authorization: 'Bearer TOKEN' } })
//   .then(res => res.json())
//   .then(data => { /* render challenges */ });

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

// ===== PREMIUM ANIMATION SYSTEM =====
// Intersection Observer for fade-in and staggered animations
(function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('animate-stagger')) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);
  const animatedElements = document.querySelectorAll(
    '.observe-fade-in, .observe-slide-up, .observe-scale-in, .animate-stagger'
  );
  animatedElements.forEach(el => observer.observe(el));
})();

// Scroll progress bar
(function() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
})();

// Ripple effect for buttons
(function() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .btn');
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    target.style.position = 'relative';
    target.style.overflow = 'hidden';
    target.appendChild(ripple);
    setTimeout(() => { ripple.remove(); }, 300);
  });
})();

// Smooth scrolling for anchor links
(function() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });
})();

// Typewriter effect for .typewriter elements
(function() {
  const typewriterElements = document.querySelectorAll('.typewriter');
  typewriterElements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 40);
      }
    }
    typeWriter();
  });
})();

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