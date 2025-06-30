import React from 'react';
import { Link } from 'react-router-dom';

const achievements = [
  { title: '7-Day Streak', desc: 'Maintained a 7-day mood tracking streak', date: 'Unlocked 2 days ago', progress: 100 },
  { title: 'Reflection Master', desc: 'Wrote 10 daily reflections', date: 'Unlocked 1 week ago', progress: 100 },
  { title: 'Community Helper', desc: 'Helped 5 other users in wellness rooms', date: 'Unlocked 2 weeks ago', progress: 100 },
];

const Achievements: React.FC = () => (
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
      <Link to="/challenges" className="nav-item" title="Challenges">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 3v4"/>
          <path d="M8 3v4"/>
        </svg>
      </Link>
      <Link to="/achievements" className="nav-item active" title="Achievements">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="7"/>
          <polyline points="8.21 13.89 7.5 21 12 18.5 16.5 21 15.79 13.88"/>
        </svg>
      </Link>
    </nav>

    <main className="achievements-container">
      <header className="achievements-header">
        <div className="header-content">
          <h1>Your Achievements</h1>
          <p>Celebrate your mental wellness milestones</p>
        </div>
      </header>
      <section className="progress-overview">
        <div className="progress-header">
          <h2>Your Achievement Progress</h2>
        </div>
        <div className="progress-stats">
          <div className="progress-stat">
            <span className="progress-number">12</span>
            <span className="progress-label">Total Achievements</span>
          </div>
          <div className="progress-stat">
            <span className="progress-number">75%</span>
            <span className="progress-label">Completion Rate</span>
          </div>
          <div className="progress-stat">
            <span className="progress-number">7</span>
            <span className="progress-label">Day Streak</span>
          </div>
          <div className="progress-stat">
            <span className="progress-number">2,450</span>
            <span className="progress-label">Total XP</span>
          </div>
        </div>
      </section>
      <section className="achievements-section">
        <div className="achievements-header-section">
          <h2>Recently Unlocked</h2>
        </div>
        <div className="achievements-grid">
          {achievements.map((a, i) => (
            <div className="achievement-card unlocked" key={i}>
              <div className="achievement-banner">
                <div className="achievement-icon">🏆</div>
                <div className="achievement-status">Unlocked</div>
              </div>
              <div className="achievement-content">
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <div className="achievement-meta">
                  <span className="achievement-date">{a.date}</span>
                  <div className="achievement-progress">
                    <span className="progress-text">Complete</span>
                    <div className="progress-bar">
                      <div className="progress-fill complete" style={{ width: `${a.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  </>
);

export default Achievements; 