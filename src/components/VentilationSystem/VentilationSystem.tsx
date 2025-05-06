import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "./VentilationSystem.scss";

const VentilationSystem: React.FC = () => {
  const controls = useAnimation();
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    const newScrollY = window.scrollY;
    setScrollY(newScrollY);
    controls.start({
      rotate: newScrollY / 3, // sporija rotacija
      transition: { ease: "easeOut", duration: 0.3 },
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="ventilation-system">
      <motion.svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={controls}
      >
        <circle cx="70" cy="70" r="68" stroke="#c0d6e4" strokeWidth="4" />
        <g fill="#87a5bd">
          <path d="M70 5 L78 45 A25 25 0 0 1 70 35 Z" />
          <path d="M135 70 L95 78 A25 25 0 0 1 105 70 Z" />
          <path d="M70 135 L62 95 A25 25 0 0 1 70 105 Z" />
          <path d="M5 70 L45 62 A25 25 0 0 1 35 70 Z" />
        </g>
        <circle cx="70" cy="70" r="8" fill="#2e3e4e" />
      </motion.svg>
    </div>
  );
};

export default VentilationSystem;