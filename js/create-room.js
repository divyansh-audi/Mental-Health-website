// ===== CREATE ROOM PAGE JAVASCRIPT =====

// DOM Elements
const createRoomForm = document.getElementById('createRoomForm');
const roomNameInput = document.querySelector('input[name="roomName"]');
const charCount = document.getElementById('charCount');
const submitButton = document.getElementById('submitButton');
const loadingOverlay = document.getElementById('loadingOverlay');
const successModal = document.getElementById('successModal');

// ===== CHARACTER COUNTER =====

// Update character counter
function updateCharCount() {
    const currentLength = roomNameInput.value.length;
    charCount.textContent = currentLength;
    
    // Change color based on length
    if (currentLength >= 18) {
        charCount.style.color = '#ef4444'; // Red for near limit
    } else if (currentLength >= 15) {
        charCount.style.color = '#f59e0b'; // Orange for warning
    } else {
        charCount.style.color = 'rgba(255, 255, 255, 0.7)'; // Default
    }
}

// Initialize character counter
updateCharCount();

// Add event listener for character counting
roomNameInput.addEventListener('input', updateCharCount);

// ===== FORM VALIDATION =====

// Validation functions
function validateRoomName() {
    const value = roomNameInput.value.trim();
    if (value.length === 0) {
        showError(roomNameInput, 'Room name is required');
        return false;
    }
    if (value.length < 3) {
        showError(roomNameInput, 'Room name must be at least 3 characters');
        return false;
    }
    showSuccess(roomNameInput);
    return true;
}

function validateDescription() {
    const textarea = document.querySelector('textarea[name="roomDescription"]');
    const value = textarea.value.trim();
    if (value.length === 0) {
        showError(textarea, 'Description is required');
        return false;
    }
    if (value.length < 10) {
        showError(textarea, 'Description must be at least 10 characters');
        return false;
    }
    showSuccess(textarea);
    return true;
}

function validateCategory() {
    const selectedCategory = document.querySelector('input[name="type"]:checked');
    if (!selectedCategory) {
        showCategoryError();
        return false;
    }
    hideCategoryError();
    return true;
}

// Error and success display functions
function showError(element, message) {
    element.classList.add('form-error');
    element.classList.remove('form-success');
    
    // Remove existing error message
    const existingError = element.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.85rem;
        margin-top: 8px;
        font-family: 'Inter', sans-serif;
    `;
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);
}

function showSuccess(element) {
    element.classList.remove('form-error');
    element.classList.add('form-success');
    
    // Remove error message if exists
    const existingError = element.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function showCategoryError() {
    const typeContainer = document.querySelector('.type');
    
    // Remove existing error
    const existingError = typeContainer.querySelector('.category-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'category-error';
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.85rem;
        margin-top: 12px;
        text-align: center;
        font-family: 'Inter', sans-serif;
        grid-column: 1 / -1;
    `;
    errorDiv.textContent = 'Please select a category';
    typeContainer.appendChild(errorDiv);
}

function hideCategoryError() {
    const existingError = document.querySelector('.category-error');
    if (existingError) {
        existingError.remove();
    }
}

// ===== REAL-TIME VALIDATION =====

// Validate room name on input
roomNameInput.addEventListener('blur', validateRoomName);
roomNameInput.addEventListener('input', () => {
    if (roomNameInput.classList.contains('form-error')) {
        validateRoomName();
    }
});

// Validate description on input
const descriptionTextarea = document.querySelector('textarea[name="roomDescription"]');
descriptionTextarea.addEventListener('blur', validateDescription);
descriptionTextarea.addEventListener('input', () => {
    if (descriptionTextarea.classList.contains('form-error')) {
        validateDescription();
    }
});

// Validate category on selection
const categoryInputs = document.querySelectorAll('input[name="type"]');
categoryInputs.forEach(input => {
    input.addEventListener('change', () => {
        if (document.querySelector('.category-error')) {
            validateCategory();
        }
    });
});

// ===== FORM SUBMISSION =====

createRoomForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isRoomNameValid = validateRoomName();
    const isDescriptionValid = validateDescription();
    const isCategoryValid = validateCategory();
    
    if (!isRoomNameValid || !isDescriptionValid || !isCategoryValid) {
        // Shake the form to indicate error
        createRoomForm.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            createRoomForm.style.animation = '';
        }, 500);
        return;
    }
    
    // Get form data
    const formData = new FormData(createRoomForm);
    const roomData = {
        privacy: formData.get('privacy'),
        roomName: formData.get('roomName').trim(),
        roomDescription: formData.get('roomDescription').trim(),
        type: formData.get('type'),
        createdAt: new Date().toISOString()
    };
    
    // Show loading overlay
    loadingOverlay.classList.add('active');
    
    try {
        // TODO: Connect to Node.js backend API for creating rooms
        // Example:
        // fetch('/api/chatrooms', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json', Authorization: 'Bearer TOKEN' },
        //   body: JSON.stringify(roomData)
        // })
        //   .then(res => res.json())
        //   .then(data => { /* handle new room */ });
        
        // Hide loading overlay
        loadingOverlay.classList.remove('active');
        
        // Show success modal
        successModal.classList.add('active');
        
    } catch (error) {
        // Hide loading overlay
        loadingOverlay.classList.remove('active');
        
        // Show error message
        showSubmissionError(error.message);
    }
});

// Show submission error
function showSubmissionError(message) {
    // Create error notification
    const errorNotification = document.createElement('div');
    errorNotification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(239, 68, 68, 0.9);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(239, 68, 68, 0.3);
        border-radius: 12px;
        padding: 16px 20px;
        color: white;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    errorNotification.textContent = message;
    
    document.body.appendChild(errorNotification);
    
    // Animate in
    setTimeout(() => {
        errorNotification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorNotification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(errorNotification);
        }, 300);
    }, 5000);
}

// ===== SUCCESS MODAL FUNCTIONALITY =====

// Close success modal when clicking outside
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

// Close success modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.classList.contains('active')) {
        successModal.classList.remove('active');
    }
});

// ===== ENHANCED INTERACTIVITY =====

// Add hover effects to category labels
const categoryLabels = document.querySelectorAll('.type label');
categoryLabels.forEach(label => {
    label.addEventListener('mouseenter', () => {
        if (!label.previousElementSibling.checked) {
            label.style.transform = 'translateY(-2px)';
            label.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    label.addEventListener('mouseleave', () => {
        if (!label.previousElementSibling.checked) {
            label.style.transform = '';
            label.style.boxShadow = '';
        }
    });
});

// Add focus effects to inputs
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentNode.style.transform = 'scale(1.02)';
        input.parentNode.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', () => {
        input.parentNode.style.transform = '';
    });
});

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Add keyboard navigation for category selection
categoryLabels.forEach((label, index) => {
    label.setAttribute('tabindex', '0');
    label.setAttribute('role', 'button');
    label.setAttribute('aria-pressed', 'false');
    
    label.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            label.previousElementSibling.checked = true;
            label.click();
        }
    });
    
    // Update aria-pressed when selection changes
    label.previousElementSibling.addEventListener('change', () => {
        categoryLabels.forEach(l => {
            l.setAttribute('aria-pressed', l.previousElementSibling.checked.toString());
        });
    });
});

// Add ARIA labels for better screen reader support
roomNameInput.setAttribute('aria-describedby', 'charCount');
descriptionTextarea.setAttribute('aria-describedby', 'description-help');

// Add description help text
const descriptionHelp = document.createElement('div');
descriptionHelp.id = 'description-help';
descriptionHelp.style.cssText = `
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 8px;
    font-family: 'Inter', sans-serif;
`;
descriptionHelp.textContent = 'Describe what this room is for and what participants can expect.';
descriptionTextarea.parentNode.appendChild(descriptionHelp);

// ===== PERFORMANCE OPTIMIZATIONS =====

// Debounce function for input validation
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

// Debounced validation for better performance
const debouncedRoomNameValidation = debounce(validateRoomName, 300);
const debouncedDescriptionValidation = debounce(validateDescription, 300);

// Use debounced validation for input events
roomNameInput.addEventListener('input', debouncedRoomNameValidation);
descriptionTextarea.addEventListener('input', debouncedDescriptionValidation);

// ===== INITIALIZATION =====

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial focus to room name input
    roomNameInput.focus();
    
    // Add loading animation to submit button
    submitButton.addEventListener('click', () => {
        submitButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            submitButton.style.transform = '';
        }, 150);
    });
    
    // Console log for debugging
    console.log('Create Room page initialized successfully');
});

// ===== UTILITY FUNCTIONS =====

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Generate room ID
function generateRoomId() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Export functions for potential use in other scripts
window.CreateRoomUtils = {
    formatDate,
    generateRoomId,
    validateRoomName,
    validateDescription,
    validateCategory
};

// Premium Create Room JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeFormHandlers();
    initializeAnimations();
    initializeFloatingShapes();
    initializePremiumEffects();
});

