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
            <img
              src="/assets/logo_extended.png"
              alt="ENG PROJEKT Logo Extended"
              className="contact__logo"
            />
          </div>

          <h2 className="section-heading">
            {language === "hr" ? "Kontakt" : "Contact"}
          </h2>

          <p className="company-name">ENG PROJEKT d.o.o.</p>
          <p className="company-sub">
            {language === "hr"
              ? "Projektiranje, nadzor i tehničko savjetovanje"
              : "Design, supervision and technical consulting"}
          </p>

          <ul>
            <li><strong>OIB:</strong> 53127072738</li>
            <li>
              <strong>{language === "hr" ? "Adresa" : "Address"}:</strong> Dračevac 11, 21000 Split,{" "}
              {language === "hr" ? "Hrvatska" : "Croatia"}
            </li>
            <li><strong>{language === "hr" ? "Telefon" : "Phone"} 1:</strong> +385 (0) 21 375 257</li>
            <li><strong>{language === "hr" ? "Telefon" : "Phone"} 2:</strong> +385 (0) 21 375 258</li>
            <li><strong>Email: </strong><a href="mailto:contact@engprojekt.hr">contact@engprojekt.hr</a></li>
          </ul>
        </div>

        <div className="contact__map">
          <iframe
            title="ENG PROJEKT d.o.o. Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.9949966995046!2d16.478753815828388!3d43.498303479125246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355fc315f3fdb3%3A0xa3129b9866c7c3ab!2sDra%C4%8Devac%2011%2C%2021000%2C%20Split!5e0!3m2!1shr!2shr!4v1688910000000!5m2!1shr!2shr"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <VentilationSystem />
    </section>
  );
};

export default Contact;