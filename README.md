# Zuuush Mental Health Website

A stunning, modern mental health platform focused on gamified wellness challenges, community support, and personal growth tracking. Built with pure HTML, CSS, JavaScript, and React - no frameworks, just clean, performant code.

## 🌟 Features

### Visual Design
- **Glassmorphism Effects**: Beautiful frosted glass cards and navigation
- **Smooth Animations**: Scroll-triggered animations, hover effects, and micro-interactions
- **Parallax Scrolling**: Immersive depth effects throughout the site
- **Responsive Design**: Perfect on all devices from mobile to desktop
- **Modern Typography**: Clean, readable DM Sans font family
- **Gradient Text Effects**: Eye-catching brand elements

### Interactive Elements
- **Fixed Side Navigation**: Liquid glass effect with active section highlighting
- **Form Validation**: Real-time validation with smooth error states
- **Loading States**: Beautiful loading animations for form submissions
- **Hover Effects**: 3D card rotations, button ripples, and scale transforms
- **Smooth Scrolling**: Seamless navigation between sections

### Content Sections
1. **Header**: Hero section with animated logo and tagline
2. **Login**: Glassmorphism login form with validation
3. **About**: Team showcase with member photos and descriptions
4. **Contact**: Contact form with social media links
5. **Footer**: Brand closure with copyright information

## 🎨 Design Philosophy

### Brand Identity
- **Name**: Zuuush
- **Tagline**: "Breath and Blink"
- **Tone**: Casual, authentic, anti-corporate, conversational but professional
- **Vibe**: Like talking to a smart friend who knows what they're doing

### Color Palette
- **Primary**: Deep blues (#1e40af) for trust and calm
- **Secondary**: Soft purples (#8b5cf6) for creativity
- **Accent**: Warm coral (#f97316) for CTAs
- **Neutral**: Clean whites and light grays

### Typography
- **Font**: DM Sans (Google Fonts)
- **Hierarchy**: Clear heading structure with gradient effects
- **Readability**: Optimized line heights and spacing

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Ensure all files are in the correct directory structure:
   ```
   Mental-Health-website/
   ├── index.html
   ├── css/
   │   ├── main.css
   │   ├── components.css
   │   └── animations.css
   ├── js/
   │   ├── main.js
   │   ├── animations.js
   │   └── form-handlers.js
   └── images/
       ├── logo.png
       ├── logoo.png
       ├── somay.jpg
       ├── kriti.jpg
       └── divyansh.jpg
   ```

3. Open `index.html` in your web browser
4. For development, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 📁 File Structure

### HTML
- `index.html` - Main HTML structure with React setup

### CSS
- `css/main.css` - Global styles, variables, and utilities
- `css/components.css` - Component-specific styles
- `css/animations.css` - Animation keyframes and effects

### JavaScript
- `js/main.js` - React components and main application logic
- `js/animations.js` - Scroll animations, parallax, and interactions
- `js/form-handlers.js` - Form validation and submission handling

### Images
- `images/logo.png` - Full Zuuush logo
- `images/logoo.png` - Logo icon only
- `images/somay.jpg` - Team member photo
- `images/kriti.jpg` - Team member photo
- `images/divyansh.jpg` - Team member photo

## 🎯 Key Features Explained

### Navigation System
The fixed left-side navigation uses:
- Glassmorphism background with backdrop blur
- Active section detection via Intersection Observer
- Smooth color transitions and hover effects
- Emoji icons for visual appeal

### Form Handling
Both login and contact forms feature:
- Real-time validation with visual feedback
- Loading states with spinner animations
- Success/error message handling
- Accessibility improvements (ARIA labels, keyboard navigation)

### Animation System
Comprehensive animation framework including:
- Scroll-triggered animations using Intersection Observer
- Parallax effects for depth
- Hover micro-interactions
- Performance optimizations (requestAnimationFrame)
- Reduced motion support for accessibility

### Responsive Design
Mobile-first approach with:
- Flexible grid layouts
- Touch-friendly button sizes
- Optimized animations for mobile performance
- Collapsible navigation for smaller screens

## 🛠️ Customization

### Colors
Modify CSS custom properties in `css/main.css`:
```css
:root {
  --primary-color: #1e40af;
  --secondary-color: #8b5cf6;
  --accent-color: #f97316;
  /* ... other variables */
}
```

### Content
Update team member information in `js/main.js`:
```javascript
const teamMembers = [
  {
    name: 'Your Name',
    image: 'images/your-photo.jpg',
    role: 'Your Role'
  }
  // ... add more members
];
```

### Animations
Adjust animation timing in `css/animations.css`:
```css
.animate-on-scroll {
  transition: all 0.8s ease-out; /* Modify duration */
}
```

## 🔧 Technical Details

### Performance Optimizations
- CSS custom properties for efficient theming
- Intersection Observer for scroll animations
- RequestAnimationFrame for smooth parallax
- Debounced scroll events
- Lazy loading for images
- Reduced motion support

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Accessibility Features
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Reduced motion preferences
- Semantic HTML structure

## 🎨 Animation Classes

### Scroll Animations
- `.animate-on-scroll` - Fade in from bottom
- `.animate-on-scroll-left` - Slide in from left
- `.animate-on-scroll-right` - Slide in from right
- `.animate-on-scroll-scale` - Scale in effect
- `.stagger-animation` - Staggered timing for groups

### Hover Effects
- `.hover-lift` - Lift on hover
- `.hover-scale` - Scale on hover
- `.hover-glow` - Glow effect
- `.hover-rotate` - Rotation effect

### Interactive Elements
- `.btn-ripple` - Button ripple effect
- `.card-3d` - 3D card rotation
- `.glass-hover` - Glassmorphism hover
- `.social-icon-hover` - Social icon animations

## 📱 Mobile Considerations

### Touch Interactions
- Minimum 44px touch targets
- Simplified animations for performance
- Swipe-friendly navigation
- Optimized image loading

### Performance
- Reduced animation complexity on mobile
- Optimized scroll performance
- Efficient memory usage
- Fast loading times

## 🔮 Future Enhancements

### Potential Additions
- Dark mode toggle
- More interactive animations
- Advanced form features
- Backend integration
- User authentication system
- Real-time chat features
- Progress tracking dashboard

### Backend Integration
The current frontend is designed to easily integrate with:
- Node.js/Express backend
- MongoDB database
- JWT authentication
- Email services
- Real-time features (Socket.io)

## 📄 License

This project is created for the Zuuush mental health platform. All rights reserved.

## 👥 Team

- **Somay** - Developer & Designer
- **Kriti** - Psychology Enthusiast  
- **Divyansh** - UX Researcher

## 🤝 Contributing

This is a frontend showcase project. For backend integration or feature requests, please contact the development team.

---

**Zuuush** - Breath and Blink. Made by humans who also need therapy sometimes. 