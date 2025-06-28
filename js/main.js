// Main React Application for Zuuush Mental Health Website

const { useState, useEffect, useRef } = React;

// Navigation Component
const Navigation = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'login', label: 'LogIn', icon: '🔐' },
    { id: 'about', label: 'About Us', icon: '👥' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  return (
    <nav className="navigation glass">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onSectionChange(item.id);
          }}
          title={item.label}
        >
          <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
        </a>
      ))}
    </nav>
  );
};

// Header Section Component
const HeaderSection = () => {
  return (
    <section id="home" className="header-section">
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>
      <div className="header-background"></div>
      <div className="header-content animate-on-scroll">
        <div className="header-logo hover-scale">
          <img src="images/logo.png" alt="Zuuush Logo" />
        </div>
        <h1 className="text-gradient">Zuuush</h1>
        <h3 className="header-tagline">Breath and Blink</h3>
      </div>
    </section>
  );
};

// Login Section Component
const LoginSection = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Login functionality would be integrated with backend here!');
    }, 2000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="login" className="login-section">
      <div className="container">
        <div className="login-container animate-on-scroll">
          <div className="login-card glass-hover">
            <div className="login-header">
              <h2>Step Inside</h2>
            </div>
            <p className="login-description">
              No fancy promises here. Just a space where your thoughts don't have to make perfect sense and nobody's timing how long it takes you to figure things out. Think of it as that corner of the internet where you can actually breathe.
            </p>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="form-input form-input-focus"
                  placeholder="Enter username/gmail"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                <label className="form-label form-label-float">Who are you again?</label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-input form-input-focus"
                  placeholder="Make it mystical"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <label className="form-label form-label-float">Password</label>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-ripple btn-bounce"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="loading-spinner"></div>
                ) : (
                  'Step Inside'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const teamMembers = [
    {
      name: 'Somay',
      image: 'images/somay.jpg',
      role: 'Developer & Designer'
    },
    {
      name: 'Kriti',
      image: 'images/kriti.jpg',
      role: 'Psychology Enthusiast'
    },
    {
      name: 'Divyansh',
      image: 'images/divyansh.jpg',
      role: 'UX Researcher'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-container">
          <div className="about-header animate-on-scroll">
            <h2>The People Behind This</h2>
          </div>
          <p className="about-description animate-on-scroll">
            We're a small team of developers, designers, and psychology enthusiasts who got tired of mental health apps that felt more like homework than help. Yeah, we are like you, we used those. So we decided to build something different.
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`team-member card-3d stagger-animation`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="team-photo hover-scale">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </div>
          <p className="about-closing animate-on-scroll">
            Our approach is simple: create tools that work with how people actually think and feel, not how we think they should. We test everything with real people because that's the only way to know if it actually helps.
          </p>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent! We\'ll get back to you soon.');
      setFormData({ email: '', message: '' });
    }, 2000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
    { name: 'X (Twitter)', icon: '🐦', url: 'https://twitter.com' }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-container">
          <div className="contact-header animate-on-scroll">
            <h2>Get In Touch</h2>
          </div>
          <p className="contact-description animate-on-scroll">
            Found a bug? Have an idea? Just want to tell us this actually helped? We're real people who check our messages. No chatbots, no copy-paste responses. Just us, probably drinking too much coffee and trying to make this thing work better.
          </p>
          <div className="contact-form glass-hover animate-on-scroll">
            <form onSubmit={handleSubmit}>
              <div className="contact-form-group">
                <input
                  type="email"
                  name="email"
                  className="contact-input form-input-focus"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <label className="form-label form-label-float">Gmail</label>
              </div>
              <div className="contact-form-group">
                <textarea
                  name="message"
                  className="contact-input contact-textarea form-input-focus"
                  placeholder="Tell us what's on your mind..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="contact-submit btn-ripple btn-bounce"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="loading-spinner"></div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
          <div className="social-icons">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon social-icon-hover social-icon-bounce"
                title={social.name}
              >
                <span style={{ fontSize: '1.5rem' }}>{social.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand animate-on-scroll">ZUUUSH</div>
        <p className="footer-copyright animate-on-scroll">
          © 2025 Zuuush. Made by humans who also need therapy sometimes.
        </p>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Smooth scrolling for navigation
    const handleSmoothScroll = (e) => {
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Add event listeners for smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%)'
      }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <HeaderSection />
      <LoginSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root')); 