// Form handlers with enhanced validation and animations
function initializeFormHandlers() {
    const form = document.getElementById('createRoomForm');
    const roomNameInput = form.querySelector('input[name="roomName"]');
    const charCount = document.getElementById('charCount');
    const submitButton = document.getElementById('submitButton');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const successModal = document.getElementById('successModal');
    
    // Character counter with smooth animation
    roomNameInput.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;
        
        // Animate character counter
        charCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            charCount.style.transform = 'scale(1)';
        }, 150);
        
        // Visual feedback for character limit
        if (count >= 18) {
            charCount.style.color = '#ff6b6b';
        } else if (count >= 15) {
            charCount.style.color = '#ffd93d';
        } else {
            charCount.style.color = 'rgba(255, 255, 255, 0.7)';
        }
    });
    
    // Enhanced form submission with premium animations
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showErrorAnimation();
            return;
        }
        
        // Show loading with premium animation
        showLoadingAnimation();
        
        // Simulate API call
        setTimeout(() => {
            hideLoadingAnimation();
            showSuccessModal();
        }, 2000);
    });
    
    // Enhanced input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            addGlowEffect(this);
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
            removeGlowEffect(this);
        });
        
        // Add typing animation
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.background = 'rgba(255, 255, 255, 0.15)';
            } else {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });
    
    // Enhanced radio button interactions
    const radioButtons = form.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Add selection animation
            const label = this.nextElementSibling;
            label.style.transform = 'scale(1.05)';
            setTimeout(() => {
                label.style.transform = 'scale(1)';
            }, 200);
            
            // Add ripple effect
            createRippleEffect(label);
        });
    });
}

// Initialize floating shapes with enhanced animations
function initializeFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // Randomize animation delays
        shape.style.animationDelay = `${index * 0.5}s`;
        
        // Add mouse interaction
        shape.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(180deg)';
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.background = '';
        });
    });
}

// Initialize premium animations and effects
function initializeAnimations() {
    // Staggered entrance animation for form elements
    const formElements = document.querySelectorAll('.form-header, .privacy, .title, .description, .type, .submit');
    
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add parallax effect to background
    document.addEventListener('mousemove', function(e) {
        const shapes = document.querySelectorAll('.floating-shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// Initialize premium visual effects
function initializePremiumEffects() {
    // Add gradient text animation
    const header = document.querySelector('.form-header h1');
    if (header) {
        // Removed hover effects for header
        // header.addEventListener('mouseenter', function() {
        //     this.style.background = 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c)';
        //     this.style.backgroundSize = '400% 400%';
        //     this.style.animation = 'gradientShift 2s ease infinite';
        // });
        
        // header.addEventListener('mouseleave', function() {
        //     this.style.animation = 'none';
        //     this.style.background = 'linear-gradient(135deg, #fff, #e0e7ff)';
        // });
    }
    
    // Add hover effects to form sections
    const formSections = document.querySelectorAll('.title, .description, .type');
    formSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Enhanced form validation
function validateForm() {
    const form = document.getElementById('createRoomForm');
    const roomName = form.querySelector('input[name="roomName"]').value.trim();
    const description = form.querySelector('textarea[name="roomDescription"]').value.trim();
    const type = form.querySelector('input[name="type"]:checked');
    
    if (!roomName) {
        showFieldError('Room name is required');
        return false;
    }
    
    if (!description) {
        showFieldError('Description is required');
        return false;
    }
    
    if (!type) {
        showFieldError('Please select a room type');
        return false;
    }
    
    return true;
}

// Enhanced loading animation
function showLoadingAnimation() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const spinner = loadingOverlay.querySelector('.loading-spinner');
    
    loadingOverlay.classList.add('active');
    
    // Add pulsing effect to spinner
    spinner.style.animation = 'spin 1s linear infinite, pulse 2s ease-in-out infinite';
}

function hideLoadingAnimation() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.remove('active');
}

// Enhanced success modal
function showSuccessModal() {
    const successModal = document.getElementById('successModal');
    const modalContent = successModal.querySelector('.modal-content');
    
    successModal.classList.add('active');
    
    // Add entrance animation
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 100);
}

// Utility functions
function createRippleEffect(element) {
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

function addGlowEffect(element) {
    element.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.5)';
}

function removeGlowEffect(element) {
    element.style.boxShadow = '';
}

function showErrorAnimation() {
    const form = document.getElementById('createRoomForm');
    form.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        form.style.animation = '';
    }, 500);
}

function showFieldError(message) {
    // Create and show error notification
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 107, 107, 0.9);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .form-header h1 {
        transition: all 0.3s ease;
    }
    
    .title, .description, .type {
        transition: all 0.3s ease;
    }
    
    input, textarea {
        transition: all 0.3s ease;
    }
    
    .circle-button {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .floating-shape {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

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