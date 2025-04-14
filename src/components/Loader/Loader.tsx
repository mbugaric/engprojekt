import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Loader.scss';

const Loader: React.FC = () => {
  const circleRef = useRef<HTMLDivElement>(null);
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

    // ✨ 1. Točka: pojavi se i leluja
    tl.fromTo(
      circleRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
    )
      .to(
        circleRef.current,
        {
          x: -10,
          duration: 0.3,
          ease: 'power1.inOut',
        },
        '+=0.1'
      )
      .to(circleRef.current, {
        x: 10,
        duration: 0.3,
        ease: 'power1.inOut',
      })
      .to(circleRef.current, {
        x: 0,
        duration: 0.3,
        ease: 'power1.inOut',
      })

      // 💫 2. Transformacija u liniju s rotacijom (kazaljka)
      .to(
        circleRef.current,
        {
          scaleX: 15,
          scaleY: 0.15,
          rotation: 360,
          backgroundColor: '#d4af37',
          duration: 1.2,
          ease: 'power4.inOut',
          transformOrigin: 'center center',
        },
        '+=0.2'
      )
      .to(
        circleRef.current,
        {
          width: '60vw',
          height: '4px',
          borderRadius: 0,
          duration: 0.5,
        },
        '-=0.8'
      )

      // 🔅 3. Nestanak linije
      .to(
        circleRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: 'power1.inOut',
        },
        '+=0.2'
      )

      // 🪶 4. Tekst in
      .to(
        textRef.current,
        {
          opacity: 1,
          duration: 0.6,
        },
        '+=0.2'
      )

      // 💨 5. Dim tekst out
      .to(
        textRef.current,
        {
          duration: 1.2,
          onStart: () => {
            if (textRef.current) {
              textRef.current.classList.add('loader__text--smoke');
            }
          },
        },
        '+=0.6'
      )

      // 🌄 6. Pozadina fade-in
      .to(
        bgRef.current,
        { opacity: 1, duration: 1.2, ease: 'power2.inOut' },
        '-=1'
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