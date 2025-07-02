import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const AnimatedCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (dotRef.current && ringRef.current) {
        // Use clientX and clientY for viewport-relative positioning
        let x = e.clientX;
        let y = e.clientY;
        
        // Apply profile page specific adjustment
        if (location.pathname === '/profile') {
          // No Y offset adjustment on profile page
          y = y - 0;
        }
        
        // Apply transforms with proper positioning
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
        ringRef.current.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
      }
    };

    // Add smooth transition for better performance
    const handleMouseEnter = () => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transition = 'none';
        ringRef.current.style.transition = 'none';
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transition = 'all 0.2s ease';
        ringRef.current.style.transition = 'all 0.2s ease';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [location.pathname]);

  return (
    <>
      <div 
        ref={dotRef} 
        style={{
          position: 'fixed',
          zIndex: 9999,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#8B5CF6',
          pointerEvents: 'none',
          transition: 'background 0.2s',
          mixBlendMode: 'exclusion',
          willChange: 'transform',
        }} 
      />
      <div 
        ref={ringRef} 
        style={{
          position: 'fixed',
          zIndex: 9998,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '2px solid #A855F7',
          pointerEvents: 'none',
          transition: 'border 0.2s',
          mixBlendMode: 'exclusion',
          willChange: 'transform',
        }} 
      />
    </>
  );
};

export default AnimatedCursor; 