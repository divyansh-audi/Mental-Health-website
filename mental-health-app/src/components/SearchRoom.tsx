import React from 'react';
import { Link } from 'react-router-dom';

const SearchRoom: React.FC = () => (
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
      <Link to="/rooms" className="nav-item active" title="Rooms">
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
      <Link to="/achievements" className="nav-item" title="Achievements">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="7"/>
          <polyline points="8.21 13.89 7.5 21 12 18.5 16.5 21 15.79 13.88"/>
        </svg>
      </Link>
    </nav>

    <main className="search-container">
      <header className="search-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1 className="premium-title">Find Wellness Rooms</h1>
            <p className="header-subtitle premium-subtitle">Discover and join communities that support your mental health journey</p>
          </div>
          <div className="search-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"/>
                  <path d="M9 22V12H15V22"/>
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value premium-number">150+</span>
                <span className="stat-label premium-text">Active Rooms</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21V19C23 17.9391 22.5786 16.9217 21.8284 16.1716C21.0783 15.4214 20.0609 15 19 15H16"/>
                  <circle cx="16" cy="7" r="4"/>
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value premium-number">2.5k+</span>
                <span className="stat-label premium-text">Members</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value premium-number">10k+</span>
                <span className="stat-label premium-text">Messages</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="search-section">
        <div className="search-container">
          <div className="search-input-group">
            <input type="text" id="searchInput" placeholder="Search for rooms, topics, or keywords..." className="search-input premium-input" />
            <button className="search-btn" id="searchBtn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21L16.65 16.65"/>
              </svg>
            </button>
          </div>
          <div className="filter-tags">
            <button className="filter-tag active premium-tag" data-filter="all">All Rooms</button>
            <button className="filter-tag premium-tag" data-filter="mindfulness">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                <path d="M2 17L12 22L22 17"/>
                <path d="M2 12L12 17L22 12"/>
              </svg>
              Mindfulness
            </button>
            <button className="filter-tag premium-tag" data-filter="fitness">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 4h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
                <path d="M12 6v4l3 3"/>
              </svg>
              Fitness
            </button>
            <button className="filter-tag premium-tag" data-filter="nutrition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                <line x1="6" y1="1" x2="6" y2="4"/>
                <line x1="10" y1="1" x2="10" y2="4"/>
                <line x1="14" y1="1" x2="14" y2="4"/>
              </svg>
              Nutrition
            </button>
            <button className="filter-tag premium-tag" data-filter="social">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21V19C23 17.9391 22.5786 16.9217 21.8284 16.1716C21.0783 15.4214 20.0609 15 19 15H16"/>
                <circle cx="16" cy="7" r="4"/>
              </svg>
              Social
            </button>
            <button className="filter-tag premium-tag" data-filter="creative">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                <path d="M2 2l7.586 7.586"/>
                <circle cx="11" cy="11" r="2"/>
              </svg>
              Creative
            </button>
          </div>
        </div>
      </section>
      <section className="featured-rooms">
        <div className="section-header">
          <h2 className="premium-section-title">Featured Rooms</h2>
          <p className="premium-section-subtitle">Popular and trending wellness communities</p>
        </div>
        <div className="featured-grid">
          <div className="room-card featured" data-room-id="1">
            <div className="room-banner">
              <div className="room-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                  <path d="M2 17L12 22L22 17"/>
                  <path d="M2 12L12 17L22 12"/>
                </svg>
              </div>
              <div className="room-badge">Trending</div>
            </div>
            <div className="room-content">
              <h3 className="premium-card-title">Mindful Living</h3>
              <p className="premium-card-description">A supportive community for mindfulness and meditation practices</p>
              <div className="room-stats">
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21V19C23 17.9391 22.5786 16.9217 21.8284 16.1716C21.0783 15.4214 20.0609 15 19 15H16"/>
                    <circle cx="16" cy="7" r="4"/>
                  </svg>
                  1.2k members
                </span>
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  5.4k messages
                </span>
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  4.8/5 rating
                </span>
              </div>
              <Link to="/chatroom" className="btn-primary">Join Room</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  </>
);

export default SearchRoom; 