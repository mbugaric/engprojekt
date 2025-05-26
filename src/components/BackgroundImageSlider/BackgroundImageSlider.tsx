import React, { useEffect, useState, useRef } from "react";
import "./BackgroundImageSlider.scss";

const images = ["/images/main/01.jpg", "/images/main/02.jpg", "/images/main/04.jpg", "/images/main/05.jpg", "/images/main/06.jpg", "/images/main/07.jpg", "/images/main/08.jpg", "/images/main/09.jpg", "/images/main/10.jpg"];

const zoomEffects = ["zoom-in", "zoom-out"];

const getRandomZoom = () => zoomEffects[Math.floor(Math.random() * zoomEffects.length)];

const BackgroundImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [effects, setEffects] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    setEffects(images.map(() => getRandomZoom()));
  }, []);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, 3000);

    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasEnded(true);
    }, 7000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(
      () => {
        setPreviousIndex(currentIndex);
        setCurrentIndex((prev) => (prev + 1) % images.length);
      },
      currentIndex === 0 ? 7000 : 6000
    );

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hasStarted, currentIndex]);

  return (
    <div className="background-slider" id="home">
      <div
        className="background-slider__fallback"
        style={{
          backgroundImage: `url(${images[images.length - 1]})`,
        }}
      ></div>
      {images.map((src, index) => {
        const isActive = index === currentIndex;
        const isPrevious = index === previousIndex;
        const shouldAnimate = isActive || isPrevious || (!hasStarted && index === 0);

        const effectClass = shouldAnimate && (hasStarted || index !== 0) ? effects[index] : "";

        return (
          <div key={index} className={`background-slider__slide ${isActive ? "active" : ""} ${isPrevious ? "previous" : ""} ${effectClass}`}>
            <img src={src} alt={`Slide ${index + 1}`} />
          </div>
        );
      })}
      {hasEnded && (
        <div className="background-slider__title">
          <h1>ENG PROJEKT d.o.o.</h1>
          <h2>Projektiranje, nadzor i tehničko savjetovanje</h2>
        </div>
      )}
    </div>
  );
};

export default BackgroundImageSlider;
