import React, { useEffect, useState } from "react";
import "./Gear.scss";

const Gear: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const about = document.getElementById("about");
      if (!about) return;
      const rect = about.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
      const isVisible = visibleHeight > windowHeight * 0.5;

      setVisible(isVisible);
      setRotation(window.scrollY / 4); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`gear ${visible ? "gear--visible" : ""}`}>
      <img src="/assets/gear.png" alt="Gear" style={{ transform: `rotate(${rotation}deg)` }} />
    </div>
  );
};

export default Gear;