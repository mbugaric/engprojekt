import React, { useEffect, useState } from "react";
import "./ResponsiveMenu.scss";
import { Menu } from "lucide-react";
import { useI18n } from "../../i18n/useI18n";

const ResponsiveMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { t, setLanguage, language } = useI18n();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 7000);
    return () => clearTimeout(timeout);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (!isVisible) return null;

  return (
    <header className={`responsive-header ${isVisible ? "fade-in" : ""}`}>
      <div className="top-line"></div>
      <div className="nav-container">
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32" fill="#f5f1eb">
            <circle cx="50" cy="50" r="40" stroke="#f5f1eb" strokeWidth="4" fill="none" />
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="#f5f1eb" fontFamily="'Libre Baskerville', serif">
              EP
            </text>
          </svg>
        </div>

        <nav className="responsive-menu">
          <button className="menu-toggle" onClick={toggleMenu}>
            <Menu size={32} strokeWidth={1.5} />
          </button>
          <ul className={`menu-links ${isMenuOpen ? "open" : ""}`}>
            <li>
              <a href="#home">{t("home")}</a>
            </li>
            <li>
              <a href="#about">{t("about")}</a>
            </li>
            <li>
              <a href="#projects">{t("projects")}</a>
            </li>
            <li>
              <a href="#references">{t("references")}</a>
            </li>
            <li>
              <a href="#contact">{t("contact")}</a>
            </li>
          </ul>
        </nav>

        <div className="language-switcher">
          <button
            className="lang-btn"
            onClick={() => setLanguage("hr")}
            data-active={language === "hr"}
            aria-label="Odaberi hrvatski"
          >
            🇭🇷 HR
          </button>
          <button
            className="lang-btn"
            onClick={() => setLanguage("en")}
            data-active={language === "en"}
            aria-label="Switch to English"
          >
            🇬🇧 EN
          </button>
        </div>
      </div>
    </header>
  );
};

export default ResponsiveMenu;