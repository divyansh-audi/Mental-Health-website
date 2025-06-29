import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

// Types
interface Message {
  id: number;
  author: string;
  text: string;
  time: string;
  own: boolean;
  avatar: string;
  reactions: Record<string, number>;
}

interface Member {
  name: string;
  status: 'online' | 'offline';
  avatar: string;
  lastSeen: string;
  typing: boolean;
}

interface ChatRoomProps {
  roomName?: string;
  roomId?: string;
}

// Styled Components
const ChatContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const Header = styled.header`
  grid-column: 1 / -1;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(20px);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  border-radius: 1.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: fadeInHeader 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  @keyframes fadeInHeader {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const RoomInfo = styled.div`
  flex: 1;
`;

const PremiumTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-weight: 800;
  font-size: 2.25rem;
  background: linear-gradient(90deg, #764ba2 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  letter-spacing: -0.025em;
  text-shadow: 0 2px 16px rgba(118, 75, 162, 0.08);
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.875rem;
  }
`;

const PremiumSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  background: linear-gradient(90deg, #f093fb 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const RoomStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: translateY(-2px);
  }
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatValue = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  line-height: 1;
`;

const StatLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #5a5f73;
  font-weight: 500;
  line-height: 1.4;
`;

const RoomActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const PremiumButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  color: ${props => props.variant === 'secondary' ? '#764ba2' : '#fff'};
  background: ${props => props.variant === 'secondary' 
    ? 'rgba(255, 255, 255, 0.18)' 
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  border: ${props => props.variant === 'secondary' 
    ? '1.5px solid #764ba2' 
    : 'none'};
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.variant === 'secondary' 
    ? '0 2px 12px rgba(118, 75, 162, 0.08)' 
    : '0 4px 16px rgba(102, 126, 234, 0.3)'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.variant === 'secondary' 
      ? '0 4px 16px rgba(118, 75, 162, 0.15)' 
      : '0 8px 24px rgba(102, 126, 234, 0.4)'};
    background: ${props => props.variant === 'secondary' 
      ? 'rgba(118, 75, 162, 0.1)' 
      : 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'};
  }
`;

const ChatSection = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.18);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 1.5rem;
  animation: fadeInCard 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @keyframes fadeInCard {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  }
`;

const Message = styled.div<{ own: boolean }>`
  display: flex;
  gap: 1rem;
  animation: messageSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  flex-direction: ${props => props.own ? 'row-reverse' : 'row'};
  
  @keyframes messageSlideIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageAvatar = styled.div<{ own: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.own 
    ? 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)' 
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
`;

const MessageContent = styled.div<{ own: boolean }>`
  max-width: 70%;
  background: ${props => props.own 
    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)' 
    : 'rgba(255, 255, 255, 0.12)'};
  backdrop-filter: blur(15px);
  border-radius: 1.5rem;
  padding: 1.2rem 1.5rem;
  border: 1px solid ${props => props.own 
    ? 'rgba(102, 126, 234, 0.2)' 
    : 'rgba(255, 255, 255, 0.15)'};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const MessageAuthor = styled.span`
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
`;

const MessageTime = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  font-family: 'Inter', sans-serif;
`;

const MessageText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  line-height: 1.5;
  font-family: 'Poppins', sans-serif;
`;

const MessageReactions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

const Reaction = styled.span`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
`;

const ChatInputSection = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const PremiumInput = styled.input`
  flex: 1;
  min-height: 48px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #444a57;
  background: rgba(255, 255, 255, 0.18);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  border-radius: 0.75rem;
  padding: 0.875rem 1.25rem;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  &:focus {
    border-color: #764ba2;
    box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
    background: rgba(255, 255, 255, 0.25);
  }
  
  &::placeholder {
    color: #7a7a8c;
    opacity: 1;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 400;
  }
`;

const SendButton = styled(PremiumButton)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: calc(100vh - 200px);
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.18);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 1.5rem;
  animation: fadeInCard 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 1024px) {
    order: -1;
    height: auto;
    max-height: 300px;
  }
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 3px;
  }
`;

const SidebarSection = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 0 2px 8px rgba(118, 75, 162, 0.2);
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MemberItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
  }
`;

const MemberAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.15);
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  margin-bottom: 0.25rem;
`;

const MemberStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Inter', sans-serif;
`;

const StatusIndicator = styled.div<{ status: 'online' | 'offline' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.status === 'online' ? '#10b981' : '#6b7280'};
  box-shadow: 0 0 8px ${props => props.status === 'online' 
    ? 'rgba(16, 185, 129, 0.5)' 
    : 'rgba(107, 114, 128, 0.3)'};
`;

