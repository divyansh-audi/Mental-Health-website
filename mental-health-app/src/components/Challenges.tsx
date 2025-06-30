import React from 'react';
import { Link } from 'react-router-dom';

const challenges = [
  { title: "Mindful Mornings", emoji: "🎯", description: "Start your day with 10 minutes of mindfulness for 30 days.", progress: 60 },
  { title: "Fitness Streak", emoji: "👟", description: "Exercise daily and log your progress for 21 days.", progress: 80 },
  { title: "Healthy Eating", emoji: "🍎", description: "Share recipes and tips for a balanced diet for 14 days.", progress: 40 },
  { title: "30-Day Mindfulness Journey", emoji: "🌱", description: "Day 7 of 30 - Building mindful habits", progress: 23 },
  { title: "Home Workout Challenge", emoji: "✊🏻", description: "Day 12 of 21 - Keep moving at home", progress: 57 },
  { title: "Daily Gratitude Practice", emoji: "🎐", description: "Day 7 of 14 - Cultivating gratitude and positivity", progress: 50 },
  { title: "Hydration Challenge", emoji: "🐳", description: "Day 3 of 10 - Drink more water!", progress: 30 },
  { title: "Digital Detox Challenge", emoji: "👀", description: "Day 2 of 7 - Less screen time, more me time", progress: 15 },
  { title: "Morning Routine Challenge", emoji: "🌬️", description: "Day 5 of 21 - Start your day right", progress: 24 },
  { title: "Kindness Challenge", emoji: "🐁", description: "Day 1 of 7 - Spread kindness daily", progress: 5 }
];

const Challenges: React.FC = () => (
  <>
    <div className="floating-shapes global-shapes">
      <div className="floating-shape" />
      <div className="floating-shape" />
      <div className="floating-shape" />
      <div className="floating-shape" />
      <div className="floating-shape" />
      <div className="floating-shape" />
    </div>
    <div className="premium-grid" />
    
    {/* Navigation Sidebar */}
    <nav className="navigation">
      <Link to="/" className="nav-item" title="Home">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      </Link>
      <Link to="/dashboard" className="nav-item" title="Dashboard">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="3" y="13" width="7" height="8"/>
          <rect x="14" y="3" width="7" height="18"/>
        </svg>
      </Link>
      <Link to="/profile" className="nav-item" title="Profile">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 8-4 8-4s8 0 8 4"/>
        </svg>
      </Link>
      <Link to="/rooms" className="nav-item" title="Rooms">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </Link>
      <Link to="/create-room" className="nav-item" title="Create Room">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </Link>
      <Link to="/challenges" className="nav-item active" title="Challenges">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 3v4"/>
          <path d="M8 3v4"/>
        </svg>
      </Link>
      <Link to="/achievements" className="nav-item" title="Achievements">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="7"/>
          <polyline points="8.21 13.89 7.5 21 12 18.5 16.5 21 15.79 13.88"/>
        </svg>
      </Link>
    </nav>

    <main className="challenges-container">
      <header className="challenges-header">
        <h1 className="premium-title gradient-text">Wellness Challenges</h1>
        <p className="premium-subtitle gradient-subtitle">Join challenges, track progress, and grow with the community on your wellness journey</p>
        <div className="challenge-stats">
          <div className="stat-card">
            <span className="stat-value">3</span>
            <span className="stat-label">Active Challenges</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">8</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">1.2k</span>
            <span className="stat-label">Participants</span>
          </div>
        </div>
      </header>
      <section className="challenges-section">
        <div className="challenges-grid">
          {challenges.map((ch, i) => (
            <div className="challenge-card premium-card" key={i}>
              <div className="challenge-icon">{ch.emoji}</div>
              <h3 className="challenge-title">{ch.title}</h3>
              <p className="challenge-desc">{ch.description}</p>
              <div className="challenge-progress">
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${ch.progress}%` }}></div></div>
                <span className="progress-text">{ch.progress}% Complete</span>
              </div>
              <button className="btn-primary">Join Challenge</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  </>
);

export default Challenges; 