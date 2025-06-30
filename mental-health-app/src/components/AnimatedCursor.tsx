import React, { useEffect, useRef } from 'react';

const AnimatedCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        ringRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', zIndex: 9999, width: 8, height: 8, borderRadius: '50%', background: '#8B5CF6', pointerEvents: 'none', transition: 'background 0.2s', mixBlendMode: 'exclusion',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', zIndex: 9998, width: 32, height: 32, borderRadius: '50%', border: '2px solid #A855F7', pointerEvents: 'none', transition: 'border 0.2s', mixBlendMode: 'exclusion',
      }} />
    </>
  );
};

export default AnimatedCursor; 