const TypingIndicator = styled.span`
  color: #667eea;
  font-style: italic;
  font-size: 0.8rem;
  animation: typingPulse 1.5s ease-in-out infinite;
  
  @keyframes typingPulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`;

const RulesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Rule = styled.div`
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #5a5f73;
  font-weight: 500;
  line-height: 1.4;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(4px);
  }
`;

// Demo Data
const demoMessages: Message[] = [
  {
    id: 1,
    author: 'Sarah',
    text: 'Hey everyone! How is your wellness journey going today? 🌱',
    time: '2:30 PM',
    own: false,
    avatar: 'S',
    reactions: { '❤️': 3, '👍': 2 }
  },
  {
    id: 2,
    author: 'Mike',
    text: 'Just completed my morning meditation. Feeling really centered! 🧘‍♂️',
    time: '2:32 PM',
    own: false,
    avatar: 'M',
    reactions: { '🙏': 4, '✨': 2 }
  },
  {
    id: 3,
    author: 'You',
    text: 'That\'s amazing Mike! I\'m trying to build a consistent meditation habit too. Any tips?',
    time: '2:35 PM',
    own: true,
    avatar: 'Y',
    reactions: { '💪': 1 }
  },
  {
    id: 4,
    author: 'Emma',
    text: 'Anyone up for a quick breathing exercise? I found this great 5-minute routine! 🌬️',
    time: '2:37 PM',
    own: false,
    avatar: 'E',
    reactions: { '🙋‍♀️': 2, '💙': 1 }
  },
  {
    id: 5,
    author: 'David',
    text: 'Count me in! I could use a moment to reset. Thanks for sharing Emma!',
    time: '2:38 PM',
    own: false,
    avatar: 'D',
    reactions: { '👍': 3 }
  }
];

const demoMembers: Member[] = [
  { 
    name: 'Sarah', 
    status: 'online', 
    avatar: 'S',
    lastSeen: '2 minutes ago',
    typing: false
  },
  { 
    name: 'Mike', 
    status: 'online', 
    avatar: 'M',
    lastSeen: '1 minute ago',
    typing: true
  },
  { 
    name: 'Emma', 
    status: 'online', 
    avatar: 'E',
    lastSeen: 'now',
    typing: false
  },
  { 
    name: 'David', 
    status: 'online', 
    avatar: 'D',
    lastSeen: '30 seconds ago',
    typing: false
  },
  { 
    name: 'Lisa', 
    status: 'offline', 
    avatar: 'L',
    lastSeen: '2 hours ago',
    typing: false
  },
  { 
    name: 'John', 
    status: 'offline', 
    avatar: 'J',
    lastSeen: '1 day ago',
    typing: false
  }
];

