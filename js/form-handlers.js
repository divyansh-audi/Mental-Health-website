// Form Handlers and Validation for Zuuush Website

// Form validation utilities
const validators = {
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email address';
  },
  
  password: (value) => {
    if (value.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  },
  
  required: (value) => {
    return value.trim() ? null : 'This field is required';
  },
  
  minLength: (min) => (value) => {
    return value.length >= min ? null : `Must be at least ${min} characters`;
  },
  
  maxLength: (max) => (value) => {
    return value.length <= max ? null : `Must be no more than ${max} characters`;
  }
};

// Form validation class
class FormValidator {
  constructor(formElement) {
    this.form = formElement;
    this.fields = {};
    this.errors = {};
    this.init();
  }

  init() {
    // Get all form inputs
    const inputs = this.form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      this.fields[input.name] = {
        element: input,
        validators: this.getValidators(input),
        errorElement: this.createErrorElement(input)
      };
      
      // Add event listeners
      input.addEventListener('blur', () => this.validateField(input.name));
      input.addEventListener('input', () => this.clearFieldError(input.name));
    });
    
    // Add form submit handler
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  getValidators(input) {
    const validators = [];
    
    // Required validation
    if (input.hasAttribute('required')) {
      validators.push(validators.required);
    }
    
    // Email validation
    if (input.type === 'email') {
      validators.push(validators.email);
    }
    
    // Password validation
    if (input.type === 'password') {
      validators.push(validators.password);
    }
    
    // Min length validation
    if (input.hasAttribute('minlength')) {
      const min = parseInt(input.getAttribute('minlength'));
      validators.push(validators.minLength(min));
    }
    
    // Max length validation
    if (input.hasAttribute('maxlength')) {
      const max = parseInt(input.getAttribute('maxlength'));
      validators.push(validators.maxLength(max));
    }
    
    return validators;
  }

  createErrorElement(input) {
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.style.cssText = `
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
    `;
    
    input.parentNode.appendChild(errorElement);
    return errorElement;
  }

  validateField(fieldName) {
    const field = this.fields[fieldName];
    const value = field.element.value;
    let error = null;
    
    // Run all validators
    for (const validator of field.validators) {
      error = validator(value);
      if (error) break;
    }
    
    if (error) {
      this.showFieldError(fieldName, error);
      return false;
    } else {
      this.clearFieldError(fieldName);
      return true;
    }
  }

  validateForm() {
    let isValid = true;
    
    Object.keys(this.fields).forEach(fieldName => {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  showFieldError(fieldName, message) {
    const field = this.fields[fieldName];
    const errorElement = field.errorElement;
    
    errorElement.textContent = message;
    errorElement.style.opacity = '1';
    errorElement.style.transform = 'translateY(0)';
    
    field.element.style.borderColor = '#ef4444';
    field.element.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
  }

  clearFieldError(fieldName) {
    const field = this.fields[fieldName];
    const errorElement = field.errorElement;
    
    errorElement.style.opacity = '0';
    errorElement.style.transform = 'translateY(-10px)';
    
    field.element.style.borderColor = '';
    field.element.style.boxShadow = '';
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateForm()) {
      this.showFormError('Please fix the errors above');
      return false;
    }
    
    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());
    
    // Show loading state
    this.showLoadingState();
    
    try {
      // Simulate API call
      await this.submitForm(data);
      this.showSuccessMessage();
      this.resetForm();
    } catch (error) {
      this.showFormError(error.message);
    } finally {
      this.hideLoadingState();
    }
  }

  async submitForm(data) {
    // Simulate API call with delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure
        if (Math.random() > 0.1) {
          resolve(data);
        } else {
          reject(new Error('Something went wrong. Please try again.'));
        }
      }, 2000);
    });
  }

  showLoadingState() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<div class="loading-spinner"></div>';
    }
  }

  hideLoadingState() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Submit';
    }
  }

  showSuccessMessage() {
    this.showFormMessage('Success! Your message has been sent.', 'success');
  }

  showFormError(message) {
    this.showFormMessage(message, 'error');
  }

  showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = this.form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.style.cssText = `
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 0.5rem;
      font-weight: 500;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      ${type === 'success' ? 
        'background: #dcfce7; color: #166534; border: 1px solid #bbf7d0;' : 
        'background: #fef2f2; color: #991b1b; border: 1px solid #fecaca;'
      }
    `;
    messageElement.textContent = message;
    
    // Insert at the beginning of the form
    this.form.insertBefore(messageElement, this.form.firstChild);
    
    // Animate in
    setTimeout(() => {
      messageElement.style.opacity = '1';
      messageElement.style.transform = 'translateY(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      messageElement.style.opacity = '0';
      messageElement.style.transform = 'translateY(-10px)';
      setTimeout(() => messageElement.remove(), 300);
    }, 5000);
  }

  resetForm() {
    this.form.reset();
    
    // Clear all field errors
    Object.keys(this.fields).forEach(fieldName => {
      this.clearFieldError(fieldName);
    });
    
    // Remove form messages
    const messages = this.form.querySelectorAll('.form-message');
    messages.forEach(message => message.remove());
  }
}

