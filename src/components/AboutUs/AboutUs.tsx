import React, { useEffect, useRef } from "react";
import { useI18n } from "../../i18n/useI18n";
import "./AboutUs.scss";

const AboutUs: React.FC = () => {
  const { language } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.classList.add("background-blue");
        } else {
          document.body.classList.remove("background-blue");
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="about-us" ref={sectionRef} id="about">
      <div className="about-us__content">
        <h2>{language === "hr" ? "O nama" : "About Us"}</h2>
        <div className="about-us__text">
          {language === "hr" ? (
            <>
              <p>Tvrtka ENG PROJEKT d.o.o. bavi se projektiranjem, projektantskim i stručnim nadzorom, te tehničkim savjetovanjem (consultingom) za sljedeće vrste instalacija u graditeljstvu:</p>
              <ul>
                <li>
                  <strong>Strojarske termotehničke instalacije</strong> (grijanje i hlađenje, klimatizacija i ventilacija, plinske instalacije, tehnički plinovi, tehnološki rashlad)
                </li>
                <li>
                  <strong>Strojarske hidrotehničke instalacije</strong> (vodovod i odvodnja, bazenska tehnika)
                </li>
              </ul>
              <p>Pri projektiranju koristimo BIM tehnologiju i softverski alat DDS CAD.</p>
              <p>U suradnji s partnerskim tvrtkama možemo ponuditi i:</p>
              <ul>
                <li>
                  <strong>Sprinkler instalacije</strong> i sustave zaštite kuhinjskih napa plinom
                </li>
                <li>
                  <strong>BMS/CNUS</strong> (centralni nadzorno-upravljački sustavi)
                </li>
              </ul>
              <p>Na taj način objedinjavanjem ponude za sve instalacije preko jedne tvrtke, olakšano je projektiranje i međusobna usklađenost svih instalacija.</p>
              <p>Danas naša tvrtka broji 11 zaposlenika (od toga 4 ovlaštena inženjera HKIS). Oformili smo respektabilni tim kao spoj iskustva i ambicioznosti mladih inženjera, s jasnim fokusom na projektiranje i nadzor.</p>
              <p>Tvrtka ENG PROJEKT d.o.o. osnovana je 2008. godine, odvajanjem od tvrtke ENG 90 d.o.o. (koja je od 1990. godine obavljala poslove izvedbe, projektiranja i nadzora instalacija u graditeljstvu).</p>
              <p>Nadamo se poslovnoj suradnji s Vama te mogućnosti sudjelovanja u davanju ponude na Vašem projektu.</p>
              <p>Za dodatna objašnjenja stojimo Vam na raspolaganju.</p>
            </>
          ) : (
            <>
              <p>ENG PROJEKT d.o.o. provides design, project supervision, and technical consulting services for the following types of construction installations:</p>
              <ul>
                <li>
                  <strong>Mechanical thermotechnical installations</strong> (heating and cooling, air conditioning and ventilation, gas installations, technical gases, technological cooling)
                </li>
                <li>
                  <strong>Mechanical hydrotechnical installations</strong> (water supply and drainage, pool technologies)
                </li>
              </ul>
              <p>We use BIM technology and the DDS CAD software tool in our designs.</p>
              <p>In cooperation with our partner companies, we can also offer:</p>
              <ul>
                <li>
                  <strong>Sprinkler systems</strong> and kitchen hood gas protection systems
                </li>
                <li>
                  <strong>BMS/CNUS</strong> (central monitoring and control systems)
                </li>
              </ul>
              <p>By consolidating offers for all installations through one company, we simplify project coordination and ensure better alignment of all systems.</p>
              <p>Today, our company has 11 employees, including 4 licensed engineers certified by HKIS. We have formed a reputable team combining experience with the ambition of young engineers, with a clear focus on design and supervision.</p>
              <p>ENG PROJEKT d.o.o. was founded in 2008 as a spin-off from ENG 90 d.o.o. (established in 1990 and providing execution, design, and supervision of installation works).</p>
              <p>We look forward to cooperating with you and having the opportunity to submit an offer for your project.</p>
              <p>Should you need any further information, we remain at your disposal.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
