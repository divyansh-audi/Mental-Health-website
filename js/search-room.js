// ===== SEARCH ROOM PAGE JAVASCRIPT =====

// DOM Elements
const navButton = document.getElementById('navButton');
const navDropdown = document.getElementById('navDropdown');
const logoutBtn = document.getElementById('logoutBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterTags = document.querySelectorAll('.filter-tag');
const roomsGrid = document.getElementById('roomsGrid');
const roomModal = document.getElementById('roomModal');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const modalJoin = document.getElementById('modalJoin');

// Room Data
// TODO: Connect to Node.js backend API for searching chatrooms
// Example:
// fetch('/api/chatrooms?search=keyword', { headers: { Authorization: 'Bearer TOKEN' } })
//   .then(res => res.json())
//   .then(data => { /* render search results */ });

// SVG Icons for rooms
const roomIcons = {
    meditation: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6"/><path d="M12 17v6"/><path d="M4.22 4.22l4.24 4.24"/><path d="M15.54 15.54l4.24 4.24"/><path d="M1 12h6"/><path d="M17 12h6"/><path d="M4.22 19.78l4.24-4.24"/><path d="M15.54 8.46l4.24-4.24"/></svg>',
    fitness: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    nutrition: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
    wellness: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
    sleep: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>',
    creative: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><path d="M17 2l-2.5 2.5"/><path d="M3 3l18 18"/><path d="M21 16.5V13a1.5 1.5 0 0 0-1.5-1.5H16"/><path d="M2 6v3a1.5 1.5 0 0 0 1.5 1.5H7"/><path d="M7 8v8"/><path d="M12 8v8"/><path d="M17 8v8"/></svg>'
};

// Current filter and search
let currentFilter = 'all';
let currentSearch = '';
let selectedRoom = null;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    renderRooms();
});

// ===== PAGE INITIALIZATION =====
function initializePage() {
    // For now, allow access without authentication
    // In a real app, you'd check authentication here
    console.log('Search room page loaded');
    
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
    
    // Search
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Filters
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const filter = tag.dataset.filter;
            filterRooms(filter);
        });
    });
    
    // Modal
    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);
    roomModal.addEventListener('click', (e) => {
        if (e.target === roomModal) {
            closeModal();
        }
    });
    
    // Room cards
    roomsGrid.addEventListener('click', handleRoomClick);
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

// ===== SEARCH FUNCTIONS =====
function handleSearch() {
    currentSearch = searchInput.value.toLowerCase();
    renderRooms();
}

function performSearch() {
    // Trigger search (same as handleSearch but for button click)
    handleSearch();
}

// ===== FILTER FUNCTIONS =====
function filterRooms(filter) {
    currentFilter = filter;
    
    // Update active filter tag
    filterTags.forEach(tag => {
        tag.classList.remove('active');
        if (tag.dataset.filter === filter) {
            tag.classList.add('active');
        }
    });
    
    // Re-render rooms
    renderRooms();
}

// ===== ROOM RENDERING =====
function renderRooms() {
    let filteredRooms = rooms;
    
    // Apply search filter
    if (currentSearch) {
        filteredRooms = filteredRooms.filter(room => 
            room.title.toLowerCase().includes(currentSearch) ||
            room.description.toLowerCase().includes(currentSearch) ||
            room.category.toLowerCase().includes(currentSearch)
        );
    }
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filteredRooms = filteredRooms.filter(room => room.category === currentFilter);
    }
    
    // Clear grid
    roomsGrid.innerHTML = '';
    
    // Render rooms
    filteredRooms.forEach(room => {
        const roomCard = createRoomCard(room);
        roomsGrid.appendChild(roomCard);
    });
    
    // Show no results message if needed
    if (filteredRooms.length === 0) {
        showNoResults();
    }
}

function createRoomCard(room) {
    const card = document.createElement('div');
    card.className = `room-card ${room.status} ${room.joined ? 'joined' : ''}`;
    card.dataset.roomId = room.id;
    
    const badgeText = room.status === 'featured' ? 'Featured' : 
                     room.joined ? 'Joined' : 'Join Now';
    const buttonText = room.joined ? 'Enter Room' : 'Join Room';
    
    card.innerHTML = `
        <div class="room-banner">
            <div class="room-icon">${roomIcons[room.icon]}</div>
            <div class="room-badge">${badgeText}</div>
        </div>
        <div class="room-content">
            <h3>${room.title}</h3>
            <p>${room.description}</p>
            <div class="room-stats">
                <span class="stat">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="m22 21-2-2"/>
                        <path d="M16 16.28A5.5 5.5 0 0 0 18 12h-2a4 4 0 0 0-4 4v2"/>
                    </svg>
                    ${room.members} members
                </span>
                <span class="stat">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    ${room.messages} messages
                </span>
                <span class="stat">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                    ${room.rating}
                </span>
            </div>
            <a href="../html-files/chatroom.html" class="btn-primary">${buttonText}</a>
        </div>
    `;
    
    return card;
}

