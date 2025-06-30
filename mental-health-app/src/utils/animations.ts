import { useEffect, useRef } from 'react';

export function useRevealOnScroll(className = 'reveal', threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('revealed');
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

// CSS to add in global styles or animations.css:
// .reveal { opacity: 0; transform: translateY(40px); transition: all 0.7s cubic-bezier(.4,0,.2,1); }
// .revealed { opacity: 1; transform: none; } 