import React, { useState, useEffect } from "react";
import "./Gallery.scss";

const images = [
  {
    src: "/images/projects/hotels/ambasador.jpg",
    caption: "Ambasador",
  },
  {
    src: "/images/projects/hotels/corinthia_krk.jpg",
    caption: "Corinthia Krk",
  },
  {
    src: "/images/projects/hotels/cornaro.jpg",
    caption: "Cornaro",
  },
];

const Gallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === "Escape") setSelectedIndex(null);
    if (e.key === "ArrowRight") setSelectedIndex((i) => (i !== null ? (i + 1) % images.length : null));
    if (e.key === "ArrowLeft") setSelectedIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <section className="gallery">
      <div className="gallery__grid">
        {images.map((img, idx) => (
          <div
            className="gallery__item"
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            style={{ "--delay": `${idx * 0.1}s` } as React.CSSProperties}
            onMouseEnter={() => {
              const link = document.createElement("link");
              link.rel = "preload";
              link.as = "image";
              link.href = img.src;
              document.head.appendChild(link);
            }}
          >
            <div className="gallery__image-wrapper">
              <img src={img.src} alt={img.caption} loading="lazy" />
              <div className="gallery__caption">{img.caption}</div>
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="gallery__modal" onClick={() => setSelectedIndex(null)}>
          <button className="gallery__close">&times;</button>
          <img src={images[selectedIndex].src} alt="Full view" className="gallery__modal-img" />
          <div className="gallery__modal-caption">{images[selectedIndex].caption}</div>
          <button
            className="gallery__nav gallery__prev"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
            }}
          >
            ‹
          </button>
          <button
            className="gallery__nav gallery__next"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex + 1) % images.length);
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
