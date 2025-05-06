import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "./VentilationSystem.scss";

const VentilationSystem: React.FC = () => {
  const controls = useAnimation();
  const rotationRef = useRef(0);
  const speedRef = useRef(2);

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      rotationRef.current += speedRef.current;
      controls.set({ rotate: rotationRef.current });

      if (Math.random() < 0.01) {
        speedRef.current = 20 + Math.random() * 30;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [controls]);

  return (
    <div className="ventilation-system">
      <motion.svg
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={controls}
      >
        <defs>
          <radialGradient id="chromeBlue" cx="70" cy="70" r="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f4f9fc" stopOpacity="1" />
            <stop offset="40%" stopColor="#b8cddf" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4d6b88" stopOpacity="0.3" />
          </radialGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx="70"
          cy="70"
          r="68"
          stroke="url(#chromeBlue)"
          strokeWidth="4"
          fill="url(#chromeBlue)"
          filter="url(#glow)"
        />

        <g fill="#6e8597" fillOpacity="0.55">
          <path d="M70 8 C88 35, 88 50, 70 46 C65 40, 65 20, 70 8 Z" />
          <path d="M132 70 C105 88, 90 88, 94 70 C100 65, 120 65, 132 70 Z" />
          <path d="M70 132 C52 105, 52 90, 70 94 C75 100, 75 120, 70 132 Z" />
          <path d="M8 70 C35 52, 50 52, 46 70 C40 75, 20 75, 8 70 Z" />
        </g>

        <circle
          cx="70"
          cy="70"
          r="8"
          fill="#2a3b4d"
          stroke="#e4f2f9"
          strokeWidth="2"
          filter="url(#glow)"
        />
      </motion.svg>
    </div>
  );
};

export default VentilationSystem;