const ChatRoom: React.FC<ChatRoomProps> = ({ roomName = 'Wellness Chat Room', roomId = 'wellness-1' }) => {
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [members, setMembers] = useState<Member[]>(demoMembers);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    // Simulate typing indicators
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const onlineMembers = members.filter(m => m.status === 'online' && m.name !== 'You');
        if (onlineMembers.length > 0) {
          const randomMember = onlineMembers[Math.floor(Math.random() * onlineMembers.length)];
          setMembers(prev => prev.map(m => 
            m.name === randomMember.name ? { ...m, typing: true } : m
          ));
          
          setTimeout(() => {
            setMembers(prev => prev.map(m => 
              m.name === randomMember.name ? { ...m, typing: false } : m
            ));
          }, 2000 + Math.random() * 3000);
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [members]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      author: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      own: true,
      avatar: 'Y',
      reactions: {}
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate response
    setTimeout(() => {
      const responses = [
        'Thanks for sharing! 🙏',
        'That\'s really helpful! 💡',
        'I can relate to that! 🤝',
        'Great perspective! ✨',
        'Keep going! You\'re doing amazing! 💪',
        'That\'s wonderful! 🌟',
        'Thanks for the inspiration! 🎯',
        'You\'ve got this! 🔥'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const onlineMembers = members.filter(m => m.status === 'online' && m.name !== 'You');
      const randomMember = onlineMembers[Math.floor(Math.random() * onlineMembers.length)];
      
      if (randomMember) {
        const responseMessage: Message = {
          id: Date.now() + 1,
          author: randomMember.name,
          text: randomResponse,
          time: new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }),
          own: false,
          avatar: randomMember.avatar,
          reactions: {}
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }
    }, 1000 + Math.random() * 2000);
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const addReaction = (messageId: number, emoji: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            reactions: { 
              ...msg.reactions, 
              [emoji]: (msg.reactions[emoji] || 0) + 1 
            } 
          }
        : msg
    ));
  };

  return (
    <ChatContainer>
      <Header>
        <HeaderContent>
          <RoomInfo>
            <PremiumTitle>{roomName}</PremiumTitle>
            <PremiumSubtitle>Connect with others on your wellness journey</PremiumSubtitle>
            <RoomStats>
              <StatCard>
                <StatIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="m22 21-2-2"/>
                    <path d="M16 16.28A5.5 5.5 0 0 0 18 12h-2a4 4 0 0 0-4 4v2"/>
                  </svg>
                </StatIcon>
                <StatInfo>
                  <StatValue>1.2k</StatValue>
                  <StatLabel>Members</StatLabel>
                </StatInfo>
              </StatCard>
              <StatCard>
                <StatIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </StatIcon>
                <StatInfo>
                  <StatValue>5.4k</StatValue>
                  <StatLabel>Messages</StatLabel>
                </StatInfo>
              </StatCard>
              <StatCard>
                <StatIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                </StatIcon>
                <StatInfo>
                  <StatValue>4.9</StatValue>
                  <StatLabel>Rating</StatLabel>
                </StatInfo>
              </StatCard>
            </RoomStats>
          </RoomInfo>
          <RoomActions>
            <PremiumButton variant="secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              Room Info
            </PremiumButton>
            <PremiumButton>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="m22 21-2-2"/>
                <path d="M16 16.28A5.5 5.5 0 0 0 18 12h-2a4 4 0 0 0-4 4v2"/>
              </svg>
              Invite Friends
            </PremiumButton>
          </RoomActions>
        </HeaderContent>
      </Header>

      <ChatSection>
        <ChatContainer>
          <ChatMessages>
            {messages.map((message) => (
              <Message key={message.id} own={message.own}>
                <MessageAvatar own={message.own}>{message.avatar}</MessageAvatar>
                <MessageContent own={message.own}>
                  <MessageHeader>
                    <MessageAuthor>{message.author}</MessageAuthor>
                    <MessageTime>{message.time}</MessageTime>
                  </MessageHeader>
                  <MessageText 
                    onDoubleClick={() => !message.own && addReaction(message.id, '❤️')}
                  >
                    {message.text}
                  </MessageText>
                  {Object.keys(message.reactions).length > 0 && (
                    <MessageReactions>
                      {Object.entries(message.reactions).map(([emoji, count]) => (
                        <Reaction key={emoji} title={`${count} people reacted`}>
                          {emoji} {count}
                        </Reaction>
                      ))}
                    </MessageReactions>
                  )}
                </MessageContent>
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>
          
          <ChatInputSection>
            <InputGroup>
              <PremiumInput
                type="text"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  handleTyping();
                }}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
              />
              <SendButton onClick={handleSendMessage}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22,2 15,22 11,13 2,9"/>
                </svg>
              </SendButton>
            </InputGroup>
          </ChatInputSection>
        </ChatContainer>
      </ChatSection>

      <Sidebar>
        <SidebarSection>
          <SectionTitle>Online Members</SectionTitle>
          <MemberList>
            {members.map((member) => (
              <MemberItem key={member.name}>
                <MemberAvatar>{member.avatar}</MemberAvatar>
                <MemberInfo>
                  <MemberName>{member.name}</MemberName>
                  <MemberStatus>
                    <StatusIndicator status={member.status} />
                    <span>{member.status === 'online' ? 'Online' : member.lastSeen}</span>
                    {member.typing && <TypingIndicator>typing...</TypingIndicator>}
                  </MemberStatus>
                </MemberInfo>
              </MemberItem>
            ))}
          </MemberList>
        </SidebarSection>
        
        <SidebarSection>
          <SectionTitle>Room Rules</SectionTitle>
          <RulesList>
            <Rule>✅ Be kind and supportive</Rule>
            <Rule>✅ Respect everyone's privacy</Rule>
            <Rule>✅ No spam or inappropriate content</Rule>
            <Rule>✅ Stay on topic</Rule>
          </RulesList>
        </SidebarSection>
      </Sidebar>
    </ChatContainer>
  );
};

export default ChatRoom; 