// ===== CHATROOM FUNCTIONALITY =====

// DOM Elements
const navButton = document.getElementById('navButton');
const navDropdown = document.getElementById('navDropdown');
const logoutBtn = document.getElementById('logoutBtn');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const memberList = document.getElementById('memberList');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    // TODO: Connect to Node.js backend API for chatrooms and messages
    // Example:
    // fetch('/api/chatrooms', { headers: { Authorization: 'Bearer TOKEN' } })
    //   .then(res => res.json())
    //   .then(data => { /* render chatrooms */ });
    // fetch('/api/chatrooms/:roomId/messages', { headers: { Authorization: 'Bearer TOKEN' } })
    //   .then(res => res.json())
    //   .then(data => { /* render messages */ });
});

// ===== PAGE INITIALIZATION =====
function initializePage() {
    // For now, allow access without authentication
    // In a real app, you'd check authentication here
    console.log('Chatroom page loaded');
    
    // Optional: Check if user is logged in for personalized experience
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    if (userData) {
        const user = JSON.parse(userData);
        console.log('User logged in:', user.username);
    } else {
        console.log('No user data found - using demo mode');
    }
    
    // Add premium loading animation
    document.body.classList.add('loaded');
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation
    navButton.addEventListener('click', toggleNavigation);
    document.addEventListener('click', handleOutsideClick);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Chat functionality
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Typing indicator
    messageInput.addEventListener('input', handleTyping);
    
    // Auto-focus on message input
    messageInput.focus();
    
    // Premium button interactions
    document.querySelectorAll('.premium-button, .premium-button-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
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

// ===== CHAT FUNCTIONS =====
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;
    
    const message = {
        id: Date.now(),
        author: 'You',
        text: text,
        time: new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        }),
        own: true,
        avatar: 'Y',
        reactions: {}
    };
    
    addMessageToChat(message);
    messageInput.value = '';
    
    // Simulate typing indicator
    simulateTyping();
    
    // Simulate response after 1-3 seconds
    setTimeout(() => {
        const responses = [
            'Thanks for sharing! 🙏',
            'That\'s really helpful! 💡',
            'I can relate to that! 🤝',
            'Great perspective! ✨',
            'Keep going! You\'re doing amazing! 💪',
            'That\'s wonderful! 🌟',
            'Thanks for the inspiration! 🎯',
            'You\'ve got this! 🔥'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const randomMember = demoMembers.filter(m => m.status === 'online' && m.name !== 'You')[Math.floor(Math.random() * 3)];
        
        if (randomMember) {
        const responseMessage = {
            id: Date.now() + 1,
            author: randomMember.name,
            text: randomResponse,
            time: new Date().toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            }),
                own: false,
                avatar: randomMember.avatar,
                reactions: {}
        };
        
        addMessageToChat(responseMessage);
        }
    }, 1000 + Math.random() * 2000);
}

function addMessageToChat(message) {
    const messageElement = createMessageElement(message);
    chatMessages.appendChild(messageElement);
    
    // Add premium entrance animation
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        messageElement.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    }, 50);
    
    scrollToBottom();
}

function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.own ? 'own' : ''}`;
    
    const reactionsHTML = Object.keys(message.reactions).length > 0 
        ? `<div class="message-reactions">
            ${Object.entries(message.reactions).map(([emoji, count]) => 
                `<span class="reaction" title="${count} people reacted">${emoji} ${count}</span>`
            ).join('')}
           </div>` 
        : '';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${message.avatar}</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-author">${message.author}</span>
                <span class="message-time">${message.time}</span>
            </div>
            <div class="message-text">${message.text}</div>
            ${reactionsHTML}
        </div>
    `;
    
    // Add reaction functionality
    if (!message.own) {
        const messageText = messageDiv.querySelector('.message-text');
        messageText.addEventListener('dblclick', () => {
            addReaction(message.id, '❤️');
        });
    }
    
    return messageDiv;
}

