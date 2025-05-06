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

  { src: "/images/projects/medical/KB_DUBRAVA.jpg", caption: "KB_DUBRAVA" },
  { src: "/images/projects/medical/KBC_Osijek_1.jpg", caption: "KBC_Osijek_1" },
  { src: "/images/projects/medical/KBC_Osijek_2.jpg", caption: "KBC_Osijek_2" },
  { src: "/images/projects/medical/MEDIKOL_1.jpg", caption: "MEDIKOL_1" },
  { src: "/images/projects/medical/MEDIKOL_2.jpg", caption: "MEDIKOL_2" },
  { src: "/images/projects/medical/MEDIKOL_3.jpg", caption: "MEDIKOL_3" },
  { src: "/images/projects/medical/Norilsk.jpg", caption: "Norilsk" },
  { src: "/images/projects/medical/OHBP_KBAC_SPLIT.jpg", caption: "OHBP_KBAC_SPLIT" },
  { src: "/images/projects/medical/OHBP_KBC_SPLIT.jpg", caption: "OHBP_KBC_SPLIT" },
  { src: "/images/projects/medical/OP_KRIZINE.jpg", caption: "OP_KRIZINE" },

  { src: "/images/projects/business/AGRAM.jpg", caption: "AGRAM" },
  { src: "/images/projects/business/DOROTHEUM.jpg", caption: "DOROTHEUM" },
  { src: "/images/projects/business/EUROCENTAR.jpg", caption: "EUROCENTAR" },
  { src: "/images/projects/business/EUROTOWER.jpg", caption: "EUROTOWER" },
  { src: "/images/projects/business/FUTURAMA_business-park.jpg", caption: "FUTURAMA_business-park" },
  { src: "/images/projects/business/FUTURAMA_1.jpg", caption: "FUTURAMA_1" },
  { src: "/images/projects/business/FUTURAMA_2.jpg", caption: "FUTURAMA_2" },
  { src: "/images/projects/business/FUTURAMA_3.jpg", caption: "FUTURAMA_3" },
  { src: "/images/projects/business/FUTURAMA_5.jpg", caption: "FUTURAMA_5" },
  { src: "/images/projects/business/FUTURAMA-6.jpg", caption: "FUTURAMA-6" },
  { src: "/images/projects/business/JINDRISKA.jpg", caption: "JINDRISKA" },
  { src: "/images/projects/business/JUNGMANNOVA.jpg", caption: "JUNGMANNOVA" },
  { src: "/images/projects/business/LYRA_MOULIKOVA.jpg", caption: "LYRA_MOULIKOVA" },
  { src: "/images/projects/business/NOVE_BUTOVICE.jpg", caption: "NOVE_BUTOVICE" },
  { src: "/images/projects/shopping/CCO.jpg", caption: "CCO" },
  { src: "/images/projects/shopping/CITY_ONE.jpg", caption: "CITY_ONE" },
  { src: "/images/projects/shopping/Lesnina_Jankomir.jpg", caption: "Lesnina_Jankomir" },
  { src: "/images/projects/shopping/MEPAS_MALL.jpg", caption: "MEPAS_MALL" },
  { src: "/images/projects/shopping/MoS.jpg", caption: "MoS" },
  { src: "/images/projects/shopping/POINT.jpg", caption: "POINT" },
  { src: "/images/projects/shopping/PORTANOVA.jpg", caption: "PORTANOVA" },

  { src: "/images/projects/other/AERODROM_BRAC.jpg", caption: "AERODROM_BRAC" },
  { src: "/images/projects/other/BEL_ETAGE.jpg", caption: "BEL_ETAGE" },
  { src: "/images/projects/other/BIKARAC.jpg", caption: "BIKARAC" },
  { src: "/images/projects/other/BOBIS.jpg", caption: "BOBIS" },
  { src: "/images/projects/other/CINESTAR PRISHTINA MALL.jpg", caption: "CINESTAR PRISHTINA MALL" },
  { src: "/images/projects/other/EF_SPLIT.jpg", caption: "EF_SPLIT" },
  { src: "/images/projects/other/GFOS_OSIJEK.jpg", caption: "GFOS_OSIJEK" },
  { src: "/images/projects/other/GYM_DVORANA_KOPRIVNICA_1.jpg", caption: "GYM_DVORANA_KOPRIVNICA_1" },
  { src: "/images/projects/other/GYM_DVORANA_KOPRIVNICA_2.jpg", caption: "GYM_DVORANA_KOPRIVNICA_2" },
  { src: "/images/projects/other/GYM_DVORANA_KOPRIVNICA_3.jpg", caption: "GYM_DVORANA_KOPRIVNICA_3" },
  { src: "/images/projects/other/OS_METERIZE.jpg", caption: "OS_METERIZE" },
  { src: "/images/projects/other/OS_MONTOVJERNA.jpg", caption: "OS_MONTOVJERNA" },
  { src: "/images/projects/other/OS_PAZDIGRAD.jpg", caption: "OS_PAZDIGRAD" },
  { src: "/images/projects/other/RIBARSKA_LUKA_BRIZINE.jpg", caption: "RIBARSKA_LUKA_BRIZINE" },
  { src: "/images/projects/other/SAMOSTAN_MALE_BRACE.jpg", caption: "SAMOSTAN_MALE_BRACE" },
  { src: "/images/projects/other/ST_DOM_DBK_1.jpg", caption: "ST_DOM_DBK_1" },
  { src: "/images/projects/other/ST_DOM_DBK.jpg", caption: "ST_DOM_DBK" },
];

const IMAGES_PER_PAGE = 8;

const Gallery: React.FC = () => {
  const { t } = useI18n();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const preloadedImages = useRef<Set<string>>(new Set());

  const preloadImage = (src: string) => {
    if (!preloadedImages.current.has(src)) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      preloadedImages.current.add(src);
      console.log("Preloading image:", src);
    }
  };

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

  useEffect(() => {
    const start = visibleCount;
    const end = Math.min(visibleCount + IMAGES_PER_PAGE, images.length);
    for (let i = start; i < end; i++) {
      preloadImage(images[i].src);
    }
  }, [visibleCount]);

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
              preloadImage(img.src);
              if (idx + 1 < images.length) preloadImage(images[idx + 1].src);
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