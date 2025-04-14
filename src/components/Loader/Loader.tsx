// src/components/Loader.tsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Loader.scss';

const Loader: React.FC = () => {
  const circleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          delay: 0.3,
          onComplete: () => setHide(true),
        });
      },
    });

    tl.fromTo(
      circleRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
    )
      .to(
        circleRef.current,
        {
          scaleX: 15,
          scaleY: 0.15,
          backgroundColor: '#d4af37',
          duration: 1,
          ease: 'power4.inOut',
        },
        "+=0.3"
      )
      .to(
        circleRef.current,
        {
          width: '60vw',
          height: '4px',
          borderRadius: 0,
          duration: 0.5,
        },
        '-=0.5'
      )
      .to(
        textRef.current,
        {
          opacity: 1,
          duration: 0.6,
          onStart: () => {
            if (circleRef.current) circleRef.current.style.visibility = 'hidden';
          },
        },
        '+=0.2'
      )
      .to(
        textRef.current,
        { scale: 1.1, duration: 1, ease: 'power2.out' }
      )
      .to(
        textRef.current,
        {
          scale: 6,
          color: 'transparent',
          WebkitTextStroke: '1px #d4af37',
          duration: 1,
          ease: 'power4.inOut',
        },
        '+=0.2'
      )
      .to(
        bgRef.current,
        { opacity: 1, duration: 1.2, ease: 'power2.inOut' },
        '-=0.8'
      );
  }, []);

  if (hide) return null;

  return (
    <div className="loader">
      <div className="loader__bg" ref={bgRef}></div>
      <div className="loader__overlay" ref={overlayRef}></div>
      <div className="loader__center">
        <div className="loader__circle" ref={circleRef}></div>
        <h1 className="loader__text" ref={textRef}>ENG PROJEKT d.o.o.</h1>
      </div>
    </div>
  );
};

export default Loader;