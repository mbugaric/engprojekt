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
          <img src="/assets/logo.png" alt="ENG PROJEKT Logo" width={50} height={50} />
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
          <button className="lang-btn" onClick={() => setLanguage("hr")} data-active={language === "hr"} aria-label="Odaberi hrvatski">
            🇭🇷 HR
          </button>
          <button className="lang-btn" onClick={() => setLanguage("en")} data-active={language === "en"} aria-label="Switch to English">
            🇬🇧 EN
          </button>
        </div>
      </div>
    </header>
  );
};

export default ResponsiveMenu;
