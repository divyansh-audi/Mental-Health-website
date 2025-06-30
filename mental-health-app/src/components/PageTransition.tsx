import React from 'react';
import { motion, useAnimation, useMotionValue, useTransform, useSpring, useReducedMotion, AnimatePresence, easeInOut } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: easeInOut } }
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={variants}
    style={{ minHeight: '100vh' }}
  >
    {children}
  </motion.div>
);

export default PageTransition; 