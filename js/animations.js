/* ===== MODERN ANIMATION SYSTEM - JAVASCRIPT ===== */

class AnimationSystem {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupCustomCursor();
    this.setupScrollProgress();
    this.setupRippleEffects();
    this.setupMagneticEffects();
    this.setupSmoothScrolling();
    this.setupTypewriterEffects();
    this.setupParticleSystem();
    this.setupFormAnimations();
    this.setupPageTransitions();
    this.setupCounterAnimations();
    this.setupParallaxEffects();
    this.setupHoverEffects();
    this.setupLoadingStates();
  }

  /* ===== INTERSECTION OBSERVER ===== */
  setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Add staggered animation for child elements
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

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
      '.observe-fade-in, .observe-slide-up, .observe-scale-in, .animate-stagger'
  );

  animatedElements.forEach(el => observer.observe(el));
  }

  /* ===== CUSTOM CURSOR ===== */
  setupCustomCursor() {
    if (window.innerWidth <= 768) return; // Disable on mobile

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor following
    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      requestAnimationFrame(updateCursor);
    };
    updateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .hover-scale, .hover-lift');
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
  });
  }

  /* ===== SCROLL PROGRESS ===== */
  setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
  
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      progressBar.style.width = scrollPercent + '%';
    });
  }

  /* ===== RIPPLE EFFECTS ===== */
  setupRippleEffects() {
    document.addEventListener('click', (e) => {
      const target = e.target;
      
      if (target.classList.contains('btn-animate') || 
          target.closest('.btn-animate') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A') {
        
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
      
      setTimeout(() => {
        ripple.remove();
        }, 300);
      }
    });
  }

  /* ===== MAGNETIC EFFECTS ===== */
  setupMagneticEffects() {
    const magneticElements = document.querySelectorAll('.magnetic');
  
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.setProperty('--mouse-x', x * 0.1 + 'px');
        el.style.setProperty('--mouse-y', y * 0.1 + 'px');
    });
    
      el.addEventListener('mouseleave', () => {
        el.style.setProperty('--mouse-x', '0px');
        el.style.setProperty('--mouse-y', '0px');
    });
  });
  }

  /* ===== SMOOTH SCROLLING ===== */
  setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for header
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
      }
    });
    });
  }

  /* ===== TYPEWRITER EFFECTS ===== */
  setupTypewriterEffects() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      el.style.borderRight = '2px solid';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        } else {
          el.style.borderRight = 'none';
        }
      };
    
      // Start typing when element is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            typeWriter();
            observer.unobserve(entry.target);
          }
        });
    });
      
      observer.observe(el);
    });
  }

  /* ===== PARTICLE SYSTEM ===== */
  setupParticleSystem() {
    const particleContainer = document.querySelector('.particle-container');
  if (!particleContainer) return;
  
  const createParticle = () => {
    const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
    
    particleContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
      }, 5000);
  };
  
  // Create particles periodically
    setInterval(createParticle, 300);
  }

  /* ===== FORM ANIMATIONS ===== */
  setupFormAnimations() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      const label = input.nextElementSibling;
      if (!label || !label.classList.contains('floating-label')) return;
      
      // Check if input has value on load
      if (input.value) {
        label.classList.add('active');
      }
      
      input.addEventListener('focus', () => {
        label.classList.add('active');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          label.classList.remove('active');
        }
      });
      
      input.addEventListener('input', () => {
        if (input.value) {
          label.classList.add('active');
        } else {
          label.classList.remove('active');
        }
      });
    });

    // Form submission animations
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.classList.add('loading');
          submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        }
      });
    });
  }

  /* ===== PAGE TRANSITIONS ===== */
  setupPageTransitions() {
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.hostname === window.location.hostname) {
          e.preventDefault();
          
          document.body.classList.add('page-exit');
          
          setTimeout(() => {
            window.location.href = link.href;
          }, 300);
  }
      });
    });

    // Page enter animation
    window.addEventListener('load', () => {
      document.body.classList.add('page-enter');
    });
  }

  /* ===== COUNTER ANIMATIONS ===== */
  setupCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  };
  
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
          observer.unobserve(entry.target);
      }
    });
    });
  
    counters.forEach(counter => observer.observe(counter));
  }

  /* ===== PARALLAX EFFECTS ===== */
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  /* ===== HOVER EFFECTS ===== */
  setupHoverEffects() {
    // 3D Card Effects
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
    });

    // Icon animations
    const icons = document.querySelectorAll('.icon-animate');
    icons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        icon.classList.add('icon-bounce');
      });
      
      icon.addEventListener('animationend', () => {
        icon.classList.remove('icon-bounce');
      });
    });
  }

  /* ===== LOADING STATES ===== */
  setupLoadingStates() {
    // Show loading state for images
  const images = document.querySelectorAll('img[data-src]');
    
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
          img.classList.add('loading-pulse');
          
          img.addEventListener('load', () => {
            img.classList.remove('loading-pulse');
            img.classList.add('elastic-in');
          });
          
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  }

  /* ===== UTILITY METHODS ===== */
  
  // Add animation class to element
  static animate(element, animationClass, duration = 300) {
    element.classList.add(animationClass);
    setTimeout(() => {
      element.classList.remove(animationClass);
    }, duration);
  }

  // Stagger animation for multiple elements
  static staggerAnimate(elements, animationClass, delay = 100) {
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add(animationClass);
      }, index * delay);
    });
  }

  // Smooth scroll to element
  static scrollTo(element, offset = 0) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }

  // Debounce function for performance
  static debounce(func, wait) {
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

  // Throttle function for scroll events
  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

/* ===== INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize animation system
  const animationSystem = new AnimationSystem();
  
  // Make AnimationSystem available globally
  window.AnimationSystem = AnimationSystem;
  
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Preload critical animations
  const preloadAnimations = () => {
    const criticalElements = document.querySelectorAll('.hero-content, .main-heading, .tagline');
    criticalElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    });
    
    // Trigger animations after a short delay
    setTimeout(() => {
      criticalElements.forEach((el, index) => {
        setTimeout(() => {
          el.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 200);
      });
    }, 100);
  };
  
  preloadAnimations();
});

/* ===== PERFORMANCE OPTIMIZATIONS ===== */

// Optimize scroll events
const optimizedScrollHandler = AnimationSystem.throttle(() => {
  // Scroll-based animations
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Optimize resize events
const optimizedResizeHandler = AnimationSystem.debounce(() => {
  // Recalculate positions and sizes
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

/* ===== ACCESSIBILITY ENHANCEMENTS ===== */

// Respect reduced motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reduced-motion');
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

/* ===== ERROR HANDLING ===== */
window.addEventListener('error', (e) => {
  console.warn('Animation error:', e.error);
  // Gracefully disable problematic animations
  if (e.error && e.error.message.includes('animation')) {
    document.documentElement.classList.add('animation-disabled');
  }
});

/* ===== EXPORT FOR MODULE SYSTEMS ===== */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationSystem;
} 