function showNoResults() {
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.style.cssText = `
        text-align: center;
        padding: 40px;
        color: #666;
        grid-column: 1 / -1;
    `;
    noResults.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 16px;">🔍</div>
        <h3>No rooms found</h3>
        <p>Try adjusting your search terms or filters</p>
    `;
    roomsGrid.appendChild(noResults);
}

// ===== ROOM INTERACTIONS =====
function handleRoomClick(event) {
    const card = event.target.closest('.room-card');
    if (!card) return;
    
    const roomId = parseInt(card.dataset.roomId);
    const room = rooms.find(r => r.id === roomId);
    
    if (room) {
        showRoomModal(room);
    }
}

function showRoomModal(room) {
    selectedRoom = room;
    
    const modalTitle = document.getElementById('modalRoomTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalMembers = document.getElementById('modalMembers');
    const modalMessages = document.getElementById('modalMessages');
    const modalRating = document.getElementById('modalRating');
    const modalDesc = document.getElementById('modalDescription');
    
    modalTitle.textContent = room.title;
    modalCategory.textContent = room.category.charAt(0).toUpperCase() + room.category.slice(1);
    modalMembers.textContent = room.members;
    modalMessages.textContent = room.messages;
    modalRating.textContent = room.rating;
    modalDesc.textContent = room.description;
    
    roomModal.classList.add('active');
}

function closeModal() {
    roomModal.classList.remove('active');
    selectedRoom = null;
}

// ===== ROOM MANAGEMENT =====
function joinRoom(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (room && !room.joined) {
        room.joined = true;
        
        // Save to localStorage
        saveRooms();
        
        // Update display
        renderRooms();
        updateMyRooms();
        
        // Show success message
        showSuccessMessage(`Joined ${room.title}!`);
        
        // Close modal
        closeModal();
    }
}

function leaveRoom(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (room && room.joined) {
        room.joined = false;
        
        // Save to localStorage
        saveRooms();
        
        // Update display
        renderRooms();
        updateMyRooms();
        
        // Show success message
        showSuccessMessage(`Left ${room.title}`);
    }
}

function updateMyRooms() {
    const myRooms = rooms.filter(r => r.joined);
    const myRoomsGrid = document.querySelector('.my-rooms-grid');
    
    if (myRoomsGrid) {
        myRoomsGrid.innerHTML = '';
        
        myRooms.forEach(room => {
            const roomCard = document.createElement('div');
            roomCard.className = 'room-card joined';
            roomCard.dataset.roomId = room.id;
            
            roomCard.innerHTML = `
                <div class="room-banner">
                    <div class="room-icon">${roomIcons[room.icon]}</div>
                    <div class="room-badge">Joined</div>
                </div>
                <div class="room-content">
                    <h3>${room.title}</h3>
                    <p>${room.description}</p>
                    <div class="room-stats">
                        <span class="stat">👥 ${room.members} members</span>
                        <span class="stat">💬 ${room.messages} messages</span>
                    </div>
                    <a href="../html-files/chatroom.html" class="btn-primary">Enter Room</a>
                </div>
            `;
            
            myRoomsGrid.appendChild(roomCard);
        });
        
        // Show empty state if no joined rooms
        if (myRooms.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.style.cssText = `
                text-align: center;
                padding: 40px;
                color: #666;
                grid-column: 1 / -1;
            `;
            emptyState.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 16px;">🏠</div>
                <h3>No rooms joined yet</h3>
                <p>Join some rooms to see them here</p>
            `;
            myRoomsGrid.appendChild(emptyState);
        }
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
function saveRooms() {
    localStorage.setItem('userRooms', JSON.stringify(rooms));
}

function loadRooms() {
    const saved = localStorage.getItem('userRooms');
    if (saved) {
        const savedRooms = JSON.parse(saved);
        rooms.forEach(room => {
            const savedRoom = savedRooms.find(r => r.id === room.id);
            if (savedRoom) {
                room.joined = savedRoom.joined;
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
window.roomSystem = {
    joinRoom,
    leaveRoom,
    getRooms: () => rooms
};

// Load saved rooms on page load
loadRooms();
updateMyRooms(); 