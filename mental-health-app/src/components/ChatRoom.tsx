import React from 'react';
import { Link } from 'react-router-dom';

const ChatRoom: React.FC = () => (
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
      <Link to="/achievements" className="nav-item" title="Achievements">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="7"/>
          <polyline points="8.21 13.89 7.5 21 12 18.5 16.5 21 15.79 13.88"/>
        </svg>
      </Link>
    </nav>

    <main className="chatroom-container">
      <div className="chatroom-layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Rooms</h2>
            <Link to="/create-room" className="create-room-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </Link>
          </div>
          <div className="room-list">
            <div className="room-item active">
              <div className="room-icon">🧘</div>
              <div className="room-info">
                <h3>Mindful Living</h3>
                <p>Last message: 2 min ago</p>
              </div>
            </div>
            <div className="room-item">
              <div className="room-icon">🏃</div>
              <div className="room-info">
                <h3>Fitness Friends</h3>
                <p>Last message: 5 min ago</p>
              </div>
            </div>
            <div className="room-item">
              <div className="room-icon">📝</div>
              <div className="room-info">
                <h3>Daily Journal</h3>
                <p>Last message: 10 min ago</p>
              </div>
            </div>
          </div>
        </div>
        <div className="chat-area">
          <div className="chat-header">
            <h2>Mindful Living</h2>
            <div className="room-stats">
              <span>1.2k members</span>
              <span>•</span>
              <span>Online</span>
            </div>
          </div>
          <div className="messages-container">
            <div className="message">
              <div className="message-avatar">👤</div>
              <div className="message-content">
                <div className="message-header">
                  <span className="username">Sarah</span>
                  <span className="timestamp">2:30 PM</span>
                </div>
                <p>Just completed my morning meditation! Feeling so much more centered today. Anyone else tried the new breathing exercise?</p>
              </div>
            </div>
            <div className="message">
              <div className="message-avatar">👤</div>
              <div className="message-content">
                <div className="message-header">
                  <span className="username">Mike</span>
                  <span className="timestamp">2:32 PM</span>
                </div>
                <p>Yes! The 4-7-8 breathing technique is amazing. I've been using it before bed and my sleep quality has improved so much.</p>
              </div>
            </div>
            <div className="message">
              <div className="message-avatar">👤</div>
              <div className="message-content">
                <div className="message-header">
                  <span className="username">Emma</span>
                  <span className="timestamp">2:35 PM</span>
                </div>
                <p>I'm new to meditation. Any tips for beginners? I find it hard to quiet my mind.</p>
              </div>
            </div>
          </div>
          <div className="message-input">
            <input type="text" placeholder="Type your message..." />
            <button className="send-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22,2 15,22 11,13 2,9"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  </>
);

export default ChatRoom; 