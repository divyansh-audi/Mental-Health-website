import React, { useEffect, useRef } from 'react';
import './animated-header-visual.css';

const NUM_BUBBLES = 12;

const AnimatedHeaderVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Bubble properties
    const bubbles = Array.from({ length: NUM_BUBBLES }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 18 + Math.random() * 32,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.2,
      opacity: 0.18 + Math.random() * 0.18
    }));

    function drawGradient() {
      if (!ctx) return;
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#f3e7fa');
      grad.addColorStop(0.3, '#e0c3fc');
      grad.addColorStop(0.7, '#f5d0fe');
      grad.addColorStop(1, '#c7d2fe');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    function drawBubbles() {
      if (!ctx) return;
      for (const b of bubbles) {
        ctx.save();
        ctx.globalAlpha = b.opacity;
        const grad = ctx.createRadialGradient(b.x, b.y, b.r * 0.2, b.x, b.y, b.r);
        grad.addColorStop(0, '#fff');
        grad.addColorStop(1, '#a78bfa');
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.shadowColor = '#a78bfa';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      drawGradient();
      drawBubbles();
      for (const b of bubbles) {
        b.x += b.dx;
        b.y += b.dy;
        if (b.x < -b.r) b.x = width + b.r;
        if (b.x > width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = height + b.r;
        if (b.y > height + b.r) b.y = -b.r;
      }
      animationRef.current = requestAnimationFrame(animate);
    }

    function handleResize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    animate();
    window.addEventListener('resize', handleResize);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="animated-header-visual-bg">
      <canvas ref={canvasRef} className="animated-header-visual-canvas" />
    </div>
  );
};

export default AnimatedHeaderVisual; 