// Login form handler
class LoginFormHandler extends FormValidator {
  constructor(formElement) {
    super(formElement);
    this.isAuthenticated = false;
  }

  async submitForm(data) {
    // Simulate login API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate authentication
        if (data.username && data.password) {
          this.isAuthenticated = true;
          resolve({ user: data.username, token: 'mock-jwt-token' });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1500);
    });
  }

  showSuccessMessage() {
    this.showFormMessage('Welcome back! Redirecting to dashboard...', 'success');
    
    // Simulate redirect
    setTimeout(() => {
      // In a real app, this would redirect to the dashboard
      alert('Login successful! This would redirect to the Zuuush dashboard.');
    }, 2000);
  }
}

// Contact form handler
class ContactFormHandler extends FormValidator {
  constructor(formElement) {
    super(formElement);
  }

  async submitForm(data) {
    // Simulate contact form submission
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate email sending
        if (data.email && data.message) {
          resolve({ message: 'Message sent successfully' });
        } else {
          reject(new Error('Please fill in all required fields'));
        }
      }, 2000);
    });
  }

  showSuccessMessage() {
    this.showFormMessage('Thank you! We\'ll get back to you soon.', 'success');
  }
}

// Initialize form handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize login form
  const loginForm = document.querySelector('#login form');
  if (loginForm) {
    new LoginFormHandler(loginForm);
  }
  
  // Initialize contact form
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    new ContactFormHandler(contactForm);
  }
});

// Real-time form validation feedback
const initRealTimeValidation = () => {
  const inputs = document.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    let timeout;
    
    input.addEventListener('input', () => {
      clearTimeout(timeout);
      
      // Debounce validation
      timeout = setTimeout(() => {
        const field = input.name;
        const value = input.value;
        
        // Basic validation feedback
        if (input.type === 'email' && value) {
          const isValid = validators.email(value) === null;
          input.style.borderColor = isValid ? '#10b981' : '#ef4444';
        }
        
        if (input.type === 'password' && value) {
          const isValid = validators.password(value) === null;
          input.style.borderColor = isValid ? '#10b981' : '#ef4444';
        }
      }, 300);
    });
  });
};

// Form accessibility improvements
const initFormAccessibility = () => {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    // Add ARIA labels
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
        const label = form.querySelector(`label[for="${input.id}"]`);
        if (label) {
          input.setAttribute('aria-labelledby', label.id);
        } else {
          input.setAttribute('aria-label', input.placeholder || input.name);
        }
      }
    });
    
    // Add form role
    form.setAttribute('role', 'form');
  });
};

// Initialize additional form features
document.addEventListener('DOMContentLoaded', () => {
  initRealTimeValidation();
  initFormAccessibility();
}); 