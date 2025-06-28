// Animation and Interaction Scripts for Zuuush Website

// Intersection Observer for scroll-triggered animations
const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale, .stagger-animation'
  );

  animatedElements.forEach(el => observer.observe(el));
};

// Parallax scrolling effect
const initParallax = () => {
  let ticking = false;

  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
    
    parallaxElements.forEach(element => {
      const speed = element.classList.contains('parallax-slow') ? 0.5 :
                   element.classList.contains('parallax-medium') ? 0.3 : 0.1;
      
      const yPos = -(scrolled * speed);
      element.style.setProperty('--parallax-offset', `${yPos}px`);
    });

    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestTick);
  window.addEventListener('resize', requestTick);
};

// Smooth scrolling for navigation
const initSmoothScrolling = () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

// Active section detection for navigation
const initActiveSectionDetection = () => {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navItems = document.querySelectorAll('.nav-item');
  
  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + 200; // Offset for better detection
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });
    
    // Update navigation active state
    navItems.forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      if (href === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
    
    // If no section is active, default to home
    if (!currentSection) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#home') {
          item.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection(); // Initial call
};

// Hover effects and micro-interactions
const initHoverEffects = () => {
  // Button ripple effect
  const buttons = document.querySelectorAll('.btn-ripple');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
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

  // Card hover effects
  const cards = document.querySelectorAll('.card-3d, .card-flip');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
};

// Form animations and validation
const initFormAnimations = () => {
  const formInputs = document.querySelectorAll('.form-input');
  
  formInputs.forEach(input => {
    // Floating label animation
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
    
    // Check if input has value on load
    if (input.value) {
      input.parentElement.classList.add('focused');
    }
  });
};

// Loading animations
const initLoadingAnimations = () => {
  // Page load animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements in sequence
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, index * 100);
    });
  });
};

// Particle system for background
const initParticleSystem = () => {
  const particleContainer = document.querySelector('.global-shapes');
  if (!particleContainer) return;
  
  const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'floating-shape';
    
    // Random properties
    const size = Math.random() * 80 + 20;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 30 + 20;
    const delay = Math.random() * 20;
    
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
    `;
    
    particleContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, duration * 1000);
  };
  
  // Create particles periodically
  setInterval(createParticle, 5000);
  
  // Create initial particles
  for (let i = 0; i < 8; i++) {
    setTimeout(createParticle, i * 800);
  }
};

// Counter animations
const initCounterAnimations = () => {
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
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
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
};

// Progress bar animations
const initProgressAnimations = () => {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  progressBars.forEach(bar => progressObserver.observe(bar));
};

// Text reveal animations
const initTextReveal = () => {
  const textElements = document.querySelectorAll('.text-reveal');
  
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        textObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  textElements.forEach(element => textObserver.observe(element));
};

// Mobile menu toggle (if needed)
const initMobileMenu = () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }
};

// Performance optimizations
const initPerformanceOptimizations = () => {
  // Debounce scroll events
  let scrollTimeout;
  const originalScrollHandler = window.onscroll;
  
  window.onscroll = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      if (originalScrollHandler) {
        originalScrollHandler();
      }
    }, 16); // ~60fps
  };
  
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
};

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initParallax();
  initSmoothScrolling();
  initActiveSectionDetection();
  initHoverEffects();
  initFormAnimations();
  initLoadingAnimations();
  initParticleSystem();
  initCounterAnimations();
  initProgressAnimations();
  initTextReveal();
  initMobileMenu();
  initPerformanceOptimizations();
});

// Handle window resize
window.addEventListener('resize', () => {
  // Recalculate any size-dependent animations
  const cards = document.querySelectorAll('.card-3d, .card-flip');
  cards.forEach(card => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  });
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable animations for users who prefer reduced motion
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);
} 