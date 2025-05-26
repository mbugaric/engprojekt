import React from "react";
import "./Contact.scss";
import { useI18n } from "../../i18n/useI18n";
import VentilationSystem from "../VentilationSystem/VentilationSystem";

const Contact: React.FC = () => {
  const { language } = useI18n();

  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        <div className="contact__info">
          <div className="contact__logo-wrapper">
            <img src="/assets/logo_extended.png" alt="ENG PROJEKT Logo Extended" className="contact__logo" />
          </div>

          <h2 className="section-heading">{language === "hr" ? "Kontakt" : "Contact"}</h2>

          <p className="company-name">ENG PROJEKT d.o.o.</p>
          <p className="company-sub">{language === "hr" ? "Projektiranje, nadzor i tehničko savjetovanje" : "Design, supervision and technical consulting"}</p>

          <ul>
            <li>
              <strong>OIB:</strong> 53127072738
            </li>
            <li>
              <strong>{language === "hr" ? "Adresa" : "Address"}:</strong> Dračevac 11, 21000 Split, {language === "hr" ? "Hrvatska" : "Croatia"}
            </li>
            <li>
              <strong>{language === "hr" ? "Telefon" : "Phone"} 1:</strong> +385 (0) 21 375 257
            </li>
            <li>
              <strong>{language === "hr" ? "Telefon" : "Phone"} 2:</strong> +385 (0) 21 375 258
            </li>
            <li>
              <strong>Email: </strong>
              <a href="mailto:contact@engprojekt.hr">contact@engprojekt.hr</a>
            </li>
          </ul>
        </div>

        <div className="contact__map">
          <a href="https://www.google.com/maps/place/Dračevac+11,+Split" target="_blank" rel="noopener noreferrer">
            <img src="/images/google.png" alt="Prikaži na Google karti" className="contact__map-image" />
          </a>
        </div>
      </div>
      <VentilationSystem />
    </section>
  );
};

export default Contact;
