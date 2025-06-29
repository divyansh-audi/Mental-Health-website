# Zuuush - Mental Health Platform

A premium mental health website with wellness challenges, mood tracking, and community features.

## 🚀 Quick Start

1. Open `index.html` in your browser
2. Navigate through the premium UI
3. All pages are fully responsive and animated

## 📁 File Structure

```
Mental-Health-website/
├── index.html                 # Homepage
├── html-files/               # All application pages
├── css/                      # Styling files
├── js/                       # JavaScript functionality
├── images/                   # Assets
└── mental-health-app/        # React version
```

## 🔗 Backend Developer Notes

### Authentication
- **File**: `js/form-handlers.js` (lines 296-338)
- **Connect**: Login form submission
- **Replace**: Mock authentication with real API
- **Add**: JWT token handling

### User Data Management
- **File**: `js/main-dashboard.js` (lines 408-431)
- **Connect**: User profile loading
- **Replace**: localStorage with API calls
- **Add**: User session management

### Mood Tracking
- **File**: `js/main-dashboard.js` (lines 52-86)
- **Connect**: Mood submission button
- **Replace**: localStorage with POST /api/mood
- **Add**: Real-time mood history

### Streaks & Statistics
- **File**: `html-files/main.html` (lines 109-214)
- **Connect**: Stats display elements
- **Replace**: Hardcoded "7 Day Streak" with API data
- **Add**: Dynamic streak calculation

### Challenges System
- **File**: `js/wellness-challenges.js` (lines 13-178)
- **Connect**: Challenge data loading
- **Replace**: Hardcoded challenges array with GET /api/challenges
- **Add**: Progress tracking API

### Achievements
- **File**: `js/achievements.js` (lines 13-146)
- **Connect**: Achievement unlocking
- **Replace**: localStorage with POST /api/achievements/unlock
- **Add**: Real-time achievement notifications

### Chat Rooms
- **File**: `js/chatroom.js` (lines 12-60)
- **Connect**: Message sending/receiving
- **Replace**: Demo messages with WebSocket
- **Add**: Real-time chat functionality

### Room Creation
- **File**: `js/create-room.js` (lines 227-234)
- **Connect**: Room creation form
- **Replace**: localStorage with POST /api/rooms
- **Add**: Room validation

### Search Rooms
- **File**: `js/search-room.js` (lines 473-477)
- **Connect**: Search functionality
- **Replace**: localStorage with GET /api/rooms/search
- **Add**: Real-time search results

### Daily Logs
- **File**: `js/main-dashboard.js` (lines 88-108)
- **Connect**: Log submission
- **Replace**: localStorage with POST /api/logs
- **Add**: Log history API

### Profile Management
- **File**: `js/profile-page.js` (lines 365-382)
- **Connect**: Profile data loading
- **Replace**: localStorage with GET /api/user/profile
- **Add**: Avatar upload API

### Logout
- **File**: `js/main-dashboard.js` (lines 551-568)
- **Connect**: Logout button
- **Replace**: localStorage clear with POST /api/auth/logout
- **Add**: Session cleanup

## 🔌 API Endpoints Needed

```
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
GET /api/user/profile
PUT /api/user/profile
GET /api/user/stats
POST /api/mood/entry
GET /api/mood/history
GET /api/mood/streak
GET /api/challenges
POST /api/challenges/join
PUT /api/challenges/progress
GET /api/achievements
POST /api/achievements/unlock
GET /api/rooms
POST /api/rooms
GET /api/rooms/search
POST /api/logs
GET /api/logs/history
```

## 🎯 Priority Order

1. **Authentication** - Enable login/logout
2. **User Data** - Load user profiles
3. **Mood Tracking** - Save mood entries
4. **Challenges** - Load challenge data
5. **Chat** - Real-time messaging
6. **Achievements** - Unlock system
7. **Rooms** - Create/search rooms
8. **Logs** - Daily reflections
9. **Stats** - Streaks and XP
10. **Profile** - Avatar and settings

## 📝 Notes

- All localStorage/sessionStorage usage should be replaced with API calls
- Hardcoded data (streaks, XP, achievements) needs dynamic loading
- Demo data arrays should be removed
- Add loading states for all API calls
- Implement error handling for failed requests
- Use WebSocket for real-time features (chat, notifications)
- Add proper data validation on both frontend and backend

## 🎨 Design Features

- Premium glassmorphism UI
- Smooth animations and transitions
- Responsive design for all devices
- Modern gradient color schemes
- Interactive hover effects
- Floating background animations

## 🛠️ Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Chart.js for mood tracking
- WebSocket for real-time features
- LocalStorage (temporary, replace with API)
- Responsive design principles
- Modern CSS animations

---

**Backend Developer**: Replace all localStorage calls with your API endpoints. Start with authentication, then user data, then features. Add WebSocket for real-time chat.

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