function addReaction(messageId, emoji) {
    // Find message and add reaction
    const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
    if (messageElement) {
        const reactionsDiv = messageElement.querySelector('.message-reactions') || 
                           messageElement.querySelector('.message-content').appendChild(document.createElement('div'));
        reactionsDiv.className = 'message-reactions';
        
        const reactionSpan = document.createElement('span');
        reactionSpan.className = 'reaction';
        reactionSpan.textContent = emoji;
        reactionsDiv.appendChild(reactionSpan);
        
        // Add animation
        reactionSpan.style.animation = 'reactionPop 0.3s ease-out';
    }
}

function scrollToBottom() {
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
    });
}

function renderMembers() {
    memberList.innerHTML = '';
    
    demoMembers.forEach(member => {
        const memberElement = createMemberElement(member);
        memberList.appendChild(memberElement);
    });
}

function createMemberElement(member) {
    const memberDiv = document.createElement('div');
    memberDiv.className = 'member-item';
    
    const typingIndicator = member.typing ? '<span class="typing-indicator">typing...</span>' : '';
    
    memberDiv.innerHTML = `
        <div class="member-avatar">${member.avatar}</div>
        <div class="member-info">
            <div class="member-name">${member.name}</div>
            <div class="member-status">
                <div class="status-indicator ${member.status}"></div>
                <span class="status-text">${member.status === 'online' ? 'Online' : member.lastSeen}</span>
                ${typingIndicator}
            </div>
        </div>
    `;
    
    return memberDiv;
}

// ===== UTILITY FUNCTIONS =====
function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

// ===== AUTO-SCROLL TO BOTTOM =====
// Ensure chat scrolls to bottom when new messages are added
const observer = new MutationObserver(() => {
    scrollToBottom();
});

observer.observe(chatMessages, {
    childList: true,
    subtree: true
});

// ===== TYPING INDICATOR =====
let typingTimeout;

messageInput.addEventListener('input', () => {
    // Clear existing timeout
    clearTimeout(typingTimeout);
    
    // Set new timeout to show "stopped typing" after 1 second
    typingTimeout = setTimeout(() => {
        // In a real app, you'd send a "stopped typing" signal to other users
        console.log('User stopped typing');
    }, 1000);
});

// ===== ACCESSIBILITY =====
// Keyboard navigation
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        messageInput.blur();
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll to bottom
const debouncedScrollToBottom = debounce(scrollToBottom, 100);

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

// ===== PREMIUM TYPING INDICATORS =====
let isTyping = false;
let currentUser = {
    name: 'You',
    avatar: 'Y',
    status: 'online'
};

function handleTyping() {
    if (!isTyping) {
        isTyping = true;
        // In a real app, you'd send typing status to server
        console.log('User started typing');
    }
    
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        isTyping = false;
        console.log('User stopped typing');
    }, 1000);
}

function simulateTyping() {
    // Simulate other users typing
    const onlineMembers = demoMembers.filter(m => m.status === 'online' && m.name !== currentUser.name);
    if (onlineMembers.length > 0) {
        const randomMember = onlineMembers[Math.floor(Math.random() * onlineMembers.length)];
        randomMember.typing = true;
        renderMembers();
        
        setTimeout(() => {
            randomMember.typing = false;
            renderMembers();
        }, 2000 + Math.random() * 3000);
    }
}

function startTypingSimulation() {
    // Periodically simulate typing from other members
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance
            simulateTyping();
        }
    }, 10000);
}

// ===== PREMIUM ANIMATIONS =====
function addRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes reactionPop {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .typing-indicator {
        color: #667eea;
        font-style: italic;
        font-size: 0.8rem;
        animation: typingPulse 1.5s ease-in-out infinite;
    }
    
    @keyframes typingPulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
    }
    
    .message-reactions {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
        flex-wrap: wrap;
    }
    
    .reaction {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 1rem;
        padding: 0.25rem 0.5rem;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .reaction:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.05);
    }
    
    body.loaded {
        animation: fadeIn 0.5s ease-out;
    }
`;
document.head.appendChild(style); 