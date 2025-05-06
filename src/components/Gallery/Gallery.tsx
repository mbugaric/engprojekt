import React, { useState, useEffect, useRef } from "react";
import "./Gallery.scss";
import { useI18n } from "../../i18n/useI18n";

const images = [
  { src: "/images/projects/hotels/ambasador.jpg", caption: "Ambasador" },
  { src: "/images/projects/hotels/corinthia_krk.jpg", caption: "Corinthia Krk" },
  { src: "/images/projects/hotels/cornaro.jpg", caption: "Cornaro" },
  { src: "/images/projects/hotels/crown_plaza.jpg", caption: "Crown Plaza" },
  { src: "/images/projects/hotels/pucic_palace.jpg", caption: "Pucic palace" },
  { src: "/images/projects/hotels/sheraton.jpg", caption: "Sheraton" },
  { src: "/images/projects/industrial/ALFP_1.jpg", caption: "ALFP_1" },
  { src: "/images/projects/industrial/FEAL-1.jpg", caption: "ALFP" },
  { src: "/images/projects/industrial/FEAL.jpg", caption: "FEAL" },
  { src: "/images/projects/industrial/MI_PIVAC.jpg", caption: "MI_PIVAC" },
  { src: "/images/projects/hotels/ambasador.jpg", caption: "Ambasador" },
  { src: "/images/projects/hotels/corinthia_krk.jpg", caption: "Corinthia Krk" },
  { src: "/images/projects/hotels/cornaro.jpg", caption: "Cornaro" },
  { src: "/images/projects/hotels/crown_plaza.jpg", caption: "Crown Plaza" },
  { src: "/images/projects/hotels/pucic_palace.jpg", caption: "Pucic palace" },
  { src: "/images/projects/hotels/sheraton.jpg", caption: "Sheraton" },
  { src: "/images/projects/industrial/ALFP_1.jpg", caption: "ALFP_1" },
  { src: "/images/projects/industrial/FEAL-1.jpg", caption: "ALFP" },
  { src: "/images/projects/industrial/FEAL.jpg", caption: "FEAL" },
  { src: "/images/projects/industrial/MI_PIVAC.jpg", caption: "MI_PIVAC" },
];

const IMAGES_PER_PAGE = 8;

const Gallery: React.FC = () => {
  const { t } = useI18n();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || selectedIndex === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    } else if (diff < -50) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
  };

  const isMoreAvailable = visibleCount < images.length;

  return (
    <section className="gallery" id="projects">
      <h2 className="section-heading">{t("projects")}</h2>
      <div className="gallery__grid">
        {images.slice(0, visibleCount).map((img, idx) => (
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

      <div className="gallery__load-more">
        <button onClick={() => setVisibleCount((prev) => prev + IMAGES_PER_PAGE)} disabled={!isMoreAvailable}>
          {t("loadMore")}
        </button>
      </div>

      {selectedIndex !== null && (
        <div className="gallery__modal fullscreen" onClick={() => setSelectedIndex(null)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} ref={modalRef}>
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
