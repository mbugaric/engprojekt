import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "./Loader.scss";

gsap.registerPlugin(MotionPathPlugin);

const Loader: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const satelliteRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    gsap.set(circleRef.current, {
      xPercent: -50,
      yPercent: -50,
    });

    const satelliteTl = gsap.timeline();
    satelliteTl
      .to(
        satelliteRef.current,
        {
          motionPath: {
            path: [
              { x: 18, y: 0 },
              { x: 0, y: -18 },
              { x: -18, y: 0 },
              { x: 0, y: 18 },
              { x: 12, y: 8 },
              { x: 6, y: 4 },
              { x: 2, y: 2 },
              { x: 0, y: 0 },
            ],
            curviness: 1.5,
            autoRotate: false,
          },
          duration: 2.4,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        satelliteRef.current,
        {
          backgroundColor: "#d4af37",
          boxShadow: "0 0 24px #d4af37",
          duration: 2.2,
          ease: "power1.inOut",
        },
        0
      )
      .to(
        satelliteRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power1.inOut",
        },
        ">-0.1"
      );

    const tl = gsap.timeline();

    tl.fromTo(
      circleRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, ease: "elastic.out(1, 0.6)" }
    )
      .to(
        circleRef.current,
        {
          scale: 1.05,
          repeat: 2,
          yoyo: true,
          duration: 0.35,
          ease: "sine.inOut",
        },
        ">-0.2"
      )
      .to(
        circleRef.current,
        {
          scaleX: 15,
          scaleY: 0.15,
          backgroundColor: "#d4af37",
          duration: 1.2,
          ease: "power4.inOut",
          transformOrigin: "center center",
          onStart: () => {
            setTimeout(() => {
              circleRef.current?.classList.add("loader__flash-grow--light");
            }, 100);
          }
        },
        "+=0.3"
      )
      .to(
        circleRef.current,
        {
          width: "60vw",
          height: "4px",
          borderRadius: 0,
          duration: 0.5,
        },
        "-=0.8"
      )
      .to(
        textRef.current,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",

        },
        "-=0.3"
      )
      .to(
        circleRef.current,
        {
          scaleY: 1020,
          duration: 0.7,
          ease: "power2.inOut",
          transformOrigin: "center center",
          onStart: () => {
            circleRef.current?.classList.add("loader__flash-grow");
            circleRef.current?.classList.add("loader__flash-grow--transparent");
          },
        },
        "-=0.2"
      )
      .to(
        circleRef.current,
        {
          backgroundColor: "transparent",
          duration: 0.6,
          ease: "power1.inOut",
        },
        "+=1"
      )
      .to(
        textRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
        },
        "+=0"
      )
      .add(() => {
        loaderRef.current?.classList.add("loader--fade-out");
        setTimeout(() => {
          setHide(true);
          onFinish?.(); 
        }, 3000);
      }, "-=1");
  }, []);

  

  if (hide) return null;

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader__bg" ref={bgRef}></div>
      <div className="loader__overlay" ref={overlayRef}></div>
      <div className="loader__center">
        <div className="loader__circle" ref={circleRef}></div>
        <div className="loader__satellite" ref={satelliteRef}></div>
        <h1 className="loader__text" ref={textRef}>
          ENG PROJEKT d.o.o.
        </h1>
      </div>
    </div>
  );
};

